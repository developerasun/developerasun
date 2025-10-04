import { defineConfig } from "vocs";

export default defineConfig({
  title: "DeveloperAsun",
  // @dev should be set to repo name for github pages
  basePath: "developerasun",
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
