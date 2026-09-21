import { Link } from 'react-router-dom';
import { integrationsHeading, integrationGroups } from '../../data/integrations';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import GradientText from '../common/GradientText';
import Reveal from '../common/Reveal';

/**
 * "Works with the stack you already run". Built from the same container /
 * grid / eyebrow / button classes the rest of the page uses; the only new
 * styling is the connector chips, in styles/integrations.css.
 */
export default function IntegrationsSection() {
  return (
    <CustomBackground id="custom_bg_id_integrations" variant="custom">
      <div className="integrationsComp baseComponent parbase section">
        <PageAnchor id="integrations" />
        <section
          className="integrations theme-dark base-comp-spacer spacer-large tablet-spacer-unset mobile-spacer-unset bottom-spacer-large bottom-tablet-spacer-unset bottom-mobile-spacer-unset"
          data-type="obelus"
          aria-labelledby="integrations_heading"
        >
          <div className="container-fluid">
            <div className="row justify-content-center text-center">
              <div className="col-12 col-lg-9">
                <p className="eyebrow text-dark">{integrationsHeading.eyebrow}</p>
                <h2 className="h3 text-dark" id="integrations_heading">
                  <GradientText parts={integrationsHeading.titleParts} />
                </h2>
                <p className="body-sans-1 text-dark mt-3">{integrationsHeading.body}</p>
              </div>
            </div>

            <div className="row integration-groups">
              {integrationGroups.map((group, i) => (
                <Reveal
                  className="col-12 col-md-6 col-xl-3 mb-4"
                  key={group.label}
                  delay={i * 80}
                >
                  <div className="integration-group">
                    <h3 className="h8 integration-group-title text-500 text-dark">
                      {group.label}
                    </h3>
                    <ul className="list-unstyled integration-chips">
                      {group.items.map((item) => (
                        <li className="integration-chip" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <Link
                  to={integrationsHeading.cta.href}
                  className="btn btn-primary dark"
                  data-page-track="true"
                  data-page-track-value="obelus:integrations:see integrations"
                >
                  {integrationsHeading.cta.label}
                  <i />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CustomBackground>
  );
}
