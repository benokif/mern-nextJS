import Link from "next/link";

import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={`container full-screen ${styles.notFound}`}>
      <h3>Oh! Page not found...</h3>
      <p>Could not find the page you are looking for</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
