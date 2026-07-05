import { DiagnoseForm } from "#/features/diagnose-pokemon";
import { MatchResultPanel } from "#/widgets/match-result-panel";

import styles from "./page.module.css";

export const IndexPage = () => (
  <main className={styles.main}>
    <DiagnoseForm />
    <MatchResultPanel />
  </main>
);
