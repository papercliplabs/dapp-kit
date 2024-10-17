import { Suspense } from "react";
import { AvatarRenderer } from "./AvatarRenderer";
import { AvatarProps } from "./types";
import { getAvatarCached } from "./data";

export async function Avatar({ config, address, resolvers, ...props }: AvatarProps) {
  return (
    <Suspense fallback={<AvatarRenderer imgSrc={undefined} address={address} {...props} />}>
      {/* @ts-ignore: Async server components are valid */}
      <AvatarContent config={config} address={address} resolvers={resolvers} {...props} />
    </Suspense>
  );
}

async function AvatarContent({ config, address, resolvers, ...props }: AvatarProps) {
  const avatar = await getAvatarCached({ config, address, resolvers });
  return <AvatarRenderer address={address} imgSrc={avatar?.value ?? undefined} {...props} />;
}
