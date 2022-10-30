import React, {useCallback, useState} from 'react'
import WidgetInput from './WidgetInput'
import {nanoid} from 'nanoid'
import {ObjectInputProps, PatchEvent, set} from 'sanity'
import {CloudinaryAsset} from '../typings'
import {useSecrets} from '@sanity/secrets'
import {InsertHandlerParams} from '../typings'
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
