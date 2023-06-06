import { ToolsHeader } from '../components/starter/header';
import ContentWrapper from '../components/starter/wrapper';

export default function ToolsDashboard({ children }: any) {
  return (
    <>
      <ToolsHeader />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}
