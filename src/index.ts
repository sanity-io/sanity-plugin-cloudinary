import {cloudinaryAssetSchema} from './schema/cloudinaryAsset'
import {cloudinaryAssetDerivedSchema} from './schema/cloudinaryAssetDerived'
import {
  definePlugin,
  AssetSource,
  ArrayOfObjectsInputProps,
  isArrayOfObjectsSchemaType,
} from 'sanity'
import {CloudinaryIcon} from './components/asset-source/Icon'
import {CloudinaryAssetSource} from './components/asset-source/CloudinaryAssetSource'
import {cloudinaryAssetContext} from './schema/cloudinaryAssetContext'
import {cloudinaryAssetContextCustom} from './schema/cloudinaryAssetContextCustom'
import {AssetListFunctions} from './components/AssetListFunctions'

export {type CloudinaryAssetContext} from './schema/cloudinaryAssetContext'
export {type CloudinaryAssetDerived} from './schema/cloudinaryAssetDerived'
export {type CloudinaryAssetContextCustom} from './schema/cloudinaryAssetContextCustom'

export type {AssetDocument, CloudinaryAsset} from './types'

export {
  cloudinaryAssetSchema,
  cloudinaryAssetDerivedSchema,
  cloudinaryAssetContext,
  cloudinaryAssetContextCustom,
}

export const cloudinarySchemaPlugin = definePlugin({
  name: 'cloudinary-schema',
  form: {
    components: {
      input: (props) => {
        const {schemaType} = props
        if (isArrayOfObjectsSchemaType(schemaType)) {
          const arrayProps = props as ArrayOfObjectsInputProps
          const cloudinaryType = arrayProps.schemaType.of.find(
            (t: {name: string}) => t.name === cloudinaryAssetSchema.name
          )
          if (cloudinaryType) {
            return arrayProps.renderDefault({...arrayProps, arrayFunctions: AssetListFunctions})
          }
        }
        return props.renderDefault(props)
      },
    },
  },
  schema: {
    types: [
      cloudinaryAssetSchema,
      cloudinaryAssetDerivedSchema,
      cloudinaryAssetContext,
      cloudinaryAssetContextCustom,
    ],
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
