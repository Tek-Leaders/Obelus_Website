import CustomBackground, { PageAnchor } from '../common/CustomBackground';

const TOUR_VIDEO = '/assets/video/Obelus-Product-Tour.mp4';

export default function ProductTourSection() {
  return (
    <CustomBackground variant="custom">
      <div>
        <PageAnchor id="tour" />
        <section
          className="product-tour-cards theme-dark section-space spacer-large bottom-spacer-large"
          data-type="obelus"
          aria-labelledby="product_tour_heading"
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 text-center mb-5">
                {/*
                  The original nested an <h3 class="h2"> around an
                  <h3 class="h3">, which is invalid: the HTML parser closes the
                  outer heading, leaving an empty h3.h2 whose 0.5rem
                  margin-bottom pushed the real heading down by 8px. `mt-2` is
                  the site's own 0.5rem utility, so this reproduces that
                  spacing exactly with a single, valid heading.
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
