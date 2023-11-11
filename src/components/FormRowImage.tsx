"use client";

import Image from "next/image";
import styles from "./form-row-image.module.css";
import defaultImage from "../../public/grey_fill.svg";

interface FormRowImageProps {
  type: string;
  name: string;
  labelText?: string;
  imageSrc?: string;
  customCss?: string;
  accept?: string;
  required?: boolean;
}

const FormRowImage = ({
  type,
  name,
  labelText,
  imageSrc,
  customCss,
  required,
  accept,
}: FormRowImageProps) => {
function displaySelectedImage(input: HTMLInputElement): void {
  const image = document.getElementById("avatarImage") as HTMLImageElement;

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        image.src = reader.result as string;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  displaySelectedImage(e.currentTarget);
};

  const handleClick = () => {
    const fileInput = document.getElementById(name) as HTMLInputElement;
    const image = document.getElementById("avatarImage") as HTMLImageElement;
    fileInput.value = "";
    image.src = imageSrc || defaultImage;
  };

  return (
    <div className={`form-row ${customCss}`}>
      <label
        id="fileLabel"
        htmlFor={name}
        className={`form-label ${styles.avatarLabel}`}
      >
        <div className={styles.avatarContainer}>
          <div className={styles.avatarBox}>
            <Image
              unoptimized // 🔧 for data URL
              id="avatarImage"
              className={styles.avatar}
              src={imageSrc || defaultImage}
              alt="current image"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className={styles.avatarText}>{labelText || name}</div>
        <button className="btn" onClick={handleClick}>
          reset
        </button>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`form-input ${styles.input}`}
        required={required}
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRowImage;
