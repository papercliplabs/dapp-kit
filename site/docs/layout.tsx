import type { ReactNode } from "react";
import Providers from "./providers";

import "@paperclip-labs/whisk-sdk/styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}
