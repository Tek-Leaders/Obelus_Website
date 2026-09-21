import { pillars, pillarsHeading } from '../../data/pillars';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import GradientText from '../common/GradientText';
import PillarFeature from './PillarFeature';

export default function WhyObelusSection() {
  return (
    <CustomBackground id="custom_bg_id_e6fda159-3471-4ad3-8304-752530830363">
      <div className="customTextComp baseComponent parbase section">
        <PageAnchor id="capabilities" />
        <section
          className="title-brand custom-text-comp text-center theme-light base-comp-spacer spacer-xlarge tablet-spacer-unset mobile-spacer-unset bottom-spacer-none bottom-tablet-spacer-unset bottom-mobile-spacer-unset makeAlignmentCenterOnDevices  large-bottom-spacing "
          data-type="obelus"
          id="id_c3883405-6677-4500-b5a4-752595088650"
        >
          <div
            data-template="dynamicAllComponents"
            className="customTextModelClass container-fluid"
          >
            <div className="row justify-content-center">
              <div className="col-12 col-xl-12">
                <h2 className="h3 title customtexttitle thank-you-title text-500   text-dark">
                  <GradientText parts={pillarsHeading.titleParts} />
                </h2>
              </div>
              <div className="col-12 col-xl-8">
                <p className="body-sans-1 text-dark">{pillarsHeading.body}</p>
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
