/* eslint-disable camelcase,@typescript-eslint/explicit-module-boundary-types */
import {
  CloudinaryAsset,
  CloudinaryAssetResponse,
  CloudinaryMediaLibrary,
  InsertHandlerParams,
} from './types'

const widgetSrc = 'https://media-library.cloudinary.com/global/all.js'

export function assetUrl(asset: Partial<Pick<CloudinaryAsset, 'url' | 'secure_url' | 'derived'>>) {
  if (asset.derived && asset.derived.length > 0) {
    const [derived] = asset.derived
    if (derived.secure_url) {
      return derived.secure_url
    }
    return derived.url
  }
  if (asset.secure_url) {
    return asset.secure_url
  }
  return asset.url
}

export const openMediaSelector = (
  cloudName: string,
  apiKey: string,
  multiple: boolean,
  insertHandler: (params: InsertHandlerParams) => void,
  selectedAsset?: CloudinaryAsset
) => {
  loadJS(widgetSrc, () => {
    const options: Record<string, any> = {
      cloud_name: cloudName,
      api_key: apiKey,
      insert_caption: 'Select',
      multiple,
    }

    if (selectedAsset) {
      options.asset = {
        public_id: selectedAsset.public_id,
        type: selectedAsset.type,
        resource_type: selectedAsset.resource_type,
      }
    }

    window.cloudinary.openMediaLibrary(options, {insertHandler})
  })
}

export const createMediaLibrary = ({
  cloudName,
  apiKey,
  inlineContainer,
  libraryCreated,
  insertHandler,
}: {
  cloudName: string
  apiKey: string
  inlineContainer: string
  libraryCreated: (library: CloudinaryMediaLibrary) => void
  insertHandler: (params: InsertHandlerParams) => void
}) => {
  loadJS(widgetSrc, () => {
    const options: Record<string, any> = {
      cloud_name: cloudName,
      api_key: apiKey,
      insert_caption: 'Select',
      inline_container: inlineContainer,
      remove_header: true,
    }

    libraryCreated(window.cloudinary.createMediaLibrary(options, {insertHandler}))
  })
}

export function loadJS(url: string, callback: () => void) {
  const existingScript = document.getElementById('damWidget')
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = url
    script.id = 'damWidget'
    document.body.appendChild(script)
    script.onload = () => {
      if (callback) {
        return callback()
      }
      return true
    }
  }
  if (existingScript && callback) {
    return callback()
  }
  return true
}

export function encodeSourceId(asset: CloudinaryAssetResponse): string {
  const {resource_type, public_id, type} = asset
  return btoa(JSON.stringify({public_id, resource_type, type})) // Sort keys alphabetically!
}

export function encodeFilename(asset: CloudinaryAssetResponse) {
  return `${asset.public_id.split('/').slice(-1)[0]}.${asset.format}`
}

export function decodeSourceId(sourceId: string): CloudinaryAssetResponse | undefined {
  let sourceIdDecoded: any
  try {
    sourceIdDecoded = JSON.parse(atob(sourceId))
  } catch (err) {
    // Do nothing
  }
  return sourceIdDecoded
}
