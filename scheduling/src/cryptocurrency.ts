import dotenv from "dotenv";
import BITHUMB_API_RESPONSE from "./bithumb-api.json" with { type: "json" };
import GOLD_API_RESPONSE from './gold-api.json' with { type: "json" };
import NAVER_API_RESPONSE from './naver-api.json' with { type: "json" };
import API_NINJAS_API_RESPONSE from './apininjas-api.json' with { type: "json" };
import COINMARKETCAP_FEAR_GRID_API_RESPONSE from './coinmarketcap-feargrid-api.json' with { type: "json" };
import { Summary } from "../types/snippet.ts";

dotenv.config();

(async () => {
  const endpoint = `${process.env.DISCORD_FINANCIAL_ASSET_INDEX}`;
  const coinmarketcapApiKey = `${process.env.COINMARKETCAP_API_KEY}`;
  const apiNinjasApiKey = `${process.env.API_NINJAS_API_KEY}`;
  
  if (!endpoint) {
    throw new Error(
      "scheduling/src/cryptocurrency.ts: invalid DISCORD_FINANCIAL_ASSET_INDEX"
    );
  }
  if (!coinmarketcapApiKey) {
    throw new Error(
      "scheduling/src/cryptocurrency.ts: invalid COINMARKETCAP_API_KEY"
    );
  }
  if (!apiNinjasApiKey) {
    throw new Error(
      "scheduling/src/cryptocurrency.ts: invalid API_NINJAS_API_KEY"
    );
  }

  try {
    const result = await Promise.allSettled([
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-BTC"),
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-ETH"),
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-USDT"),
      fetch("https://api.gold-api.com/price/XAU"),
      fetch("https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1"),
      fetch("https://api.api-ninjas.com/v1/stockprice?ticker=VOO", {
        headers: {
          "X-Api-Key": apiNinjasApiKey
        }
      }),
      fetch("https://api.api-ninjas.com/v1/stockprice?ticker=QQQ", {
        headers: {
          "X-Api-Key": apiNinjasApiKey
        }
      }),
      fetch("https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest", {
        headers: {
          "X-CMC_PRO_API_KEY": coinmarketcapApiKey
        }
      })
    ]);
    
    const resolved = result
      .filter(
        (r): r is PromiseFulfilledResult<Response> => r.status === "fulfilled"
      )
      // @dev filter api error response
      .filter((r) => r.value.ok)
      .map((r) => {
        const contentType = r.value.headers.get('content-type')

        if (contentType?.includes("application/json")) {
          return r.value.json()
        } else {
          return r.value.text()
        }
      })
      
    const sm = new Summary()
    
    for await (const body of resolved) {
      let b = body as unknown as typeof BITHUMB_API_RESPONSE | typeof GOLD_API_RESPONSE | typeof NAVER_API_RESPONSE | typeof API_NINJAS_API_RESPONSE | typeof COINMARKETCAP_FEAR_GRID_API_RESPONSE;
      const isGoldApi = Object.prototype.hasOwnProperty.call(body, "name") && body.name === "Gold"
      const isDollarApi = Object.prototype.hasOwnProperty.call(body, "pkid")
      const isEftApi = Object.prototype.hasOwnProperty.call(body, "ticker")
      const isCoinmarketcapApi = Object.prototype.hasOwnProperty.call(body, "status")
      const isCoinApi = Array.isArray(body)
      const date = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

      if (isGoldApi) {
        const gold = b as typeof GOLD_API_RESPONSE
        const latestPrice = gold
        const { price: _buy } = latestPrice
        const buy = sm.toDollar(_buy)

        sm.setGold({ "날짜": date, "사는 가격": buy, "유닛": "XAU(31.1g)" })

      } else if (isDollarApi) {
        console.log("found dollar")
        const dollar = b as typeof NAVER_API_RESPONSE
        sm.setDollar(dollar.country[1].subValue)

      } else if (isEftApi) {
        const etf = b as typeof API_NINJAS_API_RESPONSE
        const { price, ticker, currency } = etf
        
        ticker === "QQQ" ? 
        sm.setNasdaq100({ 
          "날짜": date, 
          "가격": `${price} ${currency}`, 
        }) : sm.setSnP500({ 
          "날짜": date, 
          "가격": `${price} ${currency}`
        })
      } else if (isCoinApi) {
        const coin = b as typeof BITHUMB_API_RESPONSE
        const { opening_price: start, highest_52_week_price: yearHigh, lowest_52_week_price: yearLow} = coin[0]
        const market = 
          coin[0].market.includes("BTC") ? "비트코인" : 
          coin[0].market.includes("USDT") ? "스테이블" :
                                            "이더리움"

        market === "비트코인" ? sm.setCryptoBtc({ 
          "날짜": date, 
          "시작가": sm.toWon(start), 
          "1년내 최고가": sm.toWon(yearHigh) , 
          "1년내 최저가": sm.toWon(yearLow)
        }) 
        : market === "스테이블" ? 
        sm.setStableDollar(`${start.toString()}원`) 
        : sm.setCryptoEth({ 
          "날짜": date, 
          "시작가": sm.toWon(start), 
          "1년내 최고가": sm.toWon(yearHigh) , 
          "1년내 최저가": sm.toWon(yearLow)
        })
      } else if (isCoinmarketcapApi) {
        const fearGrid = b as typeof COINMARKETCAP_FEAR_GRID_API_RESPONSE
        const { data: { value, value_classification }} = fearGrid
        sm.setCryptoFearGrid({ 날짜: date, 지수: `${value}/100`, 분류: value_classification })
      }
    }

    console.log({ sm })
    const content = JSON.stringify(sm, null, 2)
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    // no body from discord
    const { status, statusText } = response
    console.info({ status, statusText });
  } catch (error) {
    console.error(error);
  }
})();
