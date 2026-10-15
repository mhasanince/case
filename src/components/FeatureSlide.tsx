import type { CSSProperties } from 'react';

import type { Feature, StageImage } from '../features';
import styles from './FeatureSlide.module.css';

type StagePosition = CSSProperties & Record<'--x' | '--y' | '--width', number>;

function getStagePosition(image: StageImage): StagePosition {
  return { '--x': image.x, '--y': image.y, '--width': image.width };
}

export function FeatureSlide({ feature }: { feature: Feature }) {
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
              className={styles.decoration}
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
