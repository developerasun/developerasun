import { useState } from "react";
import { useTranslation } from "react-i18next";
import { i18n } from "../pages/index";

export function SetUpTranslation() {
  const [language, setLanguage] = useState<"en" | "kr" | string>(i18n.language);
  const handleTranslation = async (lang: "en" | "kr") => {
    await i18n.changeLanguage(lang);
    setLanguage(lang);
  };

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
        gap: "0.5rem",
        width: "fit-content",
      }}
    >
      {/* silence lint warning */}
      <span style={{ display: "none" }}>{language}</span>
      <span>🌍</span>
      <button
        style={{ fontWeight: i18n.language === "en" ? "bold" : "normal" }}
        type="button"
        onClick={async () => await handleTranslation("en")}
      >
        Eng
      </button>
      <span>|</span>
      <button
        style={{ fontWeight: i18n.language === "kr" ? "bold" : "normal" }}
        type="button"
        onClick={async () => await handleTranslation("kr")}
      >
        한국어
      </button>
    </div>
  );
}

export function RenderTranslation({ tKey, mb }: { tKey: string; mb?: string }) {
  const { t } = useTranslation();
  return <div style={{ marginBottom: mb ?? "0.5rem" }}>{t(tKey)}</div>;
}
