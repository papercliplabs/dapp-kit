import Providers from "./providers";

import "@paperclip-labs/whisk-sdk/styles.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
