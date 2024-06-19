import { IDebateData } from "@/interfaces/debates.interface";
import Link from "next/link";
import styles from "@/styles/components/ui/debate/debate-items.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";


export default function DebateItems({ id: topicID, debate }: IDebateData) {
  return (
    <Link href={`/debates/topic-${topicID}/debate-${debate?.id}`}>
      <div className={styles.debate_item_body}>
        <Image className={styles.debate_item_image} src={debate.metadata?.preview as string} width={100} height={100} alt="preview"/>
        <div>
          <p>{debate?.metadata?.point || debate.point}</p>
          <div className={styles.debate_item_text_with_image}>
            <Image src={SVG.dollarSquare} alt="dollar-square" width={16} height={16}/>
            <p className={styles.debate_item_text_thin}>Prize pool: {debate.prizePool} $Parad</p>
          </div>
          <div className={styles.debate_item_text_with_image}>
            <Image src={SVG.profile2User} alt="dollar-square" width={16} height={16}/>
            <p className={styles.debate_item_text_thin}>Participants: {debate.qtyMembers}/{debate.needQtyMembers}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}



/*
<div className={styles.debate_items}>
      <div className={styles.debate_items__container}>
        <div className={styles.debate_items__container__left}>
          <h2>{debate.status}</h2>
          <p>{debate?.metadata?.point || debate.point}</p>
          <Link
            className={styles.pc}
            style={{ width: 200 }}
            href={`/debates/topic-${topicID}/debate-${debate?.id}`}
          >
            <GreyButton title="Vote" />
          </Link>
        </div>
        <div className={styles.debate_items__container__right}>
          <Image
            className={`${styles.debate_items__container__right__line} ${styles.pc}`}
            src={SVG.verticalLine}
            alt="vertical line"
          />
          <Image
            className={`${styles.debate_items__container__right__line_x} ${styles.mobile}`}
            src={SVG.horizontalLine}
            alt="horizontal line"
          />
          <div className={styles.debate_items__container__right__details}>
            <div
              className={styles.debate_items__container__right__details__text}
            >
              <h2>
                {debate.qtyMembers}/{debate.needQtyMembers}
              </h2>
              <h4>Amount Of Participants</h4>
            </div>
            <div
              className={styles.debate_items__container__right__details__text}
            >
              <h2>{debate.prizePool} $Parad</h2>
              <h4>Prize Pool</h4>
            </div>
            <div
              className={styles.debate_items__container__right__details__text}
            >
              <h2>{debate.qtyAnswers}</h2>
              <h4>Amount Of Answers</h4>
            </div>
            <Link
              className={styles.mobile}
              href={`/debates/topic-${topicID}/debate-${debate?.id}`}
            >
              <GreyButton style={{ width: "100%" }} title="Vote" />
            </Link>
          </div>
        </div>
      </div>
    </div>

*/
