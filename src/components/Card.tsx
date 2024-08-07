
import { getBalanceAndAirdrop } from "@/app/server/action";
import Image from "next/image";
import { useState } from "react";


type BalanceOrAirdrop = "balance" | "Airdrop";

export function Card(){

    const [balanceOrAirdrop, setBalanceOrAirdrop] = useState<BalanceOrAirdrop>("balance");
    const [publicKey, setPublicKey] = useState();
    const [balance, setBalance] = useState(null);


    const sendBalanceOrAirdropRequest = async (type : BalanceOrAirdrop) => {
        if (!publicKey) {
          alert("Public key is required");
          return;
        }
        
        if(type === "balance"){
            const response = await getBalanceAndAirdrop({
                jsonrpc : "2.0",
                publicKey,
                method : "getBalance"
            })
                console.log(response.result.value);
                setBalance(response.result.value)
         } else if(type === "Airdrop"){
            const response = await getBalanceAndAirdrop({
                jsonrpc : "2.0",
                publicKey,
                method : "requestAirdrop"
            });

            console.log(response)
         }


      };


    return (
        <div className="absolute flex justify-center w-full top-48">
          <div className="flex flex-col justify-center items-center w-[35%] rounded-md border border-white px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">
              Check Balance and Airdrop Sols
            </h1>

            <div className="w-full">
              <div className="relative w-full flex justify-between bg-transparent h-11 rounded-md items-center mb-4 bg-gray-700">
                {balanceOrAirdrop === "balance" ? (
                  <div className="absolute bg-white h-9 w-1/2 rounded-md ml-1 left-0 z-0"></div>
                ) : (
                  <div className="absolute bg-white h-9 w-1/2 rounded-md mr-1 right-0 z-0"></div>
                )}
                <div
                  className={`${
                    balanceOrAirdrop === "balance" ? "text-black" : "text-white"
                  } w-1/2 flex justify-center font-semibold text-base z-10 hover:cursor-pointer`}
                  onClick={() => setBalanceOrAirdrop("balance")}
                >
                  <span>Balance</span>
                </div>
                <div
                  className={`${
                    balanceOrAirdrop === "balance" ? "text-white" : "text-black"
                  } w-1/2 flex justify-center font-semibold text-base z-10 hover:cursor-pointer`}
                  onClick={() => setBalanceOrAirdrop("Airdrop")}
                >
                  <span>Airdrop</span>
                </div>
              </div>
              {balanceOrAirdrop === "balance" ? (
                <div className="w-full px-4">
                  <div className="w-full mb-4">
                    <input
                      type="text"
                      className="px-2 py-2 w-full bg-transparent border border-orange-400 text-sm rounded-lg placeholder:text-sm"
                      placeholder="Your Public key"
                      onChange={(e: any) => setPublicKey(e.target.value)}
                    />
                  </div>
                  <div className="w-full mb-8">
                    <button
                      className="p-2 bg-transparent border border-white w-full rounded-lg hover:cursor-pointer flex justify-center items-center"
                      onClick={() => sendBalanceOrAirdropRequest("balance")}
                    >
                      <span className="pr-2">check your balance</span>
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
                      </svg>
                    </button>
                  </div>
                  {balance && (
                    <div className="w-full text-white">
                      <p className="flex justify-center items-center text-base">Your Balance is {balance}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full px-4">
                  <div className="w-full mb-4">
                    <div className="w-full grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        className="p-2 col-span-2 bg-transparent rounded-md text-sm border border-white placeholder:text-sm"
                        placeholder="Your Public Key"
                        onChange={(e : any) => setPublicKey(e.target.value)}
                      />
                      <select className="p-2 col-span-1 bg-transparent rounded-md border border-orange-500">
                        <option
                          value="sol"
                          className="p-2 bg-transparent rounded-md border border-white"
                        >
                          Sol
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full mb-6">
                    <button className="p-2 bg-transparent border border-white w-full rounded-lg hover:cursor-pointer flex justify-center items-center" onClick={() => sendBalanceOrAirdropRequest("Airdrop")}>
                      <span className="pr-2">Airdrop</span>
                      <Image
                        src={"/airdrop.png"}
                        width={40}
                        height={40}
                        style={{width : "auto", height : "auto"}}
                        alt="airdrop-image"
                        className="contrast-75"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    )
}