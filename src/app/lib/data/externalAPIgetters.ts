import { Headers, apiInstanceFetch, apiInstanceFetchCache } from "@/utils/customFetch";
import { parseCookie } from "@/utils/utility";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  try {
    const { data, headers } = await apiInstanceFetch("/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
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
  } catch (error: any) {
    throw error;
  }
};

// response =
// data: {
//   userPrivate: {
//     id: '652d5bc176e3743284f57f77',
//     name: 'al',
//     email: 'algore@gmail.com',
//     lastName: 'gore',
//     location: 'dcb',
//     role: 'USER'
//   }
// },
export const getUser = async () => {
  const token = getAuthCookie();
  if (!token.value) return null;

  try {
    const response = await apiInstanceFetchCache("/users/current-user", {
      headers: {
        // NOTE: If using NextJS < 13.4.0 use:
        // authorization: `bearer ${token}` // Use your cookie
        Cookie: `${token.name}=${token.value}`, // Use your cookie
      },
    });

    return response;
  } catch (err: any) {
    return null;
  }
};

export const getJob = async (id: string) => {
  const token = getAuthCookie();
  if (!token.value) redirect('/login')
  try {
    const response = await apiInstanceFetchCache(`/jobs/${id}`, {
      headers: {
        // NOTE: If using NextJS < 13.4.0 use:
        // authorization: `bearer ${token}` // Use your cookie
        Cookie: `${token.name}=${token.value}`, // Use your cookie
      },
    });

    return response;
  } catch (err: any) {
    return null;
  }
};

export const getJobs = async (queryString: string) => {
  const token = getAuthCookie();
  if (!token.value) redirect("/login");

  // : query filter?
  const url = queryString ? `/jobs?${queryString}` : "/jobs";
  try {
    const response = await apiInstanceFetchCache(url, {
      headers: {
        // NOTE: If using NextJS < 13.4.0 use:
        // authorization: `bearer ${token}` // Use your cookie
        Cookie: `${token.name}=${token.value}`, // Use your cookie
      },
    });

    return response;
  } catch (err: any) {
    return null;
  }
};

type RequestCookie = {
  name: string;
  value: string;
};

export const getAuthCookie = (): RequestCookie => {
  const nextCookies = cookies(); // Get cookies object

  const token = nextCookies.get("token"); // Find cookie

  if (!token) {
    return {
      name: "",
      value: "",
    };
  }
  return token;
};

export const getStats = async () => {
  const token = getAuthCookie();
  if (!token.value) redirect("/login");

  try {
    const response = await apiInstanceFetchCache("/jobs/stats", {
      headers: {
        // NOTE: If using NextJS < 13.4.0 use:
        // authorization: `bearer ${token}` // Use your cookie
        Cookie: `${token.name}=${token.value}`, // Use your cookie
      },
    });

    return response;
  } catch (err: any) {
    return null;
  }
};

export const getAppStats = async () => {
  const token = getAuthCookie();
  if (!token.value) redirect("/login");

  try {
    const response = await apiInstanceFetchCache("/users/admin/app-stats", {
      headers: {
        // NOTE: If using NextJS < 13.4.0 use:
        // authorization: `bearer ${token}` // Use your cookie
        Cookie: `${token.name}=${token.value}`, // Use your cookie
      },
    });

    return response;
  } catch (err: any) {
    return null;
  }
};
