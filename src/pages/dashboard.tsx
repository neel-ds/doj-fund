import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import Header from "@/components/title";
import React, { useEffect, useState } from "react";
import TxnCard from "@/components/txnCard";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

interface txnDetails {
  from: string;
  txn: string;
  matic: string;
  message: string;
  timestamp: number;
}

export default function Dashboard() {
  const [txn, setTxn] = useState<txnDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { address, isConnected } = useAccount();

  const contractAbi = "";

  const getTxn = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0x3B79b994F08f8e3fBDddc90FEdc49EFB07af4c71",
          contractAbi,
          signer
        );

        const txn = await contract.getTransactions(address);
        setTxn(txn as txnDetails[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getTxn();
    } else {
      alert("Please connect your wallet");
    }
  });

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="DOJ Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Transactions" />

        <Container maxW={"container.md"} className={"bg-white"}>
          <Card className="bg-white/30">
            <CardHeader>
              <Heading size="md">Transactions</Heading>
            </CardHeader>
            <CardBody>
              {txn.length > 0 && isConnected && <TxnCard txn={txn} />}
            </CardBody>
          </Card>
        </Container>      
      </div>
      </main>
      </>
    
  );
}
