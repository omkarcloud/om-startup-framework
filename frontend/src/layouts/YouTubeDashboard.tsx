import { YouTubeHeader } from '../components/starter/header';
import ContentWrapper from '../components/starter/wrapper';

export default function YoutubeDashboard({ children }: any) {
  return (
    <>
      <YouTubeHeader />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}
