import Header, { LandingPageHeader } from '../components/starter/header';
import ContentWrapper from '../components/starter/wrapper';

export default function AuthedLanding({ children }: any) {
  return (
    <>
      <LandingPageHeader is_authenticated />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}
