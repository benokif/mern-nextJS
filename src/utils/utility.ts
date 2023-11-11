// input: token=value; Path=/; Expires=Sat, 21 Oct 2023 09:47:01 GMT; HttpOnly
// output: 
// {
//   token: 'value',
//   Path: '/',
//   Expires: 'Sat, 21 Oct 2023 09:47:01 GMT'
// }

export const parseCookie = (cookieString: string | null): Record<string, string> => {
  const cookies = (cookieString || "").split(";");
  const cookieData: Record<string, string> = {};

  cookies.forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      cookieData[key] = value;
    }
  });

  return cookieData;
}

export const addPropertyToFormData = (formData: FormData, key: string, value: FormDataEntryValue | null) => {
  if (value) {
    formData.append(key, value);
  }
}
