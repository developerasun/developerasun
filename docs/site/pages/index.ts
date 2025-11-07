import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LANGUAGE_TRANSLATION from "../i18n/lang.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: LANGUAGE_TRANSLATION,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

const PUB_DIR_PATH =
  process.env.NODE_ENV === "development" ? "/" : "/developerasun/";

export { i18n, PUB_DIR_PATH };
