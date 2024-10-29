"import client";
import clsx from "clsx";
import { useWalletActionFlowContext } from "./WalletActionFlow";

interface WalletActionFlowProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

export function WalletActionFlowProgress({
  direction = "horizontal",
  className,
  ...props
}: WalletActionFlowProgressProps) {
  const {
    steps,
    state: { stepNumber },
  } = useWalletActionFlowContext();

  return (
    <div
      className={clsx(
        "dk-flex dk-gap-2 dk-text-sm",
        direction == "vertical" ? "dk-flex-col dk-w-full" : "dk-pb-[32px] dk-justify-center dk-items-center dk-w-[80%]",
        className
      )}
      {...props}
    >
      {steps.map((step, i) => {
        const state = i < stepNumber ? "completed" : i == stepNumber ? "active" : "todo";
        return (
          <>
            <div className={clsx("dk-flex dk-gap-2 dk-items-center dk-relative")}>
              <div
                className={clsx(
                  "dk-w-3 dk-h-3 dk-rounded-full",
                  state == "todo" && "dk-bg-muted",
                  state == "active" && "dk-bg-primary dk-ring-4 dk-ring-primary/30",
                  state == "completed" && "dk-bg-primary"
                )}
              />
              <div
                className={clsx(
                  direction == "horizontal" &&
                    "dk-absolute dk-top-[16px] -dk-translate-x-[calc(50%-6px)] dk-text-center"
                )}
              >
                {step.name}
              </div>
            </div>
            {i != steps.length - 1 && (
              <div className="dk-flex dk-items-center dk-flex-grow">
                <div
                  className={clsx(
                    direction == "horizontal" ? "dk-w-full dk-h-[2px]" : "dk-ml-[5px] dk-w-[2px] dk-h-[12px]",
                    state == "completed" ? "dk-bg-primary" : "dk-bg-muted"
                  )}
                />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
