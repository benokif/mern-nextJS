import  {  ReactNode } from 'react'
import styles from './job-info.module.css'

const JobInfo = ({ icon, text } : {
   icon: ReactNode; text: string; 
}) => {
  return (
    <div className={styles.jobInfo}>
      <span className={styles.jobIcon}>{icon}</span>
      <span className={styles.jobText}>{text}</span>
    </div>
  )
}

export default JobInfo