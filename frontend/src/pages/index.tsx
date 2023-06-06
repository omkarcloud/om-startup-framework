import DashboardContent from '../components/DashboardContent';
import LandingContent from '../components/LandingContent';
import Seo from '../components/Seo';
import AuthedDashboard from '../layouts/AuthedDashboard';
import UnAuthedLanding from '../layouts/UnAuthedLanding';

const Page = ({ is_authenticated , ...props }:any) => {
  const showLanding = !is_authenticated
  return (
    <>
      <Seo title="Home" isLanding={showLanding} hasChat={showLanding} />

      {is_authenticated ? (
        <AuthedDashboard>
          <DashboardContent {...props} />
        </AuthedDashboard>
      ) : (
        <UnAuthedLanding>
          <LandingContent />
        </UnAuthedLanding>
      )}
    </>
  );
};

export default Page;
