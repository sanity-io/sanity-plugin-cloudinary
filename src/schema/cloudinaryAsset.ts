import CloudinaryInput from '../components/CloudinaryInput';
import AssetDiff from '../components/AssetDiff';
import AssetPreview from '../components/AssetPreview';
import { CloudinaryAssetDerived } from './cloudinaryAssetDerived';

export type CloudinaryAsset = {
  _type: string;
  _key?: string;
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
      of: [{ type: 'cloudinary.assetDerived' }],
    },
    {
      type: 'string',
      name: 'access_mode',
    },
    {
      type: 'cloudinary.assetContext',
      name: 'context',
    },
    // metadata array of unknown content
  ],
  inputComponent: CloudinaryInput,
  diffComponent: AssetDiff,
  preview: {
    select: {
      url: 'url',
      resource_type: 'resource_type',
      derived: 'derived.0.url',
    },
    prepare({ url, derived, resource_type }: any) {
      return {
        resource_type,
        url: derived || url,
      };
    },
    component: AssetPreview,
  },
};
