import {defineType} from 'sanity'

export interface CloudinaryAssetContext {
  custom: object
}

export const cloudinaryAssetContext = defineType({
  type: 'object',
  name: 'cloudinary.assetContext',
  fields: [
    {
      type: 'cloudinary.assetContextCustom',
      name: 'custom',
    },
  ],
})
