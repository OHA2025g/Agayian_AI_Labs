"use client";

import { motion, useReducedMotion } from "framer-motion";

export function LifecycleStrip({ stages }: { stages: string[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((stage, index) => (
        <motion.div
          key={stage}
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-2"
        >
          <span className="rounded-md border border-white/10 bg-bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-text-on-dark">
            {stage}
          </span>
          {index < stages.length - 1 && (
            <span className="hidden text-cyan sm:inline">→</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
