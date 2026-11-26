import React from 'react';
import { Composition } from 'remotion';
import { Episode } from './Episode';
import './site/visuals-lib.js';
import './site/visuals.js';
import './site/audio-sync.js';
import { EPISODES } from './episodes';

export const FPS = 30;
export const Root: React.FC = () => (
  <>
    {Object.keys(EPISODES).map((id) => (
      <Composition key={id} id={'ep' + id} component={Episode as any} durationInFrames={Math.ceil(((window as any).SYNC[id].dur + 1.5) * FPS)}
        fps={FPS} width={1280} height={720} defaultProps={{ id }} />
    ))}
  </>
);
