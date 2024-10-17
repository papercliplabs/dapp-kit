import { Suspense } from "react";
import { getName } from "../../api";
import { NameRenderer } from "./NameRenderer";
import { NameProps } from "./types";

export function Name(props: NameProps) {
  return (
    <Suspense fallback={<NameRenderer name={undefined} />}>
      {/* @ts-ignore: Async server components are valid */}
      <NameContent {...props} />
    </Suspense>
  );
}

async function NameContent({ config, address, resolvers, ...props }: NameProps) {
  const name = await getName({ config, address, resolvers });
  return <NameRenderer name={name.value} {...props} />;
}
