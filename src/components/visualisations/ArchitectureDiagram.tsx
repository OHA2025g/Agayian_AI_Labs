"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ArchitectureDiagram({
  nodes,
  className,
}: {
  nodes: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-bg-elevated/40 p-6 grid-texture",
        className,
      )}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node, index) => (
          <motion.div
            key={node}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-lg border border-white/10 bg-bg-primary/70 px-4 py-4 text-sm font-medium text-text-on-dark shadow-[inset_0_0_0_1px_rgba(25,195,211,0.05)]"
          >
            <span className="mb-2 block h-1 w-8 rounded-full bg-gradient-to-r from-brand to-cyan" />
            {node}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
