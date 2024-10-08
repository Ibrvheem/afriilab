import React from "react";

export function Count({
  count,
  active = true,
  className,
}: {
  count: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`${
        active ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
      } ${className} ml-1.5 rounded-full py-0.5 px-2.5 text-xs font-medium inline-flex`}
    >
      {count}
    </span>
  );
}
