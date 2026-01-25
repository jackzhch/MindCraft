import React from 'react';
import { Composition } from 'remotion';
import { MindCraftPromo } from './MindCraftPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MindCraftPromo"
        component={MindCraftPromo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "MindsCraft",
          subtitle: "Digital Architectures for Thought"
        }}
      />
    </>
  );
};

