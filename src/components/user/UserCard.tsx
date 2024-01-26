import { Link } from "react-router-dom";
import "../../styles/user/UserCard.css";

interface UserProps {
  userId: string;
  fullName: string;
  imageUrl: string;
}

function UserCard({fullName, imageUrl }: UserProps) {
  return (
    // <Link to={`/users/${userId}`}>
      <div className="user-card">
        <img src={imageUrl} alt={fullName} className="user-img" />
        <div className="user-title">{fullName}</div>
      </div>
    // </Link>
  );
}

export default UserCard;
