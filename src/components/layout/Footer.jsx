import FooterSubscribeForm from './FooterSubscribeForm';
import MegaFooter from './MegaFooter';
import FooterBottom from './FooterBottom';

export default function Footer() {
  return (
    <div className="site-footer">
      <a className="page-anchor" id="footer" aria-hidden="true" />
      <FooterSubscribeForm />
      <MegaFooter />
      <FooterBottom />
    </div>
  );
}
