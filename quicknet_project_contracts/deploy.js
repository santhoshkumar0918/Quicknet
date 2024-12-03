import { RpcProvider, Account, Contract, json, stark, uint256, shortString, CallData} from 'starknet';
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

async function setUpAccountAndProvider() {
    const provider = new RpcProvider({ nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7' });
    const privateKey = process.env.ACCOUNT_PRIVATE_KEY;
    const accountAddress= '0x06228e3a3a8fe69244c0799535d79b207de9d46cf452092ff1c99f9c34caee3f';
    const account = new Account(provider, accountAddress, privateKey);
    const compiledSierra = json.parse(
        fs.readFileSync("target/dev/quicknet_project_contracts_FieldFactory.contract_class.json")
          .toString("ascii")
    );
    const compiledCasm = json.parse(
        fs.readFileSync("target/dev/quicknet_project_contracts_FieldFactory.compiled_contract_class.json")
          .toString("ascii")
    );

    return { provider, account, compiledSierra, compiledCasm };
}

async function declareAndDeploy() {

    const { provider, account, compiledSierra, compiledCasm } = await setUpAccountAndProvider();
    const deployResponse = await account.declareAndDeploy({
    contract: compiledSierra,
    casm: compiledCasm,
    });

    // Connect the new contract instance:
    const contract = new Contract(
        compiledSierra.abi,
        deployResponse.deploy.contract_address,
        provider
    );
    console.log('Test Contract Class Hash =', deployResponse.declare.class_hash);
    console.log('✅ Test Contract connected at =', contract.address);
}

async function declare() {
    const { provider, account, compiledSierra, compiledCasm } = await setUpAccountAndProvider();

    const declareResponse = await account.declare({
        contract: compiledSierra,
        casm: compiledCasm,
      });
      console.log('Test Contract declared with classHash =', declareResponse.class_hash);
      await provider.waitForTransaction(declareResponse.transaction_hash);
}

async function deploy() {
    const { provider, account } = await setUpAccountAndProvider();

    const testClassHash = '0x589f5f85065707762f3ed8bedff113f52183d008391bc15354e541770cc5c0';

    const deployResponse = await account.deployContract({ classHash: testClassHash });
    await provider.waitForTransaction(deployResponse.transaction_hash);
    const { abi: testAbi } = await provider.getClassByHash(testClassHash);
    if (testAbi === undefined) {
        throw new Error('no abi.');
    }
    const contract = new Contract(testAbi, deployResponse.contract_address, provider);
    console.log('✅ Test Contract connected at =', contract.address);
}

async function main() {
    const { provider, account, compiledSierra, compiledCasm } = await setUpAccountAndProvider();
    console.log('Account and provider set up successfully');

        await declare();
    }
  
  main();
