import React, {useCallback, useState} from 'react'
import WidgetInput from './WidgetInput'
import {nanoid} from 'nanoid'
import {ObjectInputProps, PatchEvent, set} from 'sanity'
import {CloudinaryAsset} from '../types'
import {useSecrets} from '@sanity/studio-secrets'
import {InsertHandlerParams} from '../types'
import {openMediaSelector} from '../utils'
import SecretsConfigView, {namespace, Secrets} from './SecretsConfigView'

const CloudinaryInput = (props: ObjectInputProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const {secrets} = useSecrets<Secrets>(namespace)
  const {onChange, schemaType: type} = props
  const value = (props.value as CloudinaryAsset) || undefined

  const handleSelect = useCallback(
    (payload: InsertHandlerParams) => {
      const [asset] = payload.assets

      if (!asset) {
        return
      }

      //The cloudinary metadata (context) needs to be transformed to a valid object key
      //because the key can't contain special characters in the Studio
      if (asset.context) {
        const customKey = Object.keys(asset.context.custom)[0]
        const customValue = asset.context.custom[customKey]
        const customRegex = customKey.replace(/[^a-zA-Z0-9_]|-/g, '_')

        const {[customKey]: _, ...rest} = asset.context.custom
        // Add the new key-value pair
        const updatedCustom = {
          ...rest,
          [customRegex]: customValue,
        }

        // Update the asset with the new custom value
        const updatedAsset = {
          ...asset,
          context: {
            ...asset.context,
            custom: updatedCustom,
          },
        }

        onChange(
          PatchEvent.from([
            set(
              Object.assign(
                {
                  _type: type.name,
                  _version: 1,
                  ...(value?._key ? {_key: value._key} : {_key: nanoid()}),
                },
                updatedAsset
              )
            ),
          ])
        )
      } else {
        onChange(
          PatchEvent.from([
            set(
              Object.assign(
                {
                  _type: type.name,
                  _version: 1,
                  ...(value?._key ? {_key: value._key} : {_key: nanoid()}),
                },
                asset
              )
            ),
          ])
        )
      }
    },
    [onChange, type, value?._key]
  )

  const action = secrets
    ? () =>
        openMediaSelector(
          secrets.cloudName,
          secrets.apiKey,
          false, // single selection
          handleSelect,
          value
        )
    : () => setShowSettings(true)

  return (
    <>
      {showSettings && <SecretsConfigView onClose={() => setShowSettings(false)} />}
      <WidgetInput onSetup={() => setShowSettings(true)} openMediaSelector={action} {...props} />
    </>
  )
}

export default CloudinaryInput
