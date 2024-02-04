import { Link } from "react-router-dom";
import styles from "./UserCard.module.scss";

interface UserProps {
  userId: string;
  fullName: string;
  imageUrl: string;
}

function UserCard({ userId, fullName, imageUrl }: UserProps) {
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
