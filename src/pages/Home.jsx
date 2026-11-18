import AiGuardIntroHero from '../components/sections/AiGuardIntroHero';
import CsmIntro from '../components/sections/CsmIntro';
import Hero from '../components/sections/Hero';
import ChallengesSection from '../components/sections/ChallengesSection';
import WhyObelusSection from '../components/sections/WhyObelusSection';
import IntegrationsSection from '../components/sections/IntegrationsSection';
import ResourcesSection from '../components/sections/ResourcesSection';
import InlineFormSection from '../components/sections/InlineFormSection';
import FixedBackground from '../components/common/FixedBackground';
import Seo from '../components/seo/Seo';

/*
 * Landing page order:
 *   AiGuardIntroHero-> big "Introducing OBELUS AI Guard" statement, first
 *                      thing on the page - floats over FixedBackground, no
 *                      background/border of its own
 *   CsmIntro        -> what OBELUS is, in one line
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
      <Seo
        title="OBELUS: AI-Driven Security Operations Platform"
        description="OBELUS unites SIEM, UEBA, threat intelligence and SOAR in one AI-driven security operations platform, so your team cuts risk, shortens response times, and lowers the cost of running a SOC."
        path="/"
      />
      <FixedBackground />
      <AiGuardIntroHero />
      <CsmIntro />
      <Hero />
      <ChallengesSection />
      <WhyObelusSection />
      <IntegrationsSection />
      <ResourcesSection />
      <InlineFormSection />
    </>
  );
}
