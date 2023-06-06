import { SendPasswordResetForm } from "../../components/auth"

import Seo from '../../components/Seo';
import UnAuthedLanding from "../../layouts/UnAuthedLanding"

function ForgotPassword() {
  return (
    <>
      <Seo title="Reset your password" />

      <UnAuthedLanding>
        <SendPasswordResetForm />
      </UnAuthedLanding>
    </>
  );
}

export default ForgotPassword
