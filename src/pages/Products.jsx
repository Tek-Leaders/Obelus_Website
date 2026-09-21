import { productsIntro, products } from '../data/products';
import ProductSection from '../components/products/ProductSection';
import Reveal from '../components/common/Reveal';
import NetworkBackground from '../components/common/NetworkBackground';
import '../styles/products.css';

export default function Products() {
  return (
    <div className="prod-page">
      <section className="prod-hero">
        <NetworkBackground
          className="prod-hero-bg"
          density={0.00007}
          maxLinkDistance={140}
          dotColor="rgba(110, 165, 255, 1)"
          glowColor="rgba(110, 165, 255, 0.95)"
          lineColor="rgba(110, 165, 255, 0.45)"
          orbColor="rgba(110, 165, 255, 0)"
        />
        <div className="prod-container">
          <Reveal>
            <p className="prod-eyebrow">{productsIntro.eyebrow}</p>
            <h1 className="prod-hero-title">{productsIntro.title}</h1>
            <p className="prod-hero-body">{productsIntro.body}</p>
          </Reveal>
        </div>
      </section>

      {products.map((product, i) => (
        <ProductSection product={product} index={i} key={product.id} />
      ))}
    </div>
  );
}
