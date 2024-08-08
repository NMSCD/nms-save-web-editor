const formatTimePart = (timePart: number) => timePart.toString().padStart(2, '0');

/**
 *
 * @param timestamp takes playtime in seconds from TotalPlayTime
 */
export function formatTime(timestamp: number) {
  const secondsInMinutes = 60;
  const secondsInHours = secondsInMinutes ** 2;
  const hours = Math.floor(timestamp / secondsInHours);
  const hoursInSeconds = hours * secondsInHours;
  const secondsWithoutHours = timestamp - hoursInSeconds;
  const minutes = Math.floor(secondsWithoutHours / secondsInMinutes);
  const minutesInSeconds = minutes * secondsInMinutes;
  const seconds = secondsWithoutHours - minutesInSeconds;
  return `${formatTimePart(hours)}:${formatTimePart(minutes)}:${formatTimePart(seconds)}`;
}
