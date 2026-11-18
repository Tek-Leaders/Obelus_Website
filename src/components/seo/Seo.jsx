import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://obelus.in';
const DEFAULT_IMAGE = `${SITE_URL}/assets/img/obelus/obelus-mark-large.webp`;

/**
 * Per-route head tags. Every page passes its own title/description/path so
 * the SPA stops shipping one generic <title> for every route - the main
 * reason search and social crawlers couldn't tell /products from /contact.
 *
 * `structuredData` takes a JSON-LD object (or array of them) specific to the
 * page, on top of the sitewide Organization schema already in index.html.
 */
export default function Seo({ title, description, path = '/', image = DEFAULT_IMAGE, structuredData }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | OBELUS`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
