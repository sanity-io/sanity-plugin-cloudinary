import React, {useCallback, useState} from 'react'
import {Button, Stack, Flex, Grid} from '@sanity/ui'
import {useClient} from 'sanity'
import {PatchEvent, set, unset} from 'sanity'
import {nanoid} from 'nanoid'
import {useSecrets} from '@sanity/studio-secrets'
import {PlugIcon} from '@sanity/icons'
import {ReferencePreview} from './ReferencePreview'
import {openMediaSelector} from '../utils'
import SecretsConfigView, {namespace, Secrets} from './SecretsConfigView'
import {InsertHandlerParams} from '../types'

export function CloudinaryReferenceInput(props: any) {
  const {onChange, value} = props
  const [showSettings, setShowSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {secrets} = useSecrets<Secrets>(namespace)
  const client = useClient({apiVersion: '2023-01-01'})

  const cloudName = secrets?.cloudName
  const apiKey = secrets?.apiKey
  const hasConfig = apiKey && cloudName

  // Handle selecting an asset from Cloudinary
  const handleSelect = useCallback(
    async (payload: InsertHandlerParams) => {
      const [asset] = payload.assets

      if (!asset) {
        return
      }

      // Create a unique ID for this asset based on its Cloudinary public_id
      const assetId = `cloudinary-${asset.public_id.replace(/\//g, '-')}`

      try {
        // Check if this asset already exists in Sanity
        const existingAsset = await client.fetch(
          `*[_type == "cloudinaryAssetDocument" && asset.public_id == $publicId][0]`,
          {publicId: asset.public_id}
        )

        if (existingAsset) {
          // Update the existing asset
          await client.patch(existingAsset._id).set({asset: asset}).commit()

          // Set reference to the existing asset
          onChange(
            PatchEvent.from(
              set({
                _type: 'reference',
                _ref: existingAsset._id,
                _weak: true,
              })
            )
          )
        } else {
          // Create a new asset document
          const newAsset = await client.create({
            _id: assetId,
            _type: 'cloudinaryAssetDocument',
            asset: {
              ...asset,
              _type: 'cloudinaryAssetReference',
              _key: nanoid(),
            },
          })

          // Set reference to the new asset
          onChange(
            PatchEvent.from(
              set({
                _type: 'reference',
                _ref: newAsset._id,
                _weak: true,
              })
            )
          )
        }
      } catch (err) {
        console.error('Error creating/updating Cloudinary asset:', err)
      }
    },
    [client, onChange]
  )

  // Action to open the media selector
  const handleOpenSelector = useCallback(() => {
    if (!hasConfig) {
      setShowSettings(true)
      return
    }

    setIsLoading(true)

    // Open the media selector
    try {
      openMediaSelector(
        cloudName!,
        apiKey!,
        false, // single selection
        (payload) => {
          handleSelect(payload)
          setIsLoading(false)
        },
        undefined,
        () => {
          setIsLoading(false)
        }
      )

      // Set a timeout to reset loading state if modal takes too long
      setTimeout(() => {
        setIsLoading(false)
      }, 30000) // 30 seconds timeout as fallback
    } catch (error) {
      console.error('Error opening Cloudinary media selector:', error)
      setIsLoading(false)
    }
  }, [cloudName, apiKey, hasConfig, handleSelect])

  return (
    <Stack space={3}>
      {showSettings && <SecretsConfigView onClose={() => setShowSettings(false)} />}

      <Flex justify="flex-end">
        <Button
          color="primary"
          icon={PlugIcon}
          mode="bleed"
          title="Configure"
          onClick={() => setShowSettings(true)}
          tabIndex={1}
          text={hasConfig ? undefined : 'Configure Cloudinary plugin'}
        />
      </Flex>

      <Flex style={{textAlign: 'center', width: '100%'}} marginBottom={2}>
        <ReferencePreview value={value} />
      </Flex>

      <Stack space={2}>
        <Grid gap={1} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
          <Button
            text={
              hasConfig
                ? isLoading
                  ? 'Opening Media Library...'
                  : 'Select Asset'
                : 'Configure Cloudinary to Select Assets'
            }
            onClick={handleOpenSelector}
            tone="primary"
            mode="ghost"
            disabled={(!hasConfig && !showSettings) || isLoading}
            loading={isLoading}
          />

          {value && (
            <Button
              text="Remove"
              tone="critical"
              mode="ghost"
              onClick={() => onChange(PatchEvent.from(unset()))}
              disabled={isLoading}
            />
          )}
        </Grid>
      </Stack>
    </Stack>
  )
}
