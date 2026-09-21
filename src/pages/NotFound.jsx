import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="customBackgroundComp baseComponent parbase section">
      <section
        className="obelus-custom-background custom "
        style={{ backgroundColor: '#141414' }}
        data-custom-type="obelus"
      >
        <div className="obelus-custom-background-content" style={{ zIndex: 1 }}>
          <section className="custom-text-comp text-center theme-light base-comp-spacer spacer-xlarge bottom-spacer-large">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-8">
                  <h1 className="h3 title text-500 text-dark">
                    Page <span className="orange-gradient">not found</span>
                  </h1>
                  <p className="body-sans-1 text-white mt-4">
                    The page you were looking for is not available.
                  </p>
                  <ul className="list-unstyled mt-4">
                    <li>
                      <Link to="/" className="btn btn-primary dark">
                        Back to Home
                        <i />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
