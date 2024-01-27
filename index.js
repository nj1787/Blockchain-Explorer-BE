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

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Blockchain Explorer</h1>");
});

app.get("/demo", async (req, res) => {
  try {
    const data = await getDemoData();
    res.status(200);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      error: error.message,
    });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey,
  });

  app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
  });
};

async function getDemoData() {
  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    address,
    chain,
  });

  const native = nativeBalance.result.balance.ether;

  return { native };
}

startServer();
