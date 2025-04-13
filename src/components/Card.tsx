"use client"
import { getBalanceAndAirdrop } from "@/app/server/action";
import { LAMPORT } from "@/lib/constants";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectGroup,SelectTrigger, SelectValue, SelectItem } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import Loader from "./loading";

type BalanceOrAirdrop = "balance" | "Airdrop";

export function CardComponent() {
  const [publicKey, setPublicKey] = useState<string>();
  const [balance, setBalance] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [model, setModel] = useState<Boolean>(false);

  const sendBalanceOrAirdropRequest = async (type: BalanceOrAirdrop) => {
    if (!publicKey) {
      alert("Public key is required");
      return;
    }

    if (type === "balance") {
      const response = await getBalanceAndAirdrop({
        jsonrpc: "2.0",
        publicKey,
        method: "getBalance",
      });
      if (response === "Error") {
        alert("You have given wrong publick key");
        return;
      }
      setBalance(response.result.value);
    } else if (type === "Airdrop") {
      setLoading(true);
      const response = await getBalanceAndAirdrop({
        jsonrpc: "2.0",
        publicKey,
        method: "requestAirdrop",
      });

      if (response === "Error") {
        alert(
          "You have requested for too many Airdrop. Try again after 24 hours"
        );
        setLoading(false);
        return;
      }

      setToken(response.result);

      setLoading(false);
    }
  };

  return (
    <div className="absolute flex justify-center w-full top-48">
      <Card
        className={`flex flex-col justify-center items-center w-[35%] ${
          model ? "blur-sm" : ""
        } rounded-md px-4 py-8`}
      >
        <h1 className="text-2xl font-semibold mb-4">
          Check Balance and Airdrop SOLs
        </h1>
        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="Airdrop">Airdrop</TabsTrigger>
          </TabsList>
          <TabsContent value="balance">
              <div className="w-full mb-4">
                <Input type="text" placeholder="Your Public key" onChange={(e: any) => setPublicKey(e.target.value)} />
              </div>
              <div className="w-full mb-8">
                  <Button
                   className="p-2 w-full rounded-lg hover:cursor-pointer flex justify-center items-center"
                  onClick={() => sendBalanceOrAirdropRequest("balance")}><span className="pr-2">check your balance</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg></Button>
              
              </div>
              {balance && (
                <div className="w-full text-[#2596be]">
                  <p className="flex justify-center font-bold items-center text-xl">
                    Your Balance is {balance / LAMPORT} SOL
                  </p>
                </div>
              )}
            
          </TabsContent>

          <TabsContent value="Airdrop">
              <div className="w-full mb-4">
                <div className="w-full grid grid-cols-3 gap-2">
                  <Input type="text" className="p-2 col-span-2 rounded-md text-sm placeholder:text-sm" placeholder="Your Public Key" onChange={(e: any) => setPublicKey(e.target.value)} />
                  <Select>
                    <SelectTrigger className="p-2 rounded-md border border-orange-500">
                    <SelectValue placeholder="Select Chain"/>
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                      <SelectItem value="solana">
                        Solana
                      </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full mb-6">
                <Button className="px-2 py-4 w-full rounded-lg hover:cursor-pointer flex justify-center items-center mb-4"
                  onClick={() => sendBalanceOrAirdropRequest("Airdrop")}
                  >
                  {loading ? 
                  (<Loader loading={loading} />)
                  : (
                    <>
                      <span>Airdrop</span>
                      <Image
                        src={"/airdrop.png"}
                        width={40}
                        height={40}
                        style={{ width: "auto", height: "auto" }}
                        alt="airdrop-image"
                        className="contrast-100"
                      />
                    </>
                  )}
                </Button>

                {token && (
                  <Button
                      className="p-2 w-full rounded-lg hover:cursor-pointer flex justify-center items-center"
                      onClick={() => setModel(true)}
                  >
                    <span className="pr-2">Check the transaction</span>
                    <Image
                    src={"/airdrop.png"}
                    width={40}
                    height={40}
                    style={{width: "auto", height : "auto"}}
                    alt="airdropimage"
                    className="contrast-75"
                    />
                  </Button>
                )}
              </div>
          </TabsContent>
        </Tabs>
      </Card>
      {model && <Model token={token!} setModel={setModel} />}
    </div>
  );
}

function Model({ token, setModel }: { token : string, setModel: Dispatch<SetStateAction<Boolean>> }) {
  const [copied, setCopied] = useState<Boolean>(false);
  const inputRef = useRef(null);

  return (
    <div className="absolute flex justify-center items-center w-full h-full">
      <div className="relative w-[30%] border-2 border-orange-700 p-4 shadow-md rounded-md">
        <h1 className="text-sm mb-4">
          Any one with this link will be able to see this transaction
        </h1>
        <div
          className="absolute flex w-full h-full top-[0.8rem] justify-end right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={() => setModel(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex justify-center items-center gap-4 mb-4">
          <Input
          type="text"
          value={token}
          ref={inputRef}
          disabled
          className="w-10/12 border-2 border-blue-600/80 px-2 py-2 rounded-md"
          />
          <div
            className={`rounded-md ${!copied ? "p-1" : "p-2"}`}
            onClick={async () => {
              //@ts-ignore
              const inputText = inputRef.current?.value;
              console.log(inputText)
              await navigator.clipboard.writeText(inputText);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 5000);
            }}
          >
            {!copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            ) : (
              <div className="text-xs font-semibold text-gray-800/80 hover:cursor-pointer">
                Copied
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Button className="px-4 py-2 w-4/5 rounded-lg">
          <Link
          href={`https://solscan.io/tx/${token}?cluster=devnet`}
          >
            Link
          </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}