import { SignInForm } from "../../components/auth"
import Seo from '../../components/Seo';
import UnAuthedLanding from "../../layouts/UnAuthedLanding"

function SignIn() {
  return (
    <>
      <Seo title="Sign In" />

      <UnAuthedLanding>
        <SignInForm />
      </UnAuthedLanding>
    </>
  );
}

export default SignIn
