"use server"
import axios from "axios";

export async function getBalanceAndAirdrop({
  publicKey,
  method,
  jsonrpc,
}: {
  publicKey: string;
  method: string;
  jsonrpc: string;
}) {
  if (method === "getBalance") {
    const response = await axios.post("https://api.devnet.solana.com/", {
      id: "1",
      jsonrpc,
      method,
      params: [publicKey],
    });

    console.log(response.data);
    return response.data;
  } else if (method === "requestAirdrop") {
    const response = await axios.post("https://api.devnet.solana.com/", {
      id: "1",
      jsonrpc,
      method,
      params: [publicKey, 0],
    });
    console.log(response.data);
    response.data;
  }
}
