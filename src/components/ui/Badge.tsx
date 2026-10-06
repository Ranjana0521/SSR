import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "gold"
    | "outline"
    | "navy";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium rounded-md",
    md: "text-xs px-2.5 py-1 font-semibold rounded-lg",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    primary: "bg-blue-50 text-blue-700 border border-blue-200/60",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/60",
    danger: "bg-rose-50 text-rose-700 border border-rose-200/60",
    gold: "bg-amber-100 text-amber-900 border border-amber-300",
    navy: "bg-slate-900 text-white border border-slate-800",
    outline: "bg-white text-slate-700 border border-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 leading-none tracking-wide",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
