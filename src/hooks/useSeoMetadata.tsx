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
    {description && <meta name="description" content={description} />}
  </Helmet>
);

export default useSeoMetadata;
