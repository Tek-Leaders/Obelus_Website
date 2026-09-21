import { resourceCards, resourcesHeading } from '../../data/resources';
import CustomBackground, { PageAnchor } from '../common/CustomBackground';
import Carousel from '../common/Carousel';
import GradientText from '../common/GradientText';
import ResourceCard from './ResourceCard';

export default function ResourcesSection() {
  return (
    <CustomBackground id="custom_bg_id_296d1bff-f7dd-47f3-8e5f-743809926538">
      <div className="customTextComp baseComponent parbase section">
        <PageAnchor id="resources" />
        <section
          className="title-brand custom-text-comp text-left theme-light base-comp-spacer spacer-xlarge tablet-spacer-large mobile-spacer-medium bottom-spacer-none bottom-tablet-spacer-unset bottom-mobile-spacer-unset large-bottom-spacing "
          data-type="obelus"
          id="id_9e65acb3-926e-4e32-a027-698881842442"
        >
          <div
            data-template="dynamicAllComponents"
            className="customTextModelClass container-fluid"
          >
            <div className="row">
              <div className="col-12 col-xl-10">
                <h2
                  className="h4 title customtexttitle thank-you-title text-500   text-dark"
                  id="featured_resources_heading"
                >
                  <GradientText parts={resourcesHeading.titleParts} />
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="aiTitleTabCardCarousel baseComponent parbase section">
        <section
          className="ai-tab-card-carousel d-flex flex-wrap    theme-dark base-comp-spacer spacer-none tablet-spacer-medium mobile-spacer-medium bottom-spacer-medium bottom-tablet-spacer-unset bottom-mobile-spacer-unset"
          data-blog-theme="light"
          data-type="obelus"
          id="id_fab30a2e-f597-45ea-a99a-742238071127"
          data-theme="dark"
          aria-labelledby="featured_resources_heading"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12  col-md-12  card-container pr-0">
                <Carousel
                  label="Featured resources"
                  trackPrefix="obelus:resources:"
                  slideClassName={(i) =>
                    resourceCards[i].overlay ? ' overlay  card-theme-dark' : ' card-theme-dark'
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
