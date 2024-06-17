import { ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/topic/topic-items.module.css";
import ActiveDebateItem from "./ActiveDebateItem";
import { ActiveDebates } from "@/types/referral.type";


export default function HistoryDebatesItems(props: {
  topics: ITopicsData | undefined;
  debatesIndexes: ActiveDebates;
}) {
  const {topics, debatesIndexes} = props;

  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        <div className={styles.topic_items__container__info}>
          <h1>Debates History</h1>
        </div>
        <div className={styles.topic_items__container__debates}>
          {topics?.topics ? (
            topics.topics.map((topic) =>
              topic?.debates.map((debate) => (
                <div
                  key={debate.id}
                  className={styles.topic_items__container__debates__debate}
                >
                  <ActiveDebateItem id={topic.id} debate={debate} debatesIndexes={debatesIndexes}/>
                </div>
              ))
            )
          ) : (
            <div className={styles.topic_items__container__debates__not_found}>
              <h3>No Debates Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
