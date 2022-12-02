import { getDevnetId } from "../common/config-utils";

const shell = require("shelljs");

export async function terraformDestroy() {
    console.log("📍Executing terraform destroy...")
    require('dotenv').config({path: `${process.cwd()}/.env`})
    shell.exec(`terraform dumb -auto-approve`, {
        env: {
            ...process.env,
        }
    });
    if (shell.error() == null) {
        let devnetId = getDevnetId()
        console.log(`📍Deleting ./deployments/devnet-${devnetId} folder...`)
        shell.exec(`cd ../../ && rm -rf ./deployments/devnet-${devnetId}`)
        console.log(`📍devnet-${devnetId} successfully destroyed!`)
    }
}
