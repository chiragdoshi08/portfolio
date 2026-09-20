/** Illustrative capacity estimate. No model call or financial recommendation. */
export function estimateHours(minutes: number, timesPerWeek: number, people: number, reduction: number) {
  const baseline = minutes * timesPerWeek * people / 60;
  return { baseline, saved: baseline * reduction / 100, remaining: baseline * (1 - reduction / 100) };
}
