import {defineType} from 'sanity'
import {CloudinaryReferenceInput} from '../components/CloudinaryReferenceInput'

export const cloudinaryAssetReference = defineType({
  name: 'cloudinaryAssetReference',
  title: 'Cloudinary Asset Reference',
  type: 'object',
  fields: [
    {
      name: 'asset',
      type: 'reference',
      to: [{type: 'cloudinaryAssetDocument'}],
      weak: true,
    },
  ],
  components: {
    input: CloudinaryReferenceInput,
  },
})
