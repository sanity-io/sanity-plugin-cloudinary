import {cloudinaryAssetSchema} from './schema/cloudinaryAsset'
import {cloudinaryAssetDerivedSchema} from './schema/cloudinaryAssetDerived'
import {createPlugin, AssetSource} from 'sanity'
import {CloudinaryIcon} from './components/asset-source/Icon'
import {CloudinaryAssetSource} from './components/asset-source/CloudinaryAssetSource'

export {cloudinaryAssetSchema, cloudinaryAssetDerivedSchema}

export const cloudinarySchemaPlugin = createPlugin({
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

export const cloudinaryAssetSourcePlugin = createPlugin({
  name: 'cloudinart-asset-source',
  form: {
    image: {
      assetSources: [cloudinaryImageSource],
    },
  },
})
