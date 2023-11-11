function objectToQueryString(obj: Record<string, string>): string {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return queryString;
}

export default objectToQueryString