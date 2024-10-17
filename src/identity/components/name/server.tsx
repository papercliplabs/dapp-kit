import { Suspense } from "react";
import { NameRenderer } from "./NameRenderer";
import { NameProps } from "./types";
import { getNameCached } from "./data";

export function Name({ config, address, resolvers, ...props }: NameProps) {
  return (
    <Suspense fallback={<NameRenderer name={undefined} {...props} />}>
      {/* @ts-ignore: Async server components are valid */}
      <NameContent config={config} address={address} resolvers={resolvers} {...props} />
    </Suspense>
  );
}

async function NameContent({ config, address, resolvers, ...props }: NameProps) {
  const name = await getNameCached({ config, address, resolvers });
  return <NameRenderer name={name.value} {...props} />;
}
