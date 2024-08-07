"use server"
import { LAMPORT } from "@/lib/constants";
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
    try {
        const response = await axios.post("https://api.devnet.solana.com/", {
            id: "1",
            jsonrpc,
            method,
            params: [publicKey],
          });
      
          console.log(response.data);
          return response.data;
    } catch (error) {
        return "Error"
    }
  } else if (method === "requestAirdrop") {
      try {
        const response = await axios.post("https://api.devnet.solana.com/", {
            id: "1",
            jsonrpc,
            method,
            params: [publicKey, LAMPORT],
          });
          console.log(response.data);
          return response.data;
      } catch (error) {
        return "Error"
      }
  }
}
