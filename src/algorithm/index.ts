// Public API of the matching "backend" module.
// UI code should import from "@/algorithm" only.

export * from "./types";
export * from "./labels";
export { sampleUsers } from "./sampleUsers";
export { calculateMatches } from "./matcher";
