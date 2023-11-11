"use client"

import {useState} from 'react'
import styles from "./chart-container.module.css"
import BarChart from './BarChart';
import AreaChart from './AreaChart';

interface GroupedObject {
  createdAt: string;
  count: number;
}

const ChartsContainer = ({data, count} : {data: GroupedObject[]; count: number}) => {

  const [barChart, setBarChart] = useState(true)
  return (
    <section className={styles.section}>
      <h4 className={styles.h4}>Monthly Applications</h4>
      <button className={styles.button} type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} count={count}/> : <AreaChart data={data} count={count}/>}
    </section>
  );
}

export default ChartsContainer