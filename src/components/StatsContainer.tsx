import { CalendarDaysIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";

import StatItem from "./StatItem";
import styles from "./stats-container.module.css";

interface DataStats {
  [key: string]: number;
}
const StatsContainer = ({ data }: { data: DataStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: data?.pending || 0,
      icon: <ClockIcon />,
      type: "primary",
    },
    {
      title: "interviews scheduled",
      count: data?.interview || 0,
      icon: <CalendarDaysIcon />,
      type: "secondary",
    },
    {
      title: "jobs declined",
      count: data?.declined || 0,
      icon: <XMarkIcon />,
      type: "ternary",
    },
  ];
  return (
    <section className={styles.section}>
      {stats.map(({ title, count, icon, type }) => {
        return (
          <StatItem
            key={title}
            title={title}
            count={count.toString()}
            icon={icon}
            type={type}
          />
        );
      })}
    </section>
  );
};

export default StatsContainer;
