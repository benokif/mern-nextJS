import Image from "next/image";
import Link from "next/link";

import Logo from "@/components/Logo";

import styles from "./page.module.css";
import main from "../../public/main.svg";

export default function Home() {
  return (
    <section>
      <nav className={styles.nav}>
        <Logo class=""/>
      </nav>
      <div className={`container ${styles.page}`}>
        <div className="info">
          <h1 className={styles.title}>
            job <span className={styles.span}>tracking</span> app
          </h1>

          <p className={styles.text}>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link
            href="/register"
            className={`btn ${styles.btn} ${styles.registerLink}`}
          >
            Register
          </Link>
          <Link href="/login" className={`btn ${styles.btn}`}>
            Login / Demo User
          </Link>
        </div>
        <Image
          src={main}
          width={400}
          height={353}
          className={`img ${styles.mainImg}`}
          alt="Main Logo"
          priority
        />
      </div>
    </section>
  );
}
