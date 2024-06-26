import { IDebateData } from "@/interfaces/debates.interface";
import Link from "next/link";
import { formatUnits } from "viem";
import styles from "@/styles/components/ui/debate/debate-item-profile.module.css";
import Image from "next/image";


export default function HistoryDebateItem(
    {
        id: topicID,
        debate,
        userIndex,
        positionalKey
    }: IDebateData & {
        userIndex: number;
        positionalKey: number;
    }
) {
    const formattedPrizePool = (value: number) => Number(
        formatUnits(BigInt(value), 18)
    ).toFixed(2);


    return (
        <>
            <div className={styles.debate_item}>
                <Link
                    className={styles.debate_item__container}
                    href={`/debates/topic-${topicID}/debate-${debate.id}`}
                >
                    {debate?.metadata?.preview && (
                        <Image
                            src={debate?.metadata?.answer_data[userIndex].image as string}
                            className={styles.debate_item__container__img}
                            alt="topic"
                            height={306}
                            width={306}
                        />
                    )}
                    <div className={styles.debate_item__container__info}>
                        <div className={styles.debate_item__container__info__text}>
                            <h4>{debate.metadata?.point || debate.point}</h4>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={styles.debate_item__container__info__bottom}>
                <div className={styles.debate_item__container__info__text__bottom}>
                    <h4>{debate.metadata?.answer_data[userIndex].answer}</h4>
                    <span>Bet: {formattedPrizePool(debate.memberShares[positionalKey])} $PARAD </span>
                </div>
            </div>
        </>
    );
}
