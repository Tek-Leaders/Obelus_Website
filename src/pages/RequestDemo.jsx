import NetworkBackground from '../components/common/NetworkBackground';
import RDHero from '../components/requestDemo/RDHero';
import RDForm from '../components/requestDemo/RDForm';
import '../styles/request-demo.css';

export default function RequestDemo() {
  return (
    <div className="rd-page">
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
