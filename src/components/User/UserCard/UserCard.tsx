// import { Link } from "react-router-dom";
import { IUserDetails } from "../../../services/Types";
import styles from "./UserCard.module.scss";


function UserCard({ fullName, imageUrl }: IUserDetails
  ) {
  return (
    // <Link to={`/users/${userId}`}>
    <div className={styles.userCard}>
      <img src={imageUrl} alt={fullName} />
      {fullName}
    </div>
    // </Link>
  );
}

export default UserCard;
