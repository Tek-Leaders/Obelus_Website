import GradientText from '../common/GradientText';
import PlaceholderImage from '../common/PlaceholderImage';

// The original markup reused one id across all three blocks, which is invalid
// HTML; the index keeps them unique without changing any styling hook.
const PILLAR_ID = 'id_0d91c9c0-542d-40f8-a601-752188966065';

function Media({ pillar, columnClass }) {
  return (
    <div className={columnClass}>
      <div>
        <a
          href={pillar.image}
          data-page-track="true"
          data-page-track-value={pillar.track}
          className="d-flex"
          target="_blank"
          rel="noopener noreferrer"
        >
          <figure className=" ar-16-9  show-mag  top-right   contain">
            <PlaceholderImage
              src={pillar.image}
              alt={pillar.imageAlt}
              label={pillar.imageLabel}
            />
            <i className="icon magnifying-glass" aria-hidden="true" />
          </figure>
        </a>
      </div>
    </div>
  );
}

function Copy({ pillar, columnClass }) {
  return (
    <div className={columnClass} data-type="obelus">
      <span className="eyebrow  text-white ">
        <i style={{ backgroundImage: `url('${pillar.icon}')` }} aria-hidden="true" />
        {pillar.eyebrow}
      </span>
      <h2 className="h5 title  text-white  ">
        <GradientText parts={pillar.titleParts} />
      </h2>
      <p className="body-sans-1     text-white ">{pillar.body}</p>
      {pillar.bullets && (
        <ul className="pillar-bullets list-unstyled">
          {pillar.bullets.map((bullet) => (
            <li key={bullet} className="body-sans-2 text-white">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PillarFeature({ pillar, index }) {
  const leftImage = pillar.layout === 'leftImage';

  return (
    <div className="pillarTextFeatureComp baseComponent parbase section">
      <section
        className={`pillar-text-feature layout-${pillar.layout} side base-comp-spacer spacer-large tablet-spacer-unset mobile-spacer-unset ${pillar.bottomSpacer} bottom-tablet-spacer-unset bottom-mobile-spacer-unset`}
        data-type="obelus"
        id={`${PILLAR_ID}-${index}`}
      >
        <div className="container-fluid">
          <div className="row">
            {leftImage ? (
              <>
                <Media
                  pillar={pillar}
                  columnClass="media-container col-12  col-md-6 col-xl-6   slideLeft "
                />
                <Copy
                  pillar={pillar}
                  columnClass=" slideRight  right-text text-content col-12  offset-md-1 col-md-5  col-xl-4 "
                />
              </>
            ) : (
              <>
                <Copy
                  pillar={pillar}
                  columnClass=" slideLeft  left-text text-content col-12  offset-xl-1 col-md-5  col-xl-4 order-1 order-md-0 "
                />
                <Media
                  pillar={pillar}
                  columnClass=" slideRight  media-container col-12  col-md-6 offset-md-1 col-xl-6 "
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
