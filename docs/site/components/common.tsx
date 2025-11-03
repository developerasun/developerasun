import { ReactNode } from "react";

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
