import { Headers, apiInstanceFetch } from "@/utils/customFetch";
import { parseCookie } from "@/utils/utility";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleFormPost = async (
  formData: FormData,
  path: string,
  multiform: boolean,
  cookie?: boolean,
  method: string = "POST"
): Promise<string | void> => {
  "use server"; 

  let headersReq: Headers | undefined;
  if (cookie) {
    const nextCookies = cookies(); // Get cookies object

    const token = nextCookies.get("token"); // Find cookie
    if (!token) throw new Error("not authenticated");
    headersReq = {
      Cookie: `${token.name}=${token.value}`,
    };
  }

  try {
    //     formData - FormData {
    //   [Symbol(state)]: [
    //     { name: 'name', value: 'toby' },
    //     { name: 'lastName', value: 'tobyiii' },
    //     { name: 'location', value: 'toulouse' },
    //     { name: 'email', value: 'toby@gmail.com' },
    //     { name: 'password', value: 'secret123' }
    //   ]
    // }

    let formDataJSON = {};
    if (!multiform) {
      // JSON
      formData.forEach((value, key) => {
        //@ts-ignore
        formDataJSON[key] = value;
      });
    }

    const { data, headers } = await apiInstanceFetch(path, {
      //const response = await apiInstanceFetch(`/auth/${path}`, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: multiform
        ? headersReq
        : { ...headersReq, "Content-Type": "application/json" },
      body: multiform ? formData : JSON.stringify(formDataJSON), //formData,
    });

    // 🔧 set cookies in browser
    if (headers.get("set-cookie")) {
      const parsedCookies = parseCookie(headers.get("set-cookie"));
      cookies().set({
        name: "token",
        value: parsedCookies["token"],
        httpOnly: true,
        path: parsedCookies["Path"],
      });
    }


  } catch (error) {

    throw error;
    //return error instanceof Error ? error.message : "error";
  }
};
export const handleFormDelete = async (
  path: string,
  cookie?: boolean
): Promise<string | void> => {
  "use server"; //❗️problem: server component cannot store cookies

  // const data = Object.fromEntries(formData);

  // try {
  //   await customFetch.post(`/auth/${path}`, data);
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     return error.response?.data?.msg || "An error occurred";
  //   } else {
  //     return "An error occurred";
  //   }
  // }

  //option2: fetch
  let headersReq: Headers | undefined;
  if (cookie) {
    const nextCookies = cookies(); // Get cookies object

    const token = nextCookies.get("token"); // Find cookie
    if (!token) throw new Error("not authenticated");
    headersReq = {
      Cookie: `${token.name}=${token.value}`,
    };
  }

  try {
    const { data, headers } = await apiInstanceFetch(path, {
      //const response = await apiInstanceFetch(`/auth/${path}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: headersReq,
    });

    // 🔧 set cookies in browser
    if (headers.get("set-cookie")) {
      const parsedCookies = parseCookie(headers.get("set-cookie"));
      cookies().set({
        name: "token",
        value: parsedCookies["token"],
        httpOnly: true,
        path: parsedCookies["Path"],
      });
    }


  } catch (error) {
    throw error;
  }
};

