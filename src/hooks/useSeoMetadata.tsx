import { Helmet } from 'react-helmet-async';

interface SeoMetadataProps {
  title?: string;
  description?: string;
}

export const useSeoMetadata = ({
  title = 'INTERCERT LATAM',
  description = '',
}: SeoMetadataProps = {}) => (
  <Helmet>
    <title>{title}</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default useSeoMetadata;
