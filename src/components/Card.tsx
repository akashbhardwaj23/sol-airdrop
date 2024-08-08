import { getBalanceAndAirdrop } from "@/app/server/action";
import { LAMPORT } from "@/lib/constants";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type BalanceOrAirdrop = "balance" | "Airdrop";

export function Card() {
  const [balanceOrAirdrop, setBalanceOrAirdrop] =
    useState<BalanceOrAirdrop>("balance");
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
      <div
        className={`flex flex-col justify-center items-center w-[35%] ${
          model ? "blur-sm" : ""
        } rounded-md border border-white px-4 py-8`}
      >
        <h1 className="text-2xl font-semibold mb-4">
          Check Balance and Airdrop SOLs
        </h1>

        <div className="w-full">
          <div className="relative w-full flex justify-between  h-11 rounded-md items-center mb-6 bg-gray-600">
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
                <div className="w-full text-[#2596be]">
                  <p className="flex justify-center font-bold items-center text-xl">
                    Your Balance is {balance / LAMPORT} SOL
                  </p>
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
                    onChange={(e: any) => setPublicKey(e.target.value)}
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
                <button
                  className="p-2 bg-transparent border border-white w-full rounded-lg hover:cursor-pointer flex justify-center items-center mb-4"
                  onClick={() => sendBalanceOrAirdropRequest("Airdrop")}
                >
                  {loading ? (
                    <div className="animate-spin h-6 w-6 bg-white rounded-md"></div>
                  ) : (
                    <>
                      <span className="pr-2">Airdrop</span>
                      <Image
                        src={"/airdrop.png"}
                        width={40}
                        height={40}
                        style={{ width: "auto", height: "auto" }}
                        alt="airdrop-image"
                        className="contrast-75"
                      />
                    </>
                  )}
                </button>

                {token && (
                  <button
                    className="p-2 bg-transparent border border-white w-full rounded-lg hover:cursor-pointer flex justify-center items-center"
                    onClick={() => setModel(true)}
                  >
                    <span className="pr-2">Check the transaction</span>
                    <Image
                      src={"/airdrop.png"}
                      width={40}
                      height={40}
                      style={{ width: "auto", height: "auto" }}
                      alt="airdrop-image"
                      className="contrast-75"
                    />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {model && <Model setModel={setModel} />}
    </div>
  );
}

function Model({ setModel }: { setModel: Dispatch<SetStateAction<Boolean>> }) {
  const [copied, setCopied] = useState<Boolean>(false);
  const inputRef = useRef(null);

  return (
    <div className="absolute flex justify-center items-center w-full h-full">
      <div className="relative w-[30%] border-2 border-orange-700 p-4 shadow-md rounded-md">
        <h1 className="text-sm mb-4">
          Any one with this link will be able to see this transaction
        </h1>
        <div className="absolute flex w-full h-full top-[0.8rem] justify-end right-3" onClick={() => setModel(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 hover:animate-bounce"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex justify-center items-center gap-4 mb-4">
          <input
            type="text"
            value={"hgd"}
            ref={inputRef}
            disabled
            className="w-10/12 bg-transparent border-2 border-blue-700/80 px-2 py-2 rounded-md"
          />
          <div
            className={`bg-gray-100 rounded-md ${!copied ? "p-1" : "p-2"}`}
            onClick={async () => {
              //@ts-ignore
              const inputText = inputRef.current?.value;
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
                stroke-width="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
          <button
            className="px-4 py-2 w-4/5 bg-transparent border border-white rounded-lg"
            onClick={() => {}}
          >
            Link
          </button>
        </div>
      </div>
    </div>
  );
}
