import {pullAndRestartBor, pullAndRestartHeimdall} from "./update";
import {checkAndReturnVMIndex} from "../common/config-utils";

const yaml = require("js-yaml");
const fs = require("fs");
const {splitToArray} = require("../common/config-utils");

export async function restartAll(n) {

    let vmIndex = await checkAndReturnVMIndex(n)
    console.log("📍Will restart bor and heimdall")

    let doc = await yaml.load(fs.readFileSync('./configs/devnet/remote-setup-config.yaml', 'utf8'));
    let borUsers = splitToArray(doc['devnetBorUsers'].toString())
    let nodeIps = []
    let hostToIndexMap = new Map()
    let user, ip

    if (vmIndex === undefined) {
        for (let i = 0; i < doc['devnetBorHosts'].length; i++) {
            i === 0 ? user = `${doc['ethHostUser']}` : user = `${borUsers[i]}`
            ip = `${user}@${doc['devnetBorHosts'][i]}`
            nodeIps.push(ip)
            hostToIndexMap.set(ip, i)
        }

        let restartAllTasks = nodeIps.map(async(ip) => {
            await pullAndRestartBor(ip, hostToIndexMap.get(ip), false)
            await pullAndRestartHeimdall(ip, hostToIndexMap.get(ip), false)
        })

        await Promise.all(restartAllTasks)

    } else {
        vmIndex === 0 ? user = `${doc['ethHostUser']}` : user = `${borUsers[vmIndex]}`
        ip = `${user}@${doc['devnetBorHosts'][vmIndex]}`
        await pullAndRestartBor(ip, vmIndex, false)
        await pullAndRestartHeimdall(ip, vmIndex, false)
    }
}

export async function restartBor(n) {

    let vmIndex = await checkAndReturnVMIndex(n)
    console.log("📍Will restart bor")

    let doc = await yaml.load(fs.readFileSync('./configs/devnet/remote-setup-config.yaml', 'utf8'));
    let borUsers = splitToArray(doc['devnetBorUsers'].toString())
    let nodeIps = []
    let hostToIndexMap = new Map()
    let user, ip

    if (vmIndex === undefined) {
        for (let i = 0; i < doc['devnetBorHosts'].length; i++) {
            i === 0 ? user = `${doc['ethHostUser']}` : user = `${borUsers[i]}`
            ip = `${user}@${doc['devnetBorHosts'][i]}`
            nodeIps.push(ip)
            hostToIndexMap.set(ip, i)
        }

        let restartBorTasks = nodeIps.map(async(ip) => {
            await pullAndRestartBor(ip, hostToIndexMap.get(ip), false)
        })

        await Promise.all(restartBorTasks)

    } else {
        vmIndex === 0 ? user = `${doc['ethHostUser']}` : user = `${borUsers[vmIndex]}`
        ip = `${user}@${doc['devnetBorHosts'][vmIndex]}`
        await pullAndRestartBor(ip, vmIndex, false)
    }
}

export async function restartHeimdall(n) {

    let vmIndex = await checkAndReturnVMIndex(n)
    console.log("📍Will restart heimdall")

    let doc = await yaml.load(fs.readFileSync('./configs/devnet/remote-setup-config.yaml', 'utf8'));
    let borUsers = splitToArray(doc['devnetBorUsers'].toString())
    let nodeIps = []
    let hostToIndexMap = new Map()
    let user, ip

    if (vmIndex === undefined) {
        for (let i = 0; i < doc['devnetBorHosts'].length; i++) {
            i === 0 ? user = `${doc['ethHostUser']}` : user = `${borUsers[i]}`
            ip = `${user}@${doc['devnetBorHosts'][i]}`
            nodeIps.push(ip)
            hostToIndexMap.set(ip, i)
        }

        let restartHeimdallTasks = nodeIps.map(async(ip) => {
            await pullAndRestartHeimdall(ip, hostToIndexMap.get(ip), false)
        })

        await Promise.all(restartHeimdallTasks)
        
    } else {
        vmIndex === 0 ? user = `${doc['ethHostUser']}` : user = `${borUsers[vmIndex]}`
        ip = `${user}@${doc['devnetBorHosts'][vmIndex]}`
        await pullAndRestartHeimdall(ip, vmIndex, false)
    }
}
