"use client";

import { useActiveDisputesForUser } from "@/hooks/useContractData";
import { useAccount } from "wagmi";
import type { ActiveDebates } from "@/types/referral.type";
import ActiveDebatesItems from "@/components/ui/debate/ActiveDebatesItems";

export default function ActiveDebates() {
  const { address } = useAccount();
  const data = useActiveDisputesForUser(address);

  console.log("DATA:", data)

  return <div>{<ActiveDebatesItems topics={data?.topics} />}</div>;
}
