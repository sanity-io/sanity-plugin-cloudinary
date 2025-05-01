import React, {useEffect, useState} from 'react'
import {useClient} from 'sanity'
import AssetPreview from './AssetPreview'

interface ReferencePreviewProps {
  value: {_ref: string}
}

export function ReferencePreview(props: ReferencePreviewProps) {
  const {value} = props
  const client = useClient({apiVersion: '2023-01-01'})
  const [asset, setAsset] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!value?._ref) {
      setAsset(null)
      setLoading(false)
      return
    }

    setLoading(true)
    client
      .getDocument(value._ref)
      .then((document) => {
        setAsset(document?.asset || null)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching referenced asset:', err)
        setLoading(false)
      })
  }, [value, client])

  if (loading) {
    return <div>Loading asset...</div>
  }

  if (!asset) {
    return null
  }

  return <AssetPreview value={asset} layout="block" />
}
