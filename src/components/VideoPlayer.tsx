import React, { CSSProperties } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

type PlayerKind = 'player' | 'diff';

export type VideoPlayerProps = {
  src: string;
  kind: PlayerKind;
};

export default class VideoPlayer extends React.Component<
  VideoPlayerProps,
  any
> {
  videoNode?: HTMLVideoElement;
  player?: VideoJsPlayer;

  componentDidMount() {
    const { src } = this.props;
    this.player = videojs(this.videoNode, {
      sources: [{ src }],
      controls: true,
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    const { kind } = this.props;
    const className: Record<PlayerKind, string> = {
      player: 'video-js vjs-16-9 vjs-big-play-centered',
      diff: 'video-js vjs-layout-tiny vjs-fluid',
    };

    const style: CSSProperties = { position: 'relative' };

    return (
      <div>
        <link
          href="https://vjs.zencdn.net/7.8.4/video-js.css"
          rel="stylesheet"
        />
        <div data-vjs-player>
          <video
            onClick={event => event.stopPropagation()}
            style={kind === 'diff' ? style : {}}
            className={className[kind]}
            ref={node => {
              if (node) {
                this.videoNode = node;
              }
            }}
          ></video>
        </div>
      </div>
    );
  }
}
