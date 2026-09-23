import { csmIntro } from '../../data/hero';
import '../../styles/csm-intro.css';

/**
 * The statement that opens the landing page, above the hero: what OBELUS is,
 * in one line. It carries the page's <h1> - the hero's headline below it is
 * an <h2> so the document keeps a single top-level heading.
 */
export default function CsmIntro() {
  return (
    <section className="csm-intro" aria-labelledby="csm_intro_title">
      <div className="container-fluid">
        <div className="csm-intro-inner">
          <h1 className="csm-intro-title" id="csm_intro_title">
            {csmIntro.brand}
            <span className="csm-intro-dash" aria-hidden="true"> — </span>
            <span className="csm-intro-title-rest">{csmIntro.title}</span>
          </h1>
          <p className="csm-intro-body">{csmIntro.body}</p>
        </div>
      </div>
    </section>
  );
}
