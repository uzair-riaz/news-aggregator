export const formatDate = (
  value: Date | string,
  formatting: any = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
) => {
  if (!value) return value;

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};
