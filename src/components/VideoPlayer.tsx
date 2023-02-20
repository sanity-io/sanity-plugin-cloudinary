import React, {CSSProperties} from 'react'

type PlayerKind = 'player' | 'diff'

export type VideoPlayerProps = {
  src: string
  // eslint-disable-next-line react/no-unused-prop-types
  kind: PlayerKind
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const {src} = props

  const style: CSSProperties = {
    width: '100%',
    height: 'auto',
  }

  return (
    <video controls style={style}>
      <source src={src} type="video/mp4" />
    </video>
  )
}
