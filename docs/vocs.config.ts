import { defineConfig } from "vocs";

export default defineConfig({
  title: "DeveloperAsun",
  // @dev should be set to repo name for github pages
  basePath: "/developerasun",
  iconUrl: { light: "/favicon.ico", dark: "/favicon.ico" },
  logoUrl: { light: "/logo.jpg", dark: "/logo.jpg" },
  // search: {
  //   boostDocument(documentId) {
  //     if (documentId.startsWith("pages/docs")) return 3;
  //     if (documentId.startsWith("pages/account-abstraction")) return 2;
  //     if (documentId.startsWith("pages/experimental")) return 2;
  //     return 1;
  //   },
  // },
  sidebar: [
    {
      text: "About",
      link: "/about",
      items: [
        {
          text: "Blog",
          link: "/blog",
        },
      ],
    },

    {
      text: "Projects",
      link: "/projects",
      items: [
        {
          text: "Lapis Protocol",
          link: "/projects/lapis-protocol",
        },
      ],
    },
    {
      text: "Portfolio",
      link: "/portfolio",
      items: [
        {
          text: "Ricktcal Worldcup",
          link: "/portfolio/ricktcal-worldcup",
        },
      ],
    },
  ],
  theme: {
    colorScheme: "dark",
  },
});
