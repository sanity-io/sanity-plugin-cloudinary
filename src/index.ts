import {cloudinaryAssetSchema} from './schema/cloudinaryAsset'
import {cloudinaryAssetDerivedSchema} from './schema/cloudinaryAssetDerived'
import {definePlugin, AssetSource} from 'sanity'
import {CloudinaryIcon} from './components/asset-source/Icon'
import {CloudinaryAssetSource} from './components/asset-source/CloudinaryAssetSource'

export {cloudinaryAssetSchema, cloudinaryAssetDerivedSchema}

export const cloudinarySchemaPlugin = definePlugin({
  name: 'cloudinary-schema',
  schema: {
    types: [cloudinaryAssetSchema, cloudinaryAssetDerivedSchema],
  },
})

export const cloudinaryImageSource: AssetSource = {
  name: 'cloudinary-image',
  title: 'Cloudinary',
  icon: CloudinaryIcon,
  component: CloudinaryAssetSource,
}

export const cloudinaryAssetSourcePlugin = definePlugin({
  name: 'cloudinart-asset-source',
  form: {
    image: {
      assetSources: [cloudinaryImageSource],
    },
  },
})
