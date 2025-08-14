import dotenv from "dotenv";
import BITHUMB_API_RESPONSE from "./bithumb-api.json" with { type: "json" };
import KOREA_GOLDX_API_RESPONSE from './koreagoldx-api.json' with { type: "json" };

dotenv.config();

(async () => {
  const endpoint = `${process.env.WEBHOOK_ENDPOINT}`;
  
  if (!endpoint)
    throw new Error(
      "scheduling/src/cryptocurrency.ts: invalid webhook endpoint"
    );

  try {
    const result = await Promise.allSettled([
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-BTC"),
      fetch("https://api.bithumb.com/v1/ticker?markets=KRW-ETH"),
      fetch("https://apiserver.koreagoldx.co.kr/api/price/lineUp/list", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          srchDt: "5M",
          type: "Au",
          dataDateStart: "",
          dataDateEnd: ""})
      })
    ]);
    const resolved = result
      .filter(
        (r): r is PromiseFulfilledResult<Response> => r.status === "fulfilled"
      )
      .map((r) => r.value.json());
    
    let summary = {
      "비트코인": {
        "날짜": '',
        "시작가": '',
        "1년내 최고가": '',
        "1년내 최저가": '',
      },
      "이더리움": {
        "날짜": '',
        "시작가": '',
        "1년내 최고가": '',
        "1년내 최저가": '',
      },
      "금": {
        "날짜": "",
        "사는 가격": "",
        "파는 가격": ""
      }
    };
     
    for await (const body of resolved) {
      let b = body as unknown as typeof BITHUMB_API_RESPONSE | typeof KOREA_GOLDX_API_RESPONSE;
      const isGoldApi = Object.prototype.hasOwnProperty.call(body, "lineUpVal")

      if (isGoldApi) {
        const gold = b as typeof KOREA_GOLDX_API_RESPONSE
        const latestPrice = gold.lineUpVal[0];
        const { spure: _buy, ppure: _sell, writeday: _date } = latestPrice
        const date = new Date(_date).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
        const buy = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(_buy)
        const sell = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(_sell)

        summary["금"].날짜 = date
        summary["금"]["사는 가격"] = buy
        summary["금"]["파는 가격"] = sell
        console.log({buy, sell, summary })
      } else {
        const coin = b as typeof BITHUMB_API_RESPONSE
        const market = coin[0].market.includes("BTC") ? "비트코인" : "이더리움"
        summary[market].날짜 = coin[0].trade_date_kst;
        summary[market].시작가 = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(coin[0].opening_price)
        summary[market]["1년내 최고가"] = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(coin[0].highest_52_week_price)
        summary[market]["1년내 최저가"] = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(coin[0].lowest_52_week_price)
      }
    }

    console.log({summary})
    const content = JSON.stringify(summary, null, 2)
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
