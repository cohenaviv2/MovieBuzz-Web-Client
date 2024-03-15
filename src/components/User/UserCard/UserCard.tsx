// import { Link } from "react-router-dom";
import { IUserDetails } from "../../../services/Types";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  userDetails:IUserDetails;
  size: "small" | "big";
}

function UserCard({ userDetails, size }: UserCardProps) {
  return (
    // <Link to={`/users/${userId}`}>
    <div className={size == "small" ? styles.userCardSmall : styles.userCardBig}>
      <img src={userDetails.imageUrl} alt={userDetails.fullName} />
      {userDetails.fullName}
    </div>
    // </Link>
  );
}

export default UserCard;
