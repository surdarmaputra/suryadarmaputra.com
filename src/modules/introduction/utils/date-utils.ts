export function formatWorkDuration(start: string, end: string | null): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const formattedStart = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const formattedEnd = end
    ? endDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  // Calculate duration in months
  const durationMonths = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
  );

  const years = Math.floor(durationMonths / 12);
  const months = durationMonths % 12;

  let duration = "";
  if (years > 0 && months > 0) {
    duration = `${years} year${years > 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
  } else if (years > 0 && months === 0) {
    duration = `${years} year${years > 1 ? "s" : ""}`;
  } else {
    duration = `${months} month${months !== 1 ? "s" : ""}`;
  }

  if (!end) {
    return `${formattedStart} - present (${duration})`;
  }

  return `${formattedStart} - ${formattedEnd} (${duration})`;
}
