"use client"
import HotDebateItem from "@/components/ui/debate/HotDebateItem";
import { useHotDisputes } from "@/hooks/useContractData";
import styles from "@/styles/components/screens/debates/hot-debates.module.css";


export default function HotDebates() {
  const { topics, hotDisputes } = useHotDisputes();

  return (
    <div className={styles.hot_debates}>
      {
        topics?.topics &&
          topics?.topics.map((topic) => (
              topic.debates.map((debate) => (
                  <HotDebateItem key={topic.id} id={topic.id} debate={debate} />
              ))
          ))
      }
    </div>
  );
}
