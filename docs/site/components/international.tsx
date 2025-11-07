import { useTranslation } from "react-i18next";
import { i18n } from "../pages/index";

export function SetUpTranslation() {
  return (
    <div
      id="setup"
      style={{
        border: "1px solid white",
        padding: "0.5rem 0.75rem",
        borderRadius: "15px",
        display: "grid",
        placeItems: "center",
        gridAutoFlow: "column",
        gap: "1rem",
      }}
    >
      <button
        type="button"
        onClick={async () => await i18n.changeLanguage("en")}
      >
        Eng
      </button>
      <span>|</span>
      <button
        type="button"
        onClick={async () => await i18n.changeLanguage("kr")}
      >
        한국어
      </button>
    </div>
  );
}

export function RenderTranslation({ tKey }: { tKey: string }) {
  const { t } = useTranslation();
  return <>{t(tKey)}</>;
}
