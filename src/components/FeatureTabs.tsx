import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';

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

function getKeyboardTarget(key: string, currentIndex: number, count: number) {
  switch (key) {
    case 'ArrowLeft':
      return (currentIndex - 1 + count) % count;
    case 'ArrowRight':
      return (currentIndex + 1) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}

export function FeatureTabs({
  features,
  selectedIndex,
  idPrefix,
  panelId,
  onSelect,
}: FeatureTabsProps) {
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const tablist = tablistRef.current;
    const tab = tabRefs.current[selectedIndex];
    if (!tablist || !tab) {
      return;
    }

    const isFullyVisible =
      tab.offsetLeft >= tablist.scrollLeft &&
      tab.offsetLeft + tab.offsetWidth <=
        tablist.scrollLeft + tablist.clientWidth;
    if (!isFullyVisible) {
      tablist.scrollLeft =
        tab.offsetLeft - (tablist.clientWidth - tab.offsetWidth) / 2;
    }
  }, [selectedIndex]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const targetIndex = getKeyboardTarget(
      event.key,
      selectedIndex,
      features.length,
    );
    if (targetIndex === null) {
      return;
    }

    event.preventDefault();
    onSelect(targetIndex);
    tabRefs.current[targetIndex]?.focus({ preventScroll: true });
  }

  return (
    <div
      ref={tablistRef}
      className={styles.tablist}
      role="tablist"
      aria-label="Features"
      onKeyDown={handleKeyDown}
    >
      {features.map((feature, index) => {
        const isSelected = index === selectedIndex;

        return (
          <button
            key={feature.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
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
