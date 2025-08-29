// src/lib/utils.ts
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge de classes Tailwind com condicionais */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// export default também, para cobrir imports diferentes
export default cn;

