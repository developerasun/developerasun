import { defineConfig } from "vocs";

export default defineConfig({
  title: "DeveloperAsun",
  // @dev should be set to repo name for github pages
  basePath: "/developerasun",
  iconUrl: { light: "/favicon.ico", dark: "/favicon.ico" },
  rootDir: "./site",
  sidebar: [
    {
      text: "About",
      link: "/about",
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
        {
          text: "Mantra",
          link: "/portfolio/mantra",
        },
        {
          text: "Nirvana",
          link: "/portfolio/nirvana",
        },
      ],
    },
    {
      text: "Blog",
      link: "/blog",
    },
  ],
  theme: {
    colorScheme: "dark",
  },
});
