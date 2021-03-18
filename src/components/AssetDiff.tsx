import React from 'react';
import { DiffFromTo } from '@sanity/field/diff';
import { CloudinaryAsset } from '../schema/cloudinaryAsset';
import VideoPlayer from './VideoPlayer';
import { assetUrl } from '../utils';

type Props = {
  value: CloudinaryAsset | undefined;
};

const CloudinaryDiffPreview = ({ value }: Props) => {
  if (!value) {
    return null;
  }

  const url = assetUrl(value);

  if (value.resource_type === 'video') {
    return (
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <VideoPlayer src={url} kind="diff" />
      </section>
    );
  }

  return (
    <img alt="preview" src={url} style={{ maxWidth: '100%', height: 'auto' }} />
  );
};

type DiffProps = {
  diff: any;
  schemaType: any;
};

const AssetDiff = ({ diff, schemaType }: DiffProps) => {
  return (
    <DiffFromTo
      diff={diff}
      schemaType={schemaType}
      previewComponent={CloudinaryDiffPreview}
    />
  );
};

export default AssetDiff;
