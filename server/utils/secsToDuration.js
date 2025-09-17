exports.secToDuration = (seconds) => {
  let min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  let hours = 0;

  if (min >= 60) {
    hours = Math.floor(min / 60);
    min = min % 60;
  }

  const parts = [];
  if (hours > 0) parts.push(`${hours}hr`);
  if (min > 0) parts.push(`${min}min`);
  if (sec > 0 || parts.length === 0) parts.push(`${sec}sec`);

  return parts.join(" ");
};
