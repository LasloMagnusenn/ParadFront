"use client"
import HotDebateItem from "@/components/ui/debate/HotDebateItem";
import { useHotDisputes } from "@/hooks/useContractData";
import { IDebatesData, ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/screens/debates/hot-debates.module.css";

export function HotDebatesPreloaded(props: {
  debates: IDebatesData | undefined;
  topicId: string | number;
}) {
  const {debates, topicId} = props;
  return (
    <div className={styles.hot_debates}>
      {debates?.debates.map((debate) => (
          <HotDebateItem
              key={debate.id}
              id={topicId}
              debate={debate}
          />
      ))}
    </div>
  );
}

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
