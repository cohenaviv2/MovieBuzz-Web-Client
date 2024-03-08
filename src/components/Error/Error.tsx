import styles from "./Error.module.scss";
import { MdOutlineError } from "react-icons/md";

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return (
    <div className={styles.errorMsg}>
      <MdOutlineError className={styles.errorIcon} />
      {message}
    </div>
  );
}

export default Error;
