import { pillars, pillarsHeading } from '../../data/pillars';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import GradientText from '../common/GradientText';
import PillarFeature from './PillarFeature';

export default function WhyObelusSection() {
  return (
    <CustomBackground>
      <div>
        <PageAnchor id="capabilities" />
        <section
          className="heading-branded section-heading text-center theme-light section-space spacer-xlarge bottom-spacer-none center-on-tablet"
          data-type="obelus"
        >
          <div
            className="container-fluid"
          >
            <div className="row justify-content-center">
              <div className="col-12 col-xl-12">
                <h2 className="h3 title text-500 text-dark">
                  <GradientText parts={pillarsHeading.titleParts} />
                </h2>
              </div>
              <div className="col-12 col-xl-8">
                <p className="text-lg text-dark">{pillarsHeading.body}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {pillars.map((pillar, i) => (
        <PillarFeature pillar={pillar} index={i} key={pillar.image} />
      ))}
    </CustomBackground>
  );
}
