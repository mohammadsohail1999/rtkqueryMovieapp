export const mintohrmin = (min) => {
  const hours = min / 60;
  const roundHours = Math.floor(hours);
  const mins = (hours - roundHours) * 60;
  const roundMin = Math.floor(mins);

  return `${roundHours}h ${roundMin}min`;
};
