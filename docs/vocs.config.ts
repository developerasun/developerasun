import { defineConfig } from "vocs";

export default defineConfig({
  title: "Jake Sung",
  // @dev should be set to repo name for github pages
  basePath: "/developerasun",
  iconUrl: { light: "/favicon.ico", dark: "/favicon.ico" },
  rootDir: "./site",

  // @dev left sidebar
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
          text: "Minlink",
          link: "/portfolio/minlink",
        },
        {
          text: "Hexbook",
          link: "/portfolio/hexbook",
        },
        {
          text: "Ricktcal Worldcup",
          link: "/portfolio/ricktcal-worldcup",
        },
        {
          text: "Owlly",
          link: "/portfolio/owlly",
        },
      ],
    },
    {
      text: "Blog",
      link: "/blog",
    },
  ],

  // @dev top nav
  topNav: [{ text: "🌍 Language", link: "/#setup" }],

  // @dev color theme
  theme: {
    colorScheme: "dark",
  },
});
