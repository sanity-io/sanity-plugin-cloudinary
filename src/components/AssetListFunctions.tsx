import React, {useCallback} from 'react'
import {Box, Button, Flex} from '@sanity/ui'
import {
  ArrayInputFunctionsProps,
  ArrayOfObjectsFunctions,
  ArraySchemaType,
  insert,
  ObjectSchemaType,
  PatchEvent,
  setIfMissing,
} from 'sanity'

import {useSecrets} from '@sanity/studio-secrets'
import SecretsConfigView, {namespace} from './SecretsConfigView'
import {cloudinaryAssetSchema} from '../schema/cloudinaryAsset'
import {openMediaSelector} from '../utils'
import {InsertHandlerParams} from '../types'
import {PlugIcon} from '@sanity/icons'

interface ApiConfig {
  cloudName: string
  apiKey: string
}

export const AssetListFunctions = (
  props: ArrayInputFunctionsProps<{_key: string}, ArraySchemaType>
) => {
  const {onValueCreate, onChange} = props

  const {secrets, loading} = useSecrets<ApiConfig>(namespace)
  const [showSettings, setShowSettings] = React.useState(false)

  const show = useCallback(() => setShowSettings(true), [setShowSettings])
  const hide = useCallback(() => setShowSettings(false), [setShowSettings])

  const cloudinaryType = props.schemaType.of.find(
    (t: {name: string}) => t.name === cloudinaryAssetSchema.name
  ) as ObjectSchemaType | undefined

  if (!cloudinaryType) {
    throw new Error(`AssetListFunctions can only be used in array.of ${
      cloudinaryAssetSchema.name
    }, but it was array.of
    ${props.schemaType.of.map((t) => t.name)}`)
  }

  const handleSelect = useCallback(
    (selected: InsertHandlerParams) => {
      const items = selected.assets.map((asset) =>
        Object.assign(
          {},
          asset,
          {
            // Schema version. In case we ever change our schema.
            _version: 1,
          },
          onValueCreate(cloudinaryType as any) // onValueCreate is mistyped
        )
      )
      onChange(PatchEvent.from([setIfMissing([]), insert(items, 'after', [-1])]))
    },
    [onValueCreate, onChange, cloudinaryType]
  )

  const handleOpenSelector = useCallback(
    () =>
      secrets &&
      openMediaSelector(
        secrets.cloudName,
        secrets.apiKey,
        true, // multi-selection
        handleSelect
      ),
    [secrets, handleSelect]
  )
  return (
    <Flex gap={2} flex={1}>
      {showSettings && <SecretsConfigView onClose={hide} />}
      <Box flex={1}>
        <ArrayOfObjectsFunctions {...props} />
      </Box>
      {cloudinaryType && (
        <>
          <Box flex={1}>
            <Button
              style={{width: '100%'}}
              disabled={props.readOnly || loading}
              mode="bleed"
              text="Add multiple"
              onClick={handleOpenSelector}
            />
          </Box>
          <Box>
            <Button onClick={show} icon={PlugIcon} mode="bleed" title={'Configure'} />
          </Box>
        </>
      )}
    </Flex>
  )
}
