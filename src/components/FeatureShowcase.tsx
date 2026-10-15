import { useEffect, useId, useState } from 'react';
import type { TransitionEvent } from 'react';

import { getImageSources } from '../features';
import type { Feature } from '../features';
import { preloadImage } from '../useImagesReady';
import { FeatureSlide } from './FeatureSlide';
import { FeatureTabs, getTabId } from './FeatureTabs';
import styles from './FeatureShowcase.module.css';

export function FeatureShowcase({
  features,
}: {
  features: ReadonlyArray<Feature>;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const idPrefix = useId();
  const panelId = `${idPrefix}panel`;
  const shownFeature = features[shownIndex];
  const isLeaving = shownIndex !== selectedIndex;

  useEffect(() => {
    for (const source of features.flatMap(getImageSources)) {
      void preloadImage(source);
    }
  }, [features]);

  function handlePanelTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && isLeaving) {
      setShownIndex(selectedIndex);
    }
  }

  return (
    <section className={styles.showcase}>
      <div
        key={shownIndex}
        role="tabpanel"
        id={panelId}
        aria-labelledby={getTabId(idPrefix, shownFeature)}
        className={
          isLeaving ? `${styles.panel} ${styles.leaving}` : styles.panel
        }
        onTransitionEnd={handlePanelTransitionEnd}
      >
        <FeatureSlide feature={shownFeature} />
      </div>
      <FeatureTabs
        features={features}
        selectedIndex={selectedIndex}
        idPrefix={idPrefix}
        panelId={panelId}
        onSelect={setSelectedIndex}
      />
    </section>
  );
}
