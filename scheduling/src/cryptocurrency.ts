import dotenv from "dotenv";
import BITHUMB_API_RESPONSE from "./bithumb-api.json" with { type: "json" };
import KOREA_GOLDX_API_RESPONSE from './koreagoldx-api.json' with { type: "json" };
import NAVER_API_RESPONSE from './naver-api.json' with { type: "json" };
import YAHOO_API_RESPONSE from './yahoo-api.json' with { type: "json" };
import yahooFinance from 'yahoo-finance2';
import { Summary } from "../types/snippet.ts";

dotenv.config();

(async () => {
  const endpoint = `${process.env.DISCORD_FINANCIAL_ASSET_INDEX}`;
  
  if (!endpoint)
    throw new Error(
      "scheduling/src/cryptocurrency.ts: invalid DISCORD_FINANCIAL_ASSET_INDEX"
    );

  try {
    const result = await Promise.allSettled([
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-BTC"),
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-ETH"),
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-USDT"),
      fetch("https://apiserver.koreagoldx.co.kr/api/price/lineUp/list", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          srchDt: "5M",
          type: "Au",
          dataDateStart: "",
          dataDateEnd: ""})
        }),
      fetch("https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1"),

      // @dev wrap to make it fetch-response-like
      Promise.resolve({
        json() {
          return yahooFinance.quoteSummary("VOO")
        }
      }),
      Promise.resolve({
        json() {
          return yahooFinance.quoteSummary("QQQ")
        }
      }),
    ]);
    
    const resolved = result
      .filter(
        (r): r is PromiseFulfilledResult<Response> => r.status === "fulfilled"
      )
      .map((r) => r.value.json());
    
      const sm = new Summary()
     
    for await (const body of resolved) {
      let b = body as unknown as typeof BITHUMB_API_RESPONSE | typeof KOREA_GOLDX_API_RESPONSE | typeof NAVER_API_RESPONSE | typeof YAHOO_API_RESPONSE;
      const isGoldApi = Object.prototype.hasOwnProperty.call(body, "lineUpVal")
      const isDollarApi = Object.prototype.hasOwnProperty.call(body, "pkid")
      const isEftApi = Object.prototype.hasOwnProperty.call(body, "summaryDetail")

      if (isGoldApi) {
        const gold = b as typeof KOREA_GOLDX_API_RESPONSE
        const latestPrice = gold.lineUpVal[0];
        const { spure: _buy, ppure: _sell, writeday: _date } = latestPrice
        const date = new Date(_date).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
        const buy = sm.toWon(_buy)
        const sell = sm.toWon(_sell)

        sm.setGold({ "날짜": date, "사는 가격": buy, "파는 가격": sell })

      } else if (isDollarApi) {
        const dollar = b as typeof NAVER_API_RESPONSE
        sm.setDollar(dollar.country[1].subValue)

      } else if (isEftApi) {
        const etf = b as typeof YAHOO_API_RESPONSE
        const { regularMarketTime: date, regularMarketPreviousClose: prev, regularMarketPrice: current, postMarketPrice: after, symbol } = etf.price
        symbol === "QQQ" ? 
        sm.setNasdaq100({ 
          "날짜": date, 
          "장전 가격": sm.toDollar(prev), 
          "정규장 가격": sm.toDollar(current), 
          "장후 가격": sm.toDollar(after)
        }) : sm.setSnP500({ 
          "날짜": date, 
          "장전 가격": sm.toDollar(prev), 
          "정규장 가격": sm.toDollar(current), 
          "장후 가격": sm.toDollar(after)
        })
      } else {
        const coin = b as typeof BITHUMB_API_RESPONSE
        const { trade_date_kst: date, opening_price: start, highest_52_week_price: yearHigh, lowest_52_week_price: yearLow} = coin[0]
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
