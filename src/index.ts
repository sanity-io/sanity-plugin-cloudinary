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
import {cloudinaryAssetDocument} from './schema/cloudinaryAssetDocument'
import {cloudinaryAssetReference} from './schema/cloudinaryAssetReference'

export {type CloudinaryAssetContext} from './schema/cloudinaryAssetContext'
export {type CloudinaryAssetDerived} from './schema/cloudinaryAssetDerived'
export {type CloudinaryAssetContextCustom} from './schema/cloudinaryAssetContextCustom'

export type {AssetDocument, CloudinaryAsset} from './types'

export {
  cloudinaryAssetSchema,
  cloudinaryAssetDerivedSchema,
  cloudinaryAssetContext,
  cloudinaryAssetContextCustom,
  cloudinaryAssetDocument,
  cloudinaryAssetReference,
}

export const cloudinaryReferencePlugin = definePlugin({
  name: 'cloudinary-reference',
  schema: {
    types: [
      cloudinaryAssetDocument,
      cloudinaryAssetReference,
      cloudinaryAssetSchema,
      cloudinaryAssetDerivedSchema,
      cloudinaryAssetContext,
      cloudinaryAssetContextCustom,
    ],
  },
})

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
  name: 'cloudinary-asset-source',
  form: {
    image: {
      assetSources: [cloudinaryImageSource],
    },
  },
})
