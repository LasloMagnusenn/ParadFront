"use client"
import HotDebateItem from "@/components/ui/debate/HotDebateItem";
import { useHotDisputes } from "@/hooks/useContractData";
import { ITopicData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/screens/debates/hot-debates.module.css";

{
  /* Temporary !!! */
}
export default function HotDebates({ topic }: ITopicData) {
  const { debates } = topic;

  // const data = useHotDisputes();

  //console.log("HOT DEBATES:", data)

  return (
    <div className={styles.hot_debates}>
      {debates && debates.length
        ? debates.map((debate, index) => (
            <HotDebateItem key={index} id={topic?.id} debate={debate} />
          ))
        : "Not Found"}
    </div>
  );
}
