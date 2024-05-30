import {CloudinaryAssetDerived} from './schema/cloudinaryAssetDerived'

export type CloudinaryDerivative = {
  url: string
  secure_url: string
  raw_transformation: string
}

export type CloudinaryAssetResponse = {
  public_id: string
  resource_type: string
  type: string
  url: string
  tags: string[]
  secure_url: string
  format: string
  width: number
  height: number
  bytes: number
  context?: {
    custom: Record<string, string>
  }
  derived?: CloudinaryDerivative[]
}

export type InsertHandlerParams = {
  assets: CloudinaryAssetResponse[]
}

export interface CloudinaryMediaLibrary {
  show: (config?: {asset: any; folder: any}) => void
  hide: () => void
}

export type CloudinaryAsset = {
  _type: string
  _key?: string
  _version: number
  public_id: string
  resource_type: string
  type: string
  format: string
  version: number
  url: string
  secure_url: string
  derived?: CloudinaryAssetDerived[]
}

export type AssetDocument = {
  _id: string
  label?: string
  title?: string
  description?: string
  source?: {
    id: string
    name: string
    url?: string
  }
  creditLine?: string
  originalFilename?: string
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    cloudinary: {
      openMediaLibrary: (config: any, callbacks: any) => void
      createMediaLibrary: (config: any, callbacks?: any) => CloudinaryMediaLibrary
    }
  }
}
