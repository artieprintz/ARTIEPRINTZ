import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export default function SEO({
  title,
  description,
  keywords = 'custom printing, polaroids, wall posters, apparel, customized gifts',
  canonical,
  image = 'https://artieprintz-bay.vercel.app/NEW%20LOGO.png',
  type = 'website',
  schema,
}: SEOProps) {
  const location = useLocation();
  const domain = 'https://artieprintz-bay.vercel.app';
  const canonicalUrl = canonical || `${domain}${location.pathname}${location.search}`;

  return (
    <>
      {/* Document Head Hoisting (React 19 Native) */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ARTiE PRINTz" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Structured Schema Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
}
