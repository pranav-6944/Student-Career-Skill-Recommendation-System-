import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "emerald" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";
    
    const variants = {
      default: "bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-md shadow-indigo-600/25 border border-indigo-400/20",
      emerald: "bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white shadow-md shadow-emerald-600/25 border border-emerald-400/20",
      destructive: "bg-red-600 text-white shadow-sm hover:bg-red-500",
      outline: "border border-slate-300 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-indigo-500/40 shadow-sm",
      secondary: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-700 shadow-sm",
      ghost: "hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
      link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline",
      glow: "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 btn-glow border border-indigo-400/40",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8.5 rounded-lg px-3 text-xs font-medium",
      lg: "h-12 rounded-xl px-6 text-base font-bold tracking-wide",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
