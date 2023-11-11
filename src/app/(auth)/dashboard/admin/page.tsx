import React from "react";
import { getAppStats, getUser } from "@/app/lib/data/externalAPIgetters";

import { UserRole } from "@/types/backendTypes";

import styles from "./styles.module.css";
import StatItem from "@/components/StatItem";
import { NewspaperIcon, UsersIcon } from "@heroicons/react/24/outline";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const [user, stats] = await Promise.all([getUser(), getAppStats()])

  let usersCount: number = 0;
  let jobsCount: number = 0;

  // 🧐 this is redundant - is it necessary? done in /dashboard layout, which is a parent
  if (!user) return redirect("/login");
  if (user.data?.userPrivate?.role !== UserRole.ADMIN)
    return redirect("/dashboard");

  if (stats && stats.data) {
    let { users, jobs } = stats.data;
    usersCount = users;
    jobsCount = jobs;
  }
  return (
    <div>
      <StatItem
        title="current users"
        count={usersCount.toString()}
        icon={<UsersIcon />}
        type={"primary"}
      />
      <StatItem
        title="total jobs"
        count={jobsCount.toString()}
        icon={<NewspaperIcon />}
        type={"secondary"}
      />
    </div>
  );
};

export default Page;
