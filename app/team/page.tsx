import { redirect } from "next/navigation";

// Redirect /team to /about since team section is part of the about page
export default function TeamPage() {
  redirect("/about#team");
}
