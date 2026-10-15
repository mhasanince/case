import type { Feature } from '../features';
import styles from './FeatureTabs.module.css';

type FeatureTabsProps = {
  features: ReadonlyArray<Feature>;
  selectedIndex: number;
  idPrefix: string;
  panelId: string;
  onSelect: (index: number) => void;
};

export function getTabId(idPrefix: string, feature: Feature) {
  return `${idPrefix}${feature.id}-tab`;
}

export function FeatureTabs({
  features,
  selectedIndex,
  idPrefix,
  panelId,
  onSelect,
}: FeatureTabsProps) {
  return (
    <div className={styles.tablist} role="tablist" aria-label="Features">
      {features.map((feature, index) => {
        const isSelected = index === selectedIndex;

        return (
          <button
            key={feature.id}
            type="button"
            role="tab"
            id={getTabId(idPrefix, feature)}
            className={styles.tab}
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(index)}
          >
            <span className={styles.badge} aria-hidden="true">
              <span
                className={styles.icon}
                style={{
                  maskImage: `url("${feature.icon}")`,
                  WebkitMaskImage: `url("${feature.icon}")`,
                }}
              />
              <svg className={styles.ring} viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="27.5" />
              </svg>
            </span>
            {feature.name}
          </button>
        );
      })}
    </div>
  );
}
