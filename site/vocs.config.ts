import { defineConfig } from "vocs";
import { ModuleKind, ModuleResolutionKind, ScriptTarget} from 'typescript'

export default defineConfig({
    vite: {
        ssr: {
            noExternal: ["@paperclip-labs/whisk-sdk", "@paperclip-labs/whisk-core"]
        }
    },
    twoslash: {
        compilerOptions: {
            allowUmdGlobalAccess: true,
            esModuleInterop: true,
            target: ScriptTarget.ES2022,
            module: ModuleKind.ES2022,
            moduleResolution: ModuleResolutionKind.Bundler
        },
    },
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
