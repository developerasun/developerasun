import dotenv from "dotenv";

dotenv.config();

const endpoint = `${process.env.WEBHOOK_ENDPOINT}`;
if (!endpoint)
  throw new Error("scheduling/src/real-estate.ts: invalid webhook endpoint");

// ================================================================== //
// ======================= ai-generated:start ======================= //
// ================================================================== //
type KBLandPriceIndexParams = {
  월간주간구분코드: string; // "01" = 월간
  매물종별구분: string; // "01" = 아파트
  매매전세코드: string; // "01" = 매매
  지역코드: string; // 서울: "1100000000", 대구: "2700000000"
};

const KBLAND_PRICE_INDEX_URL =
  "https://data-api.kbland.kr/bfmstat/weekMnthlyHuseTrnd/priceIndex";

// 서울/대구 법정동코드(10자리)
const 지역코드_서울 = "1100000000";
const 지역코드_대구 = "2700000000";

// fetch 함수
async function fetchKBLandPriceIndex(params: KBLandPriceIndexParams) {
  const url = new URL(KBLAND_PRICE_INDEX_URL);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// 날짜 필터 함수 (최근 한 달만)
function filterRecentMonth(dataList: any, 날짜리스트: string[]) {
  if (!날짜리스트?.length) return [];
  const recent = 날짜리스트[날짜리스트.length - 1];
  return dataList.map((row: any) => ({
    지역코드: row.지역코드,
    지역명: row.지역명,
    날짜: recent,
    가격지수: row.dataList[날짜리스트.indexOf(recent)],
  }));
}

async function fetchSeoulAndDaeguPriceIndex() {
  const baseParams = {
    월간주간구분코드: "01",
    매물종별구분: "01",
    매매전세코드: "01",
  };

  try {
    const [서울Raw, 대구Raw] = await Promise.all([
      fetchKBLandPriceIndex({ ...baseParams, 지역코드: 지역코드_서울 }),
      fetchKBLandPriceIndex({ ...baseParams, 지역코드: 지역코드_대구 }),
    ]);

    // 서울 데이터 추출
    const 서울Data = 서울Raw.dataBody.data;
    const 서울_날짜리스트: string[] = 서울Data.날짜리스트;
    const 서울_데이터리스트 = 서울Data.데이터리스트;
    const 서울_최근한달 = filterRecentMonth(서울_데이터리스트, 서울_날짜리스트);

    // 대구 데이터 추출
    const 대구Data = 대구Raw.dataBody.data;
    const 대구_날짜리스트: string[] = 대구Data.날짜리스트;
    const 대구_데이터리스트 = 대구Data.데이터리스트;
    const 대구_최근한달 = filterRecentMonth(대구_데이터리스트, 대구_날짜리스트);

    return { 서울_최근한달, 대구_최근한달 };
  } catch (err) {
    console.error(err);
    return { 서울_최근한달: [], 대구_최근한달: [] };
  }
}

// ================================================================== //
// ======================== ai-generated:end ======================== //
// ================================================================== //

// ================================================================== //
// ======================== human-coded:start ======================= //
// ================================================================== //
interface IPriceIndexField {
  지역코드: string;
  지역명: string;
  날짜: string;
  가격지수: number;
}

type PriceIndexFieldList = IPriceIndexField[];

(async () => {
  const { 서울_최근한달, 대구_최근한달 } =
    (await fetchSeoulAndDaeguPriceIndex()) as {
      서울_최근한달: PriceIndexFieldList;
      대구_최근한달: PriceIndexFieldList;
    };

  // @dev filter and order by desc. discord has 2,000 char limit on webhook contents
  const 서울_거래활발_상위 = 서울_최근한달
    .sort((a, b) => b.가격지수 - a.가격지수)
    .slice(0, 5);
  const 대구_거래활발_상위 = 대구_최근한달
    .sort((a, b) => b.가격지수 - a.가격지수)
    .slice(0, 5);

  console.log({ 서울_거래활발_상위, 대구_거래활발_상위 });

  const content = JSON.stringify(
    {
      서울_거래활발_상위,
      대구_거래활발_상위,
    },
    null,
    2
  );
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  // no body from discord
  const { status, statusText } = response;
  console.info({ status, statusText });
})();
