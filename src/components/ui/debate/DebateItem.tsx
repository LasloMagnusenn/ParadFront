"use client"
import BackButton from "@/components/buttons/Back";
import GreyButton from "@/components/buttons/Grey";
import { IDebateData } from "@/interfaces/debates.interface";
import styles from "@/styles/components/ui/debate/debate-item.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";
import DebateAnswer from "./DebateAnswer";
import BackMobile from "@/components/buttons/BackMobile";
import AdminDebate from "../admin/AdminDebate";
import PurpleButton from "@/components/buttons/Purple";
import {useAccount} from "wagmi";
import { formatUnits } from "viem";

export default function DebateItem({ id: topicID, debate }: IDebateData) {
  const { address } = useAccount();

  const formattedPrizePool = (value: number) => Number(
    formatUnits(BigInt(value), 18)
  ).toFixed(2);

  const handleInviteFriendClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}${location.pathname}/?ref=${address}`)
  }

  return (
    <div className={styles.debate_item}>
      <div className={styles.debate_item__container}>

        <div className={styles.debate_item__container__info}>
          <img
              alt="preview"
              src={debate.metadata?.preview as string}
              className={styles.debate_item_preview}
          />
          <div className={styles.debate_item__container__info__first}>

            <div className={styles.debate_item__container__info__first__head}>
              <h4 className="purple_color">Topic #{topicID}</h4>
              <div className={styles.mobile}>
                <BackMobile title="Go Back"/>
              </div>
            </div>
            <div className={styles.debate_item__container__info__first__info}>
              <h1>{debate?.metadata?.point || debate.point}</h1>
            </div>

            <div className={styles.debate_item__container__info__second}>
              <div className={styles.debate_item__container__info__second__info}>
                <h2 className="purple_color">{formattedPrizePool(debate.prizePool)} $Parad</h2>
                <p className="purple_color">Prize Pool</p>
              </div>

              <div className={styles.debate_item__container__info__second__info}>
                <h2>
                  {debate.qtyMembers}/{debate.needQtyMembers}
                </h2>
                <p>Amount Of Participants</p>
              </div>

              <div className={styles.debate_item__container__info__second__info}>
                <h2>{debate.status}</h2>
                <p>Status</p>
              </div>
            </div>

            <div className={styles.pc}>
              <a href="#answers"><PurpleButton style={{marginTop: 25}} title="Debate"/></a>
              <GreyButton style={{marginTop: 25}} title="Invite Friends" onClick={handleInviteFriendClick}/>
            </div>
            <div className={styles.mobile}>
              <a href="#answers">
                <PurpleButton
                    style={{marginTop: 10, width: "100%"}}
                    title="Debate"
                />
              </a>
              <GreyButton
                  style={{marginTop: 10, width: "100%"}}
                  title="Invite Friends"
                  onClick={handleInviteFriendClick}
              />
            </div>
          </div>

          <div className={`${styles.debate_item__container__info__third} ${styles.pc}`}>
            <BackButton style={{width: 150}} title="Back"/>
          </div>
        </div>


        <AdminDebate dispute={{groupId: topicID, groupIndex: debate.id}}/>

        <div className={styles.debate_item__container__answers} id="answers">
          <div className={styles.debate_item__container__answers__head}>
            <h1>Answers</h1>
            <Image
                className={styles.pc}
                src={SVG.horizontalLine2}
                alt="Horizontal Line"
            />
            <Image
                className={styles.mobile}
              src={SVG.horizontalLine3}
              alt="Horizontal Line"
            />
          </div>
          <div className={styles.debate_item__container__answers__body}>
            <div
              className={styles.debate_item__container__answers__body__items}
            >
              {debate?.qtyAnswers &&
                Array.from(Array(debate.qtyAnswers), (_, index) => (
                  <DebateAnswer
                    key={index}
                    topicId={Number(topicID ? topicID : 0)}
                    debateId={Number(debate.id) - 1}
                    answerId={index}
                    metaData={debate.metadata}
                  />
                ))}
            </div>
          </div>
          <a
            style={{ height: 75 }}
            target="_blank"
            href="https://pancakeswap.finance/swap?outputCurrency=0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C"
          >
            <GreyButton
              style={{ width: "100%", height: "100%", fontSize: 18 }}
              title="Buy PARAD Tokens"
            />
          </a>
        </div>
      </div>
    </div>
  );
}




/*
* <div className={styles.debate_item__container__info__second}>
            <div className={styles.debate_item__container__info__second__info}>
              <h2 className="purple_color">{debate.prizePool} $Parad</h2>
              <p className="purple_color">Prize Pool</p>
            </div>
            <div className={styles.debate_item__container__info__second__info}>
              <h2>
                {topicID && (
                  <Participating topicId={topicID} debateId={debate.id} />
                )}
              </h2>
              <p>Status</p>
            </div>
            <div className={styles.debate_item__container__info__second__info}>
              <h2>
                {debate.qtyMembers}/{debate.needQtyMembers}
              </h2>
              <p>Amount Of Participants</p>
            </div>
            <div className={styles.pc}>
              <GreyButton style={{ marginTop: 25 }} title="Invite Friends" />
              <a href="#answers"><PurpleButton style={{ marginTop: 25 }} title="Debate" /></a>
            </div>
            <div className={styles.mobile}>
              <GreyButton
                style={{ marginTop: 10, width: "100%" }}
                title="Invite Friends"
              />
              <a href="#answers">
                <PurpleButton
                  style={{ marginTop: 10, width: "100%" }}
                  title="Debate"
                />
              </a>
            </div>
          </div>
*
* */
