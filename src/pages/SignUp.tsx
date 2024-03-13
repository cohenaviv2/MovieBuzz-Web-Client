import { AxiosError } from "axios";
import SignUpForm from "../components/Authentication/SignUpForm/SignUpForm";
import { IUser } from "../services/Types";

export interface SingUpProps {
  error: AxiosError | null;
  register: (user: IUser) => void;
}

function SignUp({ error,register }: SingUpProps) {
  return (
    <div className="signup">
      <h3>Sign Up</h3>
      <SignUpForm signupProps={{ error,register }} />
    </div>
  );
}

export default SignUp;
