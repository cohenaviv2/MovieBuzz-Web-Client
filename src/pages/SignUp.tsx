import SignUpForm from "../components/Authentication/SignUpForm/SignUpForm";
import { IUser } from "../services/Types";

export interface SingUpProps {
  register: (user: IUser) => void;
}

function SignUp({register}:SingUpProps) {
  return (
    <div className="signup">
      <h3>Sign Up</h3>
      <SignUpForm signUpProps={{register}}/>
    </div>
  );
}

export default SignUp;
