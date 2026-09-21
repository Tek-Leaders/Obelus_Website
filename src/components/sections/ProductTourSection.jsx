import CustomBackground, { PageAnchor } from '../common/CustomBackground';

const TOUR_VIDEO = '/assets/video/Obelus-Product-Tour.mp4';

export default function ProductTourSection() {
  return (
    <CustomBackground variant="plain">
      <div>
        <PageAnchor id="tour" />
        <section
          className="product-tour-cards theme-dark section-space pad-top-lg pad-bottom-lg"
          data-type="obelus"
          aria-labelledby="product_tour_heading"
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 text-center mb-5">
                {/*
                  `mt-2` gives the heading its 0.5rem offset from the top of
                  the section.
                */}
                <h2 className="h3 title mt-2" id="product_tour_heading">
                  Product Tour
                </h2>
              </div>
            </div>
            <div className="row product-tour-row">
              <div className="col-12 mb-3">
                <div className="product-tour-card">
                  <div
                    className="tour-embed-frame tour-media"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className="tour-embed"
                      style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        width: '100%',
                        height: 0,
                        transform: 'scale(1)',
                      }}
                    >
                      <video
                        className="tour-video"
                        src={TOUR_VIDEO}
                        controls
                        preload="metadata"
                        playsInline
                        title="Product tour: OBELUS security operations platform"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CustomBackground>
  );
}
