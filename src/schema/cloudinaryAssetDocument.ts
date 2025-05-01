import {defineType} from 'sanity'
import {cloudinaryAssetSchema} from './cloudinaryAsset'

export const cloudinaryAssetDocument = defineType({
  name: 'cloudinaryAssetDocument',
  title: 'Cloudinary Asset',
  type: 'document',
  fields: [
    {
      name: 'asset',
      type: cloudinaryAssetSchema.name,
      title: 'Cloudinary Asset',
    },
  ],
  preview: {
    select: {
      caption: 'asset.metadata.caption',
      alt: 'asset.metadata.alt_text',
      displayName: 'asset.display_name',
      resourceType: 'asset.resource_type',
      format: 'asset.format',
      media: 'asset',
    },
    prepare({caption, alt, displayName, resourceType, format, media}) {
      // Use caption or alt text as the title, fall back to display name
      const title = caption || alt || displayName || 'Untitled Asset'

      // Create a descriptive subtitle
      const type = resourceType || 'image'
      const formatInfo = format ? `(${format})` : ''
      const subtitle = `${type} ${formatInfo}`

      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
