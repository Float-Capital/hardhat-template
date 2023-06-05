import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { Greeter } from "../types/Greeter";

task("task:setGreeting")
  .addParam("greeting", "Say hello, be nice")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    let { ethers, deployments } = hre;

    let Greeter = await deployments.get("Greeter");

    const signers: SignerWithAddress[] = await ethers.getSigners();

    const greeter = <Greeter>await ethers.getContractAt("Greeter", Greeter.address);

    await greeter.connect(signers[taskArguments.account]).setGreeting(taskArguments.greeting);

    console.log("Greeting set: ", taskArguments.greeting);
  });
