import { MdOutlineNavigateBefore } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  loading: boolean;
}

function Pagination({ page, handlePrevPage, handleNextPage, loading }: PaginationProps) {
  return (
    <div className={styles.paginationContainer}>
      <button className={styles.paginationBtn} onClick={handlePrevPage} disabled={loading}>
        <MdOutlineNavigateBefore className={styles.paginationIcon} />
      </button>
      <div className={styles.pageContainer} onClick={handlePrevPage} >
        {page}
      </div>
      <button className={styles.paginationBtn} onClick={handleNextPage} disabled={loading}>
        <MdOutlineNavigateNext className={styles.paginationIcon} />
      </button>
    </div>
  );
}

export default Pagination;
