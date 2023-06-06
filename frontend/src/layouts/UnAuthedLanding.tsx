import  { LandingPageHeader } from '../components/starter/header';
import ContentWrapper from '../components/starter/wrapper';

export default function UnAuthedLanding({ children }: any) {
  return (
    <>
      <LandingPageHeader />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}
