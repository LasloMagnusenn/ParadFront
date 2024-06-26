import { ITopicsData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/topic/topic-items-account.module.css";
import HistoryDebateItem from "@/components/ui/debate/HistoryDebateItem";


export default function HistoryDebatesItems(props: {
  topics: ITopicsData | undefined;
  historyDebatesComplexData: any;
}) {
  const {topics, historyDebatesComplexData} = props;

  return (
    <div className={styles.topic_items}>
      <div className={styles.topic_items__container}>
        <div className={styles.topic_items__container__info}>
          <h1>Debates History</h1>
        </div>
        <div className={styles.topic_items__container__debates}>
          {topics?.topics ? (
              topics.topics.map((topic, indexTopic) =>
                  topic?.debates.map((debate, indexDebate) => (
                      <div
                          key={`${indexTopic}-${indexDebate}`}
                          className={styles.topic_items__container__debates__debate}
                      >
                        <HistoryDebateItem
                            id={topic.id}
                            debate={debate}
                            positionalKey={indexDebate}
                            userIndex={debate.memberChoices[indexDebate]}
                            historyDebateComplexData={historyDebatesComplexData[indexDebate]}
                        />
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
