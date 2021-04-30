import React from 'react';
import VideoPlayer from './VideoPlayer';
import { assetUrl } from '../utils';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';

type ComponentProps = {
  layout?: 'default' | 'block';
  value: CloudinaryAsset | undefined;
};

const AssetPreview = ({ value, layout }: ComponentProps) => {
  const url = value && assetUrl(value);
  if (!value || !url) {
    return null;
  }

  switch (value.resource_type) {
    case 'video':
      return <VideoPlayer src={url} kind="player" />;
    default:
      return (
        <div style={{ maxWidth: layout === 'default' ? '80px' : '100%' }}>
          <div style={{ position: 'relative', paddingBottom: '56.2%' }}>
            <img
              style={{
                position: 'absolute',
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
              alt="preview"
              src={url}
            />
          </div>
        </div>
      );
  }
};

export default AssetPreview;
