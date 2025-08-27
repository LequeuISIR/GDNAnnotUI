"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/welcome");
}
