/* eslint-disable camelcase */
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Box, Button, Dialog, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {CloudinaryMediaLibrary, InsertHandlerParams} from '../../typings'
import {createMediaLibrary, decodeSourceId, encodeFilename, encodeSourceId} from '../../utils'
import styled from 'styled-components'
import {useSecrets} from '@sanity/secrets'
import SecretsConfigView, {namespace, Secrets} from '../SecretsConfigView'
import {AssetSourceComponentProps, ImageAsset} from 'sanity'
import {PlugIcon} from '@sanity/icons'

export const Widget = styled.div`
  height: 70vh;
`

export function CloudinaryAssetSource(props: AssetSourceComponentProps) {
  const {selectedAssets, selectionType, onSelect, onClose} = props

  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(
    'Loading Cloudinary Media Libary'
  )
  const [library, setLibrary] = useState<CloudinaryMediaLibrary | undefined>()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const {secrets} = useSecrets<Secrets>(namespace)
  const cloudName = secrets?.cloudName
  const apiKey = secrets?.apiKey
  const [widgetId] = useState(() => `cloundinaryWidget-${Date.now()}`)
  const [showSettings, setShowSettings] = useState(false)

  const setupMediaLibrary = useCallback(
    (lib: CloudinaryMediaLibrary) => {
      setLibrary(lib)
      const firstSelectedAsset = selectedAssets ? selectedAssets[0] : null

      // eslint-disable-next-line no-undef
      const iframe: ChildNode | null | undefined =
        contentRef.current && contentRef.current.firstChild
      if (iframe && iframe instanceof HTMLIFrameElement) {
        setLoadingMessage(undefined)
        let asset
        if (
          selectionType === 'single' &&
          firstSelectedAsset &&
          firstSelectedAsset.source &&
          firstSelectedAsset.source.id
        ) {
          asset = decodeSourceId(firstSelectedAsset.source.id)
        }
        const folder = asset
          ? {
              path: asset.public_id.split('/').slice(0, -1).join('/'),
              resource_type: 'image',
            }
          : {path: '', resource_type: 'image'}
        if (lib && contentRef.current) {
          lib.show({folder, asset})
          contentRef.current.style.visibility = 'visible'
        }
      }
    },
    [setLibrary, selectedAssets, selectionType]
  )

  const handleSelect = useCallback(
    ({assets}: InsertHandlerParams) => {
      if (!library) {
        return
      }
      const imageAssets = assets.filter((asset) => asset.resource_type === 'image')
      if (imageAssets.length === 0) {
        throw new Error('The selection did not contain any images.')
      }
      library.hide()
      onSelect(
        imageAssets.map((asset) => {
          const url =
            asset.derived && asset.derived[0] ? asset.derived[0].secure_url : asset.secure_url
          return {
            kind: 'url',
            value: url,
            assetDocumentProps: {
              _type: 'sanity.imageAsset',
              originalFilename: encodeFilename(asset),
              source: {
                id: encodeSourceId(asset),
                name: `cloudinary:${cloudName}`,
              },
            } as ImageAsset,
          }
        })
      )
    },
    [onSelect, library, cloudName]
  )

  const handleClose = useCallback(() => {
    if (library) {
      library.hide()
    }
    onClose()
  }, [onClose, library])

  useEffect(() => {
    if (!cloudName || !apiKey) {
      return
    }

    createMediaLibrary({
      cloudName,
      apiKey,
      inlineContainer: `#${widgetId}`,
      libraryCreated: setupMediaLibrary,
      insertHandler: handleSelect,
    })

    // eslint-disable-next-line consistent-return
    return () => {
      setLibrary(undefined)
    }
    //we only want this to fire when secrets change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudName, apiKey])

  return (
    <Dialog
      id="cloudinary-asset-source"
      header="Select image from Cloudinary"
      onClose={handleClose}
      open
      width={4}
    >
      <Box padding={4}>
        {showSettings && <SecretsConfigView onClose={() => setShowSettings(false)} />}
        <Flex flex={1} justify="flex-end">
          <Button
            color="primary"
            icon={PlugIcon}
            mode="bleed"
            title="Configure"
            onClick={() => setShowSettings(true)}
            tabIndex={1}
          />
        </Flex>

        {loadingMessage && (
          <Stack space={3}>
            <Flex align="center" justify="center">
              <Spinner muted />
            </Flex>
            <Text size={1} muted align="center">
              {loadingMessage}
            </Text>
          </Stack>
        )}

        <Widget style={{visibility: 'hidden'}} ref={contentRef} id={widgetId} />
      </Box>
    </Dialog>
  )
}
