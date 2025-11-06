import { ReactNode } from "react";
import { PUB_DIR_PATH } from "../pages/index";

/**
 * 
 * @example 
    <Highlight color="#25c2a0">도큐사우루스 초록</Highlight>과 <Highlight color="#1877F2">
      페이스북 파랑
    </Highlight>은 내가 좋아하는 색입니다.
 */
export const Highlight = ({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    {children}
  </span>
);

export const DeadSideProject = ({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start", // 상단 기준으로 정렬
      gap: "1.5rem",
    }}
  >
    <div
      style={{
        width: "100px",
        textAlign: "center",
        flexShrink: 0, // 왼쪽 영역 고정
      }}
    >
      <img
        style={{
          width: "75px",
          height: "75px",
          objectFit: "cover",
          backgroundColor: "white",
          borderRadius: "15px",
          display: "block",
          margin: "0 auto 0.5rem",
        }}
        src={`${PUB_DIR_PATH}tombstone.svg`}
        alt="thumbnail"
      />
      <span style={{ fontSize: "0.9rem", color: "#666" }}>{date}</span>
    </div>

    <div style={{ flex: 1 }}>
      <Highlight color="tomato">{title}</Highlight>
      {description}
    </div>
  </div>
);
