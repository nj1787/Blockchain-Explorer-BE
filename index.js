import express from "express";
import dotenv from "dotenv";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

dotenv.config();

const app = express();

const port = process.env.PORT || 5600;

const apiKey = process.env.MORALIS_API_KEY;
const address = process.env.ETH_ADDRESS;
const chain = EvmChain.ETHEREUM;

// ROUTES AND CONTROLLERS

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Blockchain Explorer</h1>");
});

app.get("/transactions", async (req, res) => {
  const transactionData = await getTransactions();
  res.status(200).json(transactionData);
});

app.get("/native-balance", async (req, res) => {
  const nativeBalance = await getNativeBalance();
  res.status(200).json(nativeBalance);
});

app.get("/erc-token-balance", async (req, res) => {
  const ercBalance = await getERC20TokensBalance();
  res.status(200).json(ercBalance);
});

// UTILITIES

async function getTransactions() {
  const transactions = await Moralis.EvmApi.transaction.getWalletTransactions({
    chain,
    address,
  });
  return { transactions };
}

async function getNativeBalance() {
  const balance = await Moralis.EvmApi.balance.getNativeBalance({
    chain,
    address,
  });
  return { balance };
}

async function getERC20TokensBalance() {
  const balance = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain,
    address,
  });
  return { balance };
}

const startServer = async () => {
  await Moralis.start({
    apiKey,
  });

  app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
  });
};

startServer();
