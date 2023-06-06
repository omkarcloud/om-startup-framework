import { SignUpForm } from '../../components/auth';
import Seo from '../../components/Seo';
import UnAuthedLanding from '../../layouts/UnAuthedLanding'

function SignUp() {
  return (
    <>
      <Seo title="Sign Up" />

      <UnAuthedLanding>
        <SignUpForm />
      </UnAuthedLanding>
    </>
  );
}

export default SignUp;
