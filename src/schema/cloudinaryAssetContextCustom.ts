import {defineType} from 'sanity'

export type CloudinaryAssetContextCustom = {
  alt: string
  caption: string
}

export const cloudinaryAssetContextCustom = defineType({
  type: 'object',
  name: 'cloudinary.assetContextCustom',
  fields: [
    {
      type: 'string',
      name: 'alt',
    },
    {
      type: 'string',
      name: 'caption',
    },
  ],
})
