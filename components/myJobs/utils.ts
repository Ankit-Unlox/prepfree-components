
export function timeAgo(dateString: string): string {
  const [day, month, year] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const days = diffMs / (1000 * 60 * 60 * 24);

  if (days < 1) {
    return "today";
  }

  if (days < 30) {
    return `${Math.floor(days)} day${Math.floor(days) !== 1 ? "s" : ""} ago`;
  }

  const months = days / 30;

  if (months < 12) {
    return `${months >= 10 ? months.toFixed(1) : Math.floor(months)} month${months >= 1.5 ? "s" : ""} ago`;
  }

  const years = months / 12;

  return `${years >= 10 ? years.toFixed(1) : years.toFixed(1).replace(/\.0$/, "")} year${years >= 1.5 ? "s" : ""} ago`;
}