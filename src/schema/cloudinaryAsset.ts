import CloudinaryInput from '../components/CloudinaryInput';
import AssetDiff from '../components/AssetDiff';

import { CloudinaryAssetDerived } from './cloudinaryAssetDerived';

export type CloudinaryAsset = {
  _type: number;
  _version: number;
  public_id: string;
  resource_type: string;
  type: string;
  format: string;
  version: number;
  url: string;
  secure_url: string;
  derived?: CloudinaryAssetDerived[];
};

export default {
  type: 'object',
  name: 'cloudinary.asset',
  fields: [
    {
      type: 'string',
      name: 'public_id',
    },
    {
      type: 'string',
      name: 'resource_type',
      // "image", "?"
    },
    {
      type: 'string',
      name: 'type',
      // "upload", "?"
    },
    {
      type: 'string',
      name: 'format',
      // "jpg"
    },
    {
      type: 'number',
      name: 'version',
    },
    {
      type: 'url',
      name: 'url',
    },
    {
      type: 'url',
      name: 'secure_url',
    },
    {
      type: 'number',
      name: 'width',
    },
    {
      type: 'number',
      name: 'height',
    },
    {
      type: 'number',
      name: 'bytes',
    },
    {
      type: 'number',
      name: 'duration',
      // can be null
    },
    {
      type: 'array',
      name: 'tags',
      of: [{ type: 'string' }],
    },
    {
      type: 'datetime',
      name: 'created_at',
    },
    {
      type: 'array',
      name: 'derived',
      of: [{ type: 'cloudinary.asset.derived' }],
    },
    {
      type: 'string',
      name: 'access_mode',
    },
    // context array of unknown content
    // metadata array of unknown content
  ],
  inputComponent: CloudinaryInput,
  diffComponent: AssetDiff,
};

/*
{
}
*/
