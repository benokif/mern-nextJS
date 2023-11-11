import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";
import styles from "./chart.module.css";

interface GroupedObject {
  createdAt: string;
  count: number;
}

const AreaChart = ({
  data,
  count,
}: {
  data: GroupedObject[];
  count: number;
}) => {
  const divRef = useRef();
  useEffect(() => {
    const chart = Plot.plot({
      x: { padding: 0.4, type: "band" },
      y: {
        ticks: [0, ...Array.from({ length: count }, (_, index) => index + 1)],
      },
      marginTop: 50,
      grid: true,
      marginBottom: 50,

      style: "background: transparent; font-size: 1rem",
      marks: [
        Plot.ruleY([0]),
        Plot.lineY(data, {
          x: "createdAt",
          y: "count",
          stroke: "#10b981",
        }),
      ],
    });
    //@ts-ignore
    divRef?.current.append(chart);
    return () => chart.remove();
  }, [data]);
  return (
    <>
      <div
        className={styles.container} //@ts-ignore
        ref={divRef}
      ></div>
    </>
  );
};

export default AreaChart;
