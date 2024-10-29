import { Suspense } from "react";
import { Address } from "viem";
import { getAvatarCached, getNameCached } from "@/data/identity";
import IdentityContainer from "./IdentityContainer";
import { Avatar as AvatarDappKit, Name as NameDappKit } from "@paperclip-labs/dapp-kit/identity/ui";
import { IdentityProps } from "./types";

export function Identity({ address, avatarSize, hideName, hideAvatar, ...props }: IdentityProps) {
  return (
    <IdentityContainer {...props}>
      {!hideAvatar && (
        <Suspense fallback={<AvatarDappKit address={address} avatar={undefined} size={avatarSize} />}>
          <AvatarContent address={address} size={avatarSize} />
        </Suspense>
      )}

      {!hideName && (
        <Suspense fallback={<NameDappKit name={undefined} />}>
          <NameContent address={address} />
        </Suspense>
      )}
    </IdentityContainer>
  );
}

async function AvatarContent({ address, size }: { address: Address; size: number }) {
  const name = await getAvatarCached(address);
  return <AvatarDappKit address={address} avatar={name ?? undefined} size={size} />;
}

async function NameContent({ address }: { address: Address }) {
  const name = await getNameCached(address);
  return <NameDappKit name={name ?? undefined} />;
}
