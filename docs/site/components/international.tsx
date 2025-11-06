import { useTranslation } from "react-i18next";
import { i18n } from "../pages/index";

export function SetUpTranslation() {
  return (
    <>
      <button
        type="button"
        onClick={async () => await i18n.changeLanguage("en")}
      >
        Eng
      </button>
      <button
        type="button"
        onClick={async () => await i18n.changeLanguage("kr")}
      >
        한국어
      </button>
    </>
  );
}

export function RenderTranslation({ tKey }: { tKey: string }) {
  const { t } = useTranslation();
  return (
    <>
      <span>{t(tKey)}</span>
    </>
  );
}
