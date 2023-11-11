import { redirect } from "next/navigation";

import { handleFormPost } from "@/app/lib/actions/externalAPIactions";
import { getUser } from "@/app/lib/data/externalAPIgetters";
import FormLoginComponent from "@/components/FormLoginComponent";

export default async function Page() {
// 🔧 if user connected - redirect to dashboard
const user = await getUser();

if (user) return redirect("/dashboard");
  return <FormLoginComponent handleFormPost={handleFormPost} />;
}
