/* eslint-disable camelcase */
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Box, Button, Dialog, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {CloudinaryMediaLibrary, InsertHandlerParams} from '../../types'
import {createMediaLibrary, decodeSourceId, encodeFilename, encodeSourceId} from '../../utils'
import styled from 'styled-components'
import {useSecrets} from '@sanity/studio-secrets'
import SecretsConfigView, {namespace, Secrets} from '../SecretsConfigView'
import {AssetSourceComponentProps, ImageAsset} from 'sanity'
import {PlugIcon} from '@sanity/icons'

export const Widget = styled.div`
  height: 70vh;
`

export function CloudinaryAssetSource(props: AssetSourceComponentProps) {
  const {onClose, dialogHeaderTitle} = props

  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(
    'Loading Cloudinary Media Libary'
  )
  const library = useRef<CloudinaryMediaLibrary | undefined>()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const {secrets} = useSecrets<Secrets>(namespace)
  const cloudName = secrets?.cloudName
  const apiKey = secrets?.apiKey
  const [widgetId] = useState(() => `cloundinaryWidget-${Date.now()}`)
  const [showSettings, setShowSettings] = useState(false)

  const propsRef = useRef(props)

  useEffect(() => {
    // because we have to access props after loading js in a callback,
    // we cannot pass props as dependecnies as that will cause infinite updates
    // this takes a snapshot of props, so we can access them later
    propsRef.current = props
  }, [props])

  const handleClose = useCallback(() => {
    if (library.current) {
      library.current.hide()
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
      libraryCreated: (lib: CloudinaryMediaLibrary) => {
        library.current = lib
        const selectedAssets = propsRef.current.selectedAssets
        const firstSelectedAsset = selectedAssets ? selectedAssets[0] : null

        // eslint-disable-next-line no-undef
        const iframe: ChildNode | null | undefined =
          contentRef.current && contentRef.current.firstChild
        if (iframe && iframe instanceof HTMLIFrameElement) {
          setLoadingMessage(undefined)
          let asset
          if (
            propsRef.current.selectionType === 'single' &&
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
      insertHandler: ({assets}: InsertHandlerParams) => {
        if (!library.current) {
          return
        }
        const imageAssets = assets.filter((asset) => asset.resource_type === 'image')
        if (imageAssets.length === 0) {
          throw new Error('The selection did not contain any images.')
        }
        library.current.hide()
        propsRef.current.onSelect(
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
    })
  }, [cloudName, apiKey, widgetId])

  const hasConfig = apiKey && cloudName
  return (
    <Dialog
      id="cloudinary-asset-source"
      header={dialogHeaderTitle ?? 'Select image from Cloudinary'}
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
            text={hasConfig ? undefined : 'Configure Cloudinary plugin'}
          />
        </Flex>

        {hasConfig && loadingMessage && (
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
