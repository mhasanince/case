import { useMemo } from 'react';
import type { CSSProperties } from 'react';

import { getImageSources } from '../features';
import type { Feature, StageImage } from '../features';
import { useImagesReady } from '../useImagesReady';
import styles from './FeatureSlide.module.css';

type StagePosition = CSSProperties &
  Record<'--x' | '--y' | '--width' | '--height', number>;

function getStagePosition(image: StageImage): StagePosition {
  return {
    '--x': image.x,
    '--y': image.y,
    '--width': image.width,
    '--height': image.height,
  };
}

export function FeatureSlide({ feature }: { feature: Feature }) {
  const imageSources = useMemo(() => getImageSources(feature), [feature]);
  const imagesReady = useImagesReady(imageSources);

  return (
    <div className={styles.slide}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>{feature.name}</p>
        <h2 className={styles.title}>{feature.title}</h2>
        <p className={styles.description}>{feature.description}</p>
        <button type="button" className={styles.learnMore}>
          Learn More
        </button>
      </div>
      <div
        className={styles.stage}
        role="img"
        aria-label={feature.illustrationLabel}
        data-ready={imagesReady}
      >
        <img
          className={styles.phone}
          src={feature.phone.src}
          alt=""
          width={feature.phone.width}
          height={feature.phone.height}
          style={getStagePosition(feature.phone)}
        />
        <div className={styles.decorations}>
          {feature.decorations.map((decoration) => (
            <img
              key={decoration.src}
              className={[
                styles.decoration,
                styles[decoration.animation],
                decoration.frosted && styles.frosted,
              ]
                .filter(Boolean)
                .join(' ')}
              src={decoration.src}
              alt=""
              width={decoration.width}
              height={decoration.height}
              style={getStagePosition(decoration)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
