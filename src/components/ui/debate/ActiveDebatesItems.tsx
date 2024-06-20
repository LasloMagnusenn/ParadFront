import { ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/topic/topic-items-account.module.css";
import ActiveDebateItem from "./ActiveDebateItem";
import { ActiveDebates } from "@/types/referral.type";


export default function ActiveDebatesItems(props: {
  topics: ITopicsData | undefined;
  debatesIndexes: ActiveDebates;
}) {
  const {topics, debatesIndexes} = props;

  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        
        <div className={styles.topic_items__container__info}>
          <h1>Active Debates</h1>
        </div>
          
        <div className={styles.topic_items__container__debates}>
          {topics?.topics ? (
            topics.topics.map((topic, indexTopic) =>
              topic?.debates.map((debate, indexDebate) => (
                <div
                  key={`${indexTopic}-${indexDebate}`}
                  className={styles.topic_items__container__debates__debate}
                >
                  <ActiveDebateItem id={topic.id} debate={debate} debatesIndexes={debatesIndexes}/>
                </div>
              ))
            )
          ) : (
            <div className={styles.topic_items__container__debates__not_found}>
              <h3>No Active Debates Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
