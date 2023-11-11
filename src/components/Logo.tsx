import Image from "next/image";
import logo from "../../public/logo.svg";

type LogoProps = {
  class: string;
};

const Logo = (props: LogoProps) => {
  return <Image src={logo} className={props.class} alt="Jobify Logo" priority width={164} height={50}/>;
};

export default Logo;
