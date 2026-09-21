import { challengeCards, challengesHeading } from '../../data/challenges';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import GradientText from '../common/GradientText';
import LazyImage from '../common/LazyImage';

export default function ChallengesSection() {
  return (
    <CustomBackground>
      <div className="teaser-block">
        <PageAnchor id="challenges" />
        <section
          className="teaser-section theme-dark section-space pad-top-lg pad-bottom-0"
          data-type="obelus"
          aria-labelledby="challenges_heading"
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-9 teaser-header">
                <p className="eyebrow text-dark">{challengesHeading.eyebrow}</p>
                <h2 className="h3 text-center text-dark" id="challenges_heading">
                  <GradientText parts={challengesHeading.titleParts} />
                </h2>
              </div>
            </div>

            <div className="row teaser-cards glass-cards theme-dark">
              {challengeCards.map((card) => (
                <div className="col-12 col-md-4 mb-4 mb-xl-5" key={card.title}>
                  <div className="teaser-card align-items-start flex-column">
                    <div className="logo d-flex mt-0">
                      <figure className="ratio-1x1">
                        <LazyImage src={card.icon} alt="" />
                      </figure>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h3 className="h6 teaser-card-title title mb-0 text-500 text-dark">
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
