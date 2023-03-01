/* eslint-disable */
import CloudinaryInput from '../components/CloudinaryInput'
import AssetDiff from '../components/AssetDiff'
import AssetPreview from '../components/AssetPreview'
import {defineType} from 'sanity'

export const cloudinaryAssetSchema = defineType({
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
      of: [{type: 'string'}],
    },
    {
      type: 'datetime',
      name: 'created_at',
    },
    {
      type: 'array',
      name: 'derived',
      of: [{type: 'cloudinary.assetDerived'}],
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
  ...({
    components: {
      input: CloudinaryInput,
      diff: AssetDiff,
      preview: AssetPreview,
    },
  } as {}), //TODO revert this change when rc.1 is released
  preview: {
    select: {
      url: 'url',
      resource_type: 'resource_type',
      derived: 'derived.0.url',
    },
    prepare({url, derived, resource_type}) {
      return {
        title: url,
        value: {
          title: url,
          resource_type,
          url: derived || url,
        },
      }
    },
  },
})
