"use client";

import styles from "./error.module.css";

import errorBg from "../../../../public/errorBg.svg";
import Image from "next/image";
import Link from "next/link";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <h2>
        Something went wrong! {error?.message || "unknown error"}
        <br />
        you can:{" "}
      </h2>
      <div className={styles.buttonContainer}>
        <button className="btn" onClick={() => reset()}>
          try again
        </button>
        <Link href="/dashboard" className="btn">
          go to dashboard
        </Link>
      </div>
      <Image src={errorBg} alt="error background" width={1119} height={699}/>
    </div>
  );
}
