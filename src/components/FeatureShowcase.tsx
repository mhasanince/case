import { useId, useState } from 'react';

import type { Feature } from '../features';
import { FeatureSlide } from './FeatureSlide';
import { FeatureTabs, getTabId } from './FeatureTabs';
import styles from './FeatureShowcase.module.css';

export function FeatureShowcase({
  features,
}: {
  features: ReadonlyArray<Feature>;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const idPrefix = useId();
  const panelId = `${idPrefix}panel`;
  const selectedFeature = features[selectedIndex];

  return (
    <section className={styles.showcase}>
      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={getTabId(idPrefix, selectedFeature)}
      >
        <FeatureSlide feature={selectedFeature} />
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
