import { redirect } from "next/navigation";

// Root page redirects to the (site) home
export default function RootPage() {
  redirect("/");
}
