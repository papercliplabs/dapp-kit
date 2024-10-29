"import client";
import clsx from "clsx";
import { useWalletActionFlowContext } from "./WalletActionFlow";

export function WalletActionFlowProgress() {
  const {
    steps,
    state: { stepNumber },
  } = useWalletActionFlowContext();

  return (
    <div className="dk-flex dk-flex-col dk-gap-2 text-sm w-full">
      {steps.map((step, i) => {
        const state = i < stepNumber ? "completed" : i == stepNumber ? "active" : "todo";
        return (
          <div className="dk-flex dk-flex-col dk-gap-1">
            <div className="dk-flex dk-gap-2 dk-items-center">
              <div
                className={clsx(
                  "dk-w-3 dk-h-3 dk-rounded-full",
                  state == "todo" && "dk-bg-muted",
                  state == "active" && "dk-bg-primary dk-ring-4 dk-ring-primary/30",
                  state == "completed" && "dk-bg-accent-foreground"
                )}
              />
              <span>{step.name}</span>
            </div>
            {i != steps.length - 1 && (
              <div className="dk-w-3 dk-flex dk-items-center dk-justify-center">
                <div
                  className={clsx(
                    "dk-w-[2px] dk-h-[12px]",
                    state == "completed" ? "dk-bg-accent-foreground" : "dk-bg-muted"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
