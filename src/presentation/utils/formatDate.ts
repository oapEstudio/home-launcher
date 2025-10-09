
export interface FormatDateOptions {
  locale?: string;
  includeTime?: boolean;
}

export function formatDate(
  date: Date | string | number,
  { locale = "es-AR", includeTime = false }: FormatDateOptions = {}
): string {
  const d = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;


  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };


  if (includeTime) {
    Object.assign(options, {
      hour:   "2-digit",
      minute: "2-digit",
      second: undefined  
    });
  }

  return new Intl.DateTimeFormat(locale, options).format(d);
}
