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
        <img
          alt="preview"
          src={url}
          style={{
            maxWidth: layout === 'default' ? '80px' : '100%',
            height: 'auto',
          }}
        />
      );
  }
};

export default AssetPreview;
