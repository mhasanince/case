import { FeatureShowcase } from './components/FeatureShowcase';
import { features } from './features';
import styles from './App.module.css';

export function App() {
  return (
    <main className={styles.main}>
      <h1 className={styles.visuallyHidden}>Features</h1>
      <FeatureShowcase features={features} />
    </main>
  );
}
