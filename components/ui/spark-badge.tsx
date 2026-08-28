import { useEffect, useRef, useState } from "react";
import { SPARK_BADGE_MARKUP } from "./spark-badge-utils/spark-badge-markup";

export type SparkBadgeVariant = "badge";
export type SparkBadgeProps = {
  className?: string;
  sourceUrl?: string;
  variant?: SparkBadgeVariant;
};

export function SparkBadge({ className = "", sourceUrl }: SparkBadgeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const intersectsRef = useRef(true);
  const [mounted, setMounted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const sync = () =>
      setMounted(
        intersectsRef.current && document.visibilityState !== "hidden",
      );
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersectsRef.current = entry.isIntersecting;
        sync();
      },
      { rootMargin: "80px" },
    );
    observer.observe(host);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!mounted) setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`spark-badge${className ? ` ${className}` : ""}`}
      data-state={!mounted ? "paused" : ready ? "ready" : "loading"}
      data-variant="badge"
      style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: "1.25rem" }}
    >
      {mounted ? (
        <iframe
          className={`spark-badge__frame${ready ? " is-ready" : ""}`}
          title="Animated credential badge in rain"
          {...(sourceUrl ? { src: sourceUrl } : { srcDoc: SPARK_BADGE_MARKUP })}
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      ) : null}
    </div>
  );
}

export default SparkBadge;
