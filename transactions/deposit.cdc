import FungibleToken from "FUngibleToken"
import DCAdd from "DCAdd"

transaction(inPath: CapabilityPath, outPath: CapabilityPath, tokenInPath: StoragePath, duration: UFix64, amount: UFix64) {

  prepare(acct: AuthAccount) {
      var inReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(inPath)
      var outReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(outPath)
      var ownerProviderCapability = acct.borrow<&FungibleToken.Vault>(from: tokenInPath)
        		?? panic("Could not borrow reference to the owner's Vault!")
      var currentTime = getCurrentBlock().timestamp

      var vault <- ownerProviderCapability.withdraw(amount: amount)


      DCAdd.deposit(vault: <- vault,
        endTime: currentTime+duration,
        inReceiver: inReceiverCapability,
        outReceiver: outReceiverCapability)
  }

  execute {
  }
}
 