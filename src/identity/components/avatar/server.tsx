import { Suspense } from "react";
import { getAvatar } from "../../api";
import { AvatarRenderer } from "./AvatarRenderer";
import { AvatarProps } from "./types";

export async function Avatar(props: AvatarProps) {
  return (
    <Suspense fallback={<AvatarRenderer imgSrc={undefined} {...props} />}>
      {/* @ts-ignore: Async server components are valid */}
      <AvatarContent {...props} />
    </Suspense>
  );
}

async function AvatarContent({ config, address, resolvers, ...props }: AvatarProps) {
  const avatar = await getAvatar({ config, address, resolvers });

  return <AvatarRenderer address={address} imgSrc={avatar?.value ?? undefined} {...props} />;
}
