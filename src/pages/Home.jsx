import Hero from '../components/sections/Hero';
import ChallengesSection from '../components/sections/ChallengesSection';
import WhyObelusSection from '../components/sections/WhyObelusSection';
import IntegrationsSection from '../components/sections/IntegrationsSection';
import ResourcesSection from '../components/sections/ResourcesSection';
import InlineFormSection from '../components/sections/InlineFormSection';
import FixedBackground from '../components/common/FixedBackground';

/*
 * Landing page order:
 *   Hero            -> the promise
 *   Challenges      -> the problem it answers
 *   WhyObelusSection-> "Unite your defense": detect / hunt / investigate / respond
 *   Integrations    -> it fits the stack you already run
 *   Resources       -> proof and further reading
 *   InlineForm      -> speak to an expert
 *
 * ProductTourSection is still in components/sections and can be dropped back
 * in above Resources; it plays the OBELUS product-tour video.
 */
export default function Home() {
  return (
    <>
      <FixedBackground />
      <Hero />
      <ChallengesSection />
      <WhyObelusSection />
      <IntegrationsSection />
      <ResourcesSection />
      <InlineFormSection />
    </>
  );
}
