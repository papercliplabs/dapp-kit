import clsx from "clsx";

interface ProgressCircleProps {
  state: "active" | "completed" | "todo";
}

export default function ProgressCircle({ state }: ProgressCircleProps) {
  return (
    <div
      className={clsx(
        "dk-h-3 dk-w-3 dk-rounded-full dk-bg-secondary",
        state == "active" && "dk-accent-foreground dk-ring-4 dk-ring-accent-background",
        state == "completed" && "dk-bg-accent"
      )}
    ></div>
  );
}
