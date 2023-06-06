import { GetServerSideProps } from 'next/types';
import { ResetPasswordForm } from '../../../components/auth';
import BackendAxios from '../../../utils/axios/backend';
import Seo from '../../../components/Seo';
import UnAuthedLanding from '../../../layouts/UnAuthedLanding'

function ResetPasswordVerify({ token }: { token: string }) {
  return (
    <>
      <Seo title="Reset your password" />

      <UnAuthedLanding>
        <ResetPasswordForm token={token} />
      </UnAuthedLanding>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
  req,
}) => {
  const token = (params as any).token;
  const { data } = await BackendAxios.get(
    `/auth/reset-password-verify/${token}/`
  );

  if (data.redirect) {
    return {
      redirect: { destination: data.redirect, permanent: false },
    };
  }

  return {
    props: { token: token },
  };
};

export default ResetPasswordVerify;
