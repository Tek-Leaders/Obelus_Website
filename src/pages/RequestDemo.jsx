import NetworkBackground from '../components/common/NetworkBackground';
import RDHero from '../components/requestDemo/RDHero';
import RDForm from '../components/requestDemo/RDForm';
import Seo from '../components/seo/Seo';
import '../styles/request-demo.css';

export default function RequestDemo() {
  return (
    <div className="rd-page">
      <Seo
        title="Request a Demo"
        description="See OBELUS live: SIEM, UEBA, threat intelligence and SOAR unified in one AI-driven security operations platform. Request a demo for your SOC team."
        path="/request-demo"
      />
      <section className="rd-section">
        <NetworkBackground
          className="rd-network-bg"
          dotColor="rgba(110, 165, 255, 1)"
          glowColor="rgba(110, 165, 255, 0.95)"
          lineColor="rgba(110, 165, 255, 0.45)"
          orbColor="rgba(110, 165, 255, 0)"
        />
        <div className="rd-container rd-grid">
          <RDHero />
          <RDForm />
        </div>
      </section>
    </div>
  );
}
