import styles from "./Success.module.scss";
import { FaCircleCheck } from "react-icons/fa6";

interface ErrorProps {
  message: string;
}

function Success({ message }: ErrorProps) {
  return (
    <div className={styles.successMsg}>
      <FaCircleCheck className={styles.successIcon} />
      {message}
    </div>
  );
}

export default Success;
