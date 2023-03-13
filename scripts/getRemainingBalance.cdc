import DCAdd from "DCAdd"

pub fun main(account: Address): UFix64 {
    var dca = DCAdd.dcaDict[account]!

    return dca.total * (dca.lastUpdated - dca.startTime) / (dca.endTime - dca.startTime)
}
 