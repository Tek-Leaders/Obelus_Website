import { resourceCards, resourcesHeading } from '../../data/resources';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import Carousel from '../common/Carousel';
import GradientText from '../common/GradientText';
import ResourceCard from './ResourceCard';

export default function ResourcesSection() {
  return (
    <CustomBackground>
      <div>
        <PageAnchor id="resources" />
        <section
          className="heading-branded section-heading text-left theme-light section-space pad-top-xl tablet-pad-top-lg mobile-pad-top-md pad-bottom-0"
          data-type="obelus"
        >
          <div
            className="container-fluid"
          >
            <div className="row">
              <div className="col-12 col-xl-10">
                <h2
                  className="h4 title text-500 text-dark"
                  id="featured_resources_heading"
                >
                  <GradientText parts={resourcesHeading.titleParts} />
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section
          className="resource-carousel d-flex flex-wrap theme-dark section-space pad-top-0 tablet-pad-top-md mobile-pad-top-md pad-bottom-md"
          data-type="obelus"
          data-theme="dark"
          aria-labelledby="featured_resources_heading"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-12 carousel-column pr-0">
                <Carousel
                  label="Featured resources"
                  trackPrefix="obelus:resources:"
                  slideClassName={(i) =>
                    resourceCards[i].overlay ? ' overlay card-theme-dark' : ' card-theme-dark'
                  }
                >
                  {resourceCards.map((card) => (
                    <ResourceCard card={card} key={card.track} />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CustomBackground>
  );
}
