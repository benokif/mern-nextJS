import React from "react";

import {
  DocumentPlusIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  UserIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

const links = [
  {
    text: "add job",
    path: "/dashboard/add-job",
    icon: <DocumentPlusIcon />,
  },
  {
    text: "all jobs",
    path: "/dashboard/all-jobs",
    icon: <DocumentMagnifyingGlassIcon />,
  },
  {
    text: "stats",
    path: "/dashboard/stats",
    icon: <ChartBarIcon />,
  },
  {
    text: "profile",
    path: "/dashboard/profile",
    icon: <UserIcon />,
  },
  {
    text: "admin",
    path: "/dashboard/admin",
    icon: <KeyIcon />,
  },
];


export default links;
