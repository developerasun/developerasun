// snippet.ts

export class Summary {
  비트코인: {
    날짜: string;
    시작가: string;
    "1년내 최고가": string;
    "1년내 최저가": string;
  } | null;
  이더리움: {
    날짜: string;
    시작가: string;
    "1년내 최고가": string;
    "1년내 최저가": string;
  } | null;
  금: {
    날짜: string;
    "사는 가격": string;
    유닛: string;
  } | null;
  "달러 환율": string | null;
  "스테이블 환율": string | null;
  "S&P500": {
    날짜: string;
    "장전 가격": string;
    "정규장 가격": string;
    "장후 가격": string;
  } | null;
  "Nasdaq100": {
    날짜: string;
    "장전 가격": string;
    "정규장 가격": string;
    "장후 가격": string;
  } | null;

  constructor() {
    this.비트코인 = null;
    this.이더리움 = null;
    this.금 = null;
    this["달러 환율"] = null;
    this["S&P500"] = null;
    this["Nasdaq100"] = null;
  }

  setCryptoBtc(detail: {
    날짜: string;
    시작가: string;
    "1년내 최고가": string;
    "1년내 최저가": string;
  }) {
    this.비트코인 = detail;
    return this;
  }

  setCryptoEth(detail: {
    날짜: string;
    시작가: string;
    "1년내 최고가": string;
    "1년내 최저가": string;
  }) {
    this.이더리움 = detail;
    return this;
  }

  setSnP500(detail: {
    날짜: string;
    "장전 가격": string;
    "정규장 가격": string;
    "장후 가격": string;
  }) {
    this["S&P500"] = detail;
    return this;
  }

  setNasdaq100(detail: {
    날짜: string;
    "장전 가격": string;
    "정규장 가격": string;
    "장후 가격": string;
  }) {
    this["Nasdaq100"] = detail;
    return this;
  }

  setDollar(detail: string) {
    this["달러 환율"] = detail;
    return this;
  }

  setStableDollar(detail: string) {
    this["스테이블 환율"] = detail;
    return this;
  }

  setGold(detail: { 날짜: string; "사는 가격": string; 유닛: string }) {
    this.금 = detail;
    return this;
  }

  toWon(amount: number) {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  }

  toDollar(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
}
