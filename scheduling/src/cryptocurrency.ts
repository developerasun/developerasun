import dotenv from "dotenv";
import BITHUMB_API_RESPONSE from "./bithumb-api.json" with { type: "json" };

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
        "연중 최고가": '',
        "연중 최저가": '',
      },
      "이더리움": {
        "날짜": '',
        "시작가": '',
        "연중 최고가": '',
        "연중 최저가": '',
      },
    };
     
    for await (const body of resolved) {
      const b = body as typeof BITHUMB_API_RESPONSE;
      const market = b[0].market.includes("BTC") ? "비트코인" : "이더리움"
      summary[market].날짜 = b[0].trade_date_kst;
      summary[market].시작가 = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(b[0].opening_price)
      summary[market]["연중 최고가"] = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(b[0].highest_52_week_price)
      summary[market]["연중 최저가"] = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(b[0].lowest_52_week_price)
    }

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
