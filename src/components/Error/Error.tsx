import { AxiosError } from "../../services/api-client";
import styles from "./Error.module.scss";
import { MdOutlineError } from "react-icons/md";

interface ErrorProps {
  error: AxiosError;
}

function Error({ error }: ErrorProps) {
  return (
    <div className={styles.errorMsg}>
      <MdOutlineError className={styles.errorIcon} />
      {error.message}
    </div>
  );
}

export default Error;
