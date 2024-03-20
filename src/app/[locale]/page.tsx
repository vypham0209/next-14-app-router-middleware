//THIRD PARTY MODULES
import { ErrorBoundary } from 'react-error-boundary';
//RELATIVE MODULES
import ContactUs from './comps/ContactUs';
import ListSection from './comps/ListSection';
import GraphSection from './comps/GraphSection';
import SlideSection from './comps/SlideSection';
import BannerSection from './comps/BannerSection';
import RethinkSection from './comps/RethinkSection';
import NumbersSection from './comps/NumbersSection';
import InsightsSection from './comps/InsightsSection';
import WhoWeAreSection from './comps/WhoWeAreSection';
import InspiringSection from './comps/InspiringSection';
import SubscribeSection from './comps/SubscribeSection';
import SocialWallSection from './comps/SocialWallSection';
import DownloadAppSection from './comps/DownloadAppSection';
import ExploreFoodSection from './comps/ExploreFoodSection';
import ListSectionFallback from './comps/ListSectionFallback';
import FounderQuoteSection from './comps/FounderQuoteSection';
import SlideSectionFallback from './comps/SlideSectionFallback';
import GraphSectionFallback from './comps/GraphSectionFallback';
import BannerSectionFallback from './comps/BannerSectionFallback';
import NumbersSectionFallback from './comps/NumbersSectionFallback';
import WhoWeAreSectionFallback from './comps/WhoWeAreSectionFallback';
import InspiringSectionFallback from './comps/InspiringSectionFallback';
import ExploreFoodSectionFallback from './comps/ExploreFoodSectionFallback';
import DownloadAppSectionFallback from './comps/DownloadAppSectionFallback';
import FounderQuoteSectionFallback from './comps/FounderQuoteSectionFallback';

export default function Home() {
  return (
    <>
      <ErrorBoundary fallback={<BannerSectionFallback />}>
        <BannerSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<InspiringSectionFallback />}>
        <InspiringSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<WhoWeAreSectionFallback />}>
        <WhoWeAreSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<SlideSectionFallback />}>
        <SlideSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ListSectionFallback />}>
        <ListSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<GraphSectionFallback />}>
        <GraphSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<NumbersSectionFallback />}>
        <NumbersSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<FounderQuoteSectionFallback />}>
        <FounderQuoteSection />
      </ErrorBoundary>
      <RethinkSection />
      <ErrorBoundary fallback={<ExploreFoodSectionFallback />}>
        <ExploreFoodSection />
      </ErrorBoundary>
      <InsightsSection />
      <SocialWallSection />
      <ErrorBoundary fallback={<DownloadAppSectionFallback />}>
        <DownloadAppSection />
      </ErrorBoundary>
      <ErrorBoundary fallback={<ExploreFoodSectionFallback />}>
        <ExploreFoodSection />
      </ErrorBoundary>
      <SubscribeSection />
      <ContactUs />
    </>
  );
}
