import React from 'react';
import VideoPlayer from './VideoPlayer';
import { assetUrl } from '../utils';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';

type ComponentProps = {
  value: CloudinaryAsset | undefined;
};

const AssetPreview = ({ value }: ComponentProps) => {
  if (!value) {
    return null;
  }

  const url = assetUrl(value);

  switch (value.resource_type) {
    case 'video':
      return <VideoPlayer src={url} kind="player" />;
    default:
      return (
        <img
          alt="preview"
          src={url}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
  }
};

export default AssetPreview;
