"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const js_sdk_1 = require("@0xpolygonid/js-sdk");
const rhsUrl = process.env.RHS_URL;
const rpcUrl = process.env.RPC_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;
const walletKey = process.env.WALLET_KEY;
const circuitsFolder = process.env.CIRCUITS_PATH;

const app = express();
const port = 6969;

app.use(express.json());
app.use(cors());

async function identityCreate(seedP) {
  //Initialize DataStorage
  const dataStorage = {
    credential: new js_sdk_1.CredentialStorage(
      new js_sdk_1.InMemoryDataSource()
    ),
    identity: new js_sdk_1.IdentityStorage(
      new js_sdk_1.InMemoryDataSource(),
      new js_sdk_1.InMemoryDataSource()
    ),
    mt: new js_sdk_1.InMemoryMerkleTreeStorage(40),
    states: new js_sdk_1.EthStateStorage(js_sdk_1.defaultEthConnectionConfig),
  };
  //Initialize CredentialWallet and IdentityWallet
  const memoryKeyStore = new js_sdk_1.InMemoryPrivateKeyStore();
  const bjjProvider = new js_sdk_1.BjjProvider(
    js_sdk_1.KmsKeyType.BabyJubJub,
    memoryKeyStore
  );
  const kms = new js_sdk_1.KMS();
  kms.registerKeyProvider(js_sdk_1.KmsKeyType.BabyJubJub, bjjProvider);
  const statusRegistry = new js_sdk_1.CredentialStatusResolverRegistry();
  statusRegistry.register(
    js_sdk_1.CredentialStatusType.SparseMerkleTreeProof,
    new js_sdk_1.IssuerResolver()
  );
  statusRegistry.register(
    js_sdk_1.CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
    new js_sdk_1.RHSResolver(dataStorage.states)
  );
  const credWallet = new js_sdk_1.CredentialWallet(dataStorage, statusRegistry);
  const wallet = new js_sdk_1.IdentityWallet(kms, dataStorage, credWallet);
  //create the did using seedphrase
  const encoder = new TextEncoder();
  const seedPhrase = encoder.encode(seedP);
  const { did, credential } = await wallet.createIdentity({
    method: js_sdk_1.core.DidMethod.Iden3,
    blockchain: js_sdk_1.core.Blockchain.Polygon,
    networkId: js_sdk_1.core.NetworkId.Mumbai,
    seed: seedPhrase,
    revocationOpts: {
      type: js_sdk_1.CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
      id: "https://rhs-staging.polygonid.me",
    },
  });
  return did.toString();
  //----------------------identity created-------------------
}


app.post('/process', async (req, res) => {
    const inputString = req.body.inputString; // Access the input string from the request body
  
    try {
      // Simulate an asynchronous processing function with a delay
    did = await identityCreate(inputString);
      res.json({ did });
    } catch (error) {
      console.error('Error occurred during processing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  

// async function main() {
//   await identityCreate();
// }
// (async function () {
//   await main();
// })();
// //# sourceMappingURL=index.js.map
