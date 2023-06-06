import Header from '../components/starter/header';
import ContentWrapper from '../components/starter/wrapper';

export default function AuthedDashboard({ children }: any) {
  return (
    <>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}
