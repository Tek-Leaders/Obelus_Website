import { challengeCards, challengesHeading } from '../../data/challenges';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import GradientText from '../common/GradientText';
import LazyImage from '../common/LazyImage';

export default function ChallengesSection() {
  return (
    <CustomBackground id="custom_bg_id_a1073a32-6525-487c-bc77-752689713164">
      <div className="symcoTeaserBlock baseComponent parbase section">
        <PageAnchor id="challenges" />
        <section
          className="symco-teaser-cards theme-dark base-comp-spacer spacer-large tablet-spacer-unset mobile-spacer-unset bottom-spacer-none bottom-tablet-spacer-unset bottom-mobile-spacer-unset"
          id="id_65da7d62-bbf2-46ac-810b-752886121988"
          data-type="obelus"
          aria-labelledby="challenges_heading"
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-9 symco-teaser-header">
                <p className="eyebrow text-dark">{challengesHeading.eyebrow}</p>
                <h2 className="h3 text-center text-dark" id="challenges_heading">
                  <GradientText parts={challengesHeading.titleParts} />
                </h2>
              </div>
            </div>

            <div className="row symco-cards ai-variation theme-dark">
              {challengeCards.map((card) => (
                <div className="col-12 col-md-4 mb-4 mb-xl-5" key={card.title}>
                  <div className="symco-card align-items-start flex-column">
                    <div className="logo d-flex mt-0">
                      <figure className="ar-1-1">
                        <LazyImage src={card.icon} alt="" />
                      </figure>
                    </div>
                    <div className="text-container d-flex flex-column">
                      <h3 className="h6 symco-card-title title mb-0 text-500  text-dark">
                        {card.title}
                      </h3>
                      <div className="actions d-flex flex-column flex-md-row flex-md-wrap" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CustomBackground>
  );
}
