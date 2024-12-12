import { defineConfig } from "vocs";

export default defineConfig({
  title: "Whisk SDK",
  description: "TESTING",
  sidebar: [
    {
      text: "Getting Started",
      link: "/getting-started",
    },
    {
      text: "Kits",
      items: [
        {
          text: "Identity Kit",
          link: "/kits/identity",
        },
      ],
    },
  ],
});
