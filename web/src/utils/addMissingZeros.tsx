export function addMissingZeros(time: number) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}
