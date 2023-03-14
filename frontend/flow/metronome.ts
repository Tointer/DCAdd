// @ts-expect-error: no typing
import * as fcl from "@onflow/fcl";

export const setupDCA = async (duration: string, amount: string) => {
  console.log({ duration, amount });
  const transactionId = await fcl.mutate({
    cadence: `
    import FungibleToken from 0xFungibleToken
    import DCAdd from 0xMetronome
    import FiatToken from 0xUsdcToken
    
    transaction(duration: UFix64, amount: UFix64) {
    
      prepare(acct: AuthAccount) {
          var inReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(FiatToken.VaultReceiverPubPath)
          var outReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
          var ownerProviderCapability = acct.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
                ?? panic("Could not borrow reference to the owner's Vault!")
          var currentTime = getCurrentBlock().timestamp
    
          var vault <- ownerProviderCapability.withdraw(amount: amount)
    
    
          DCAdd.deposit(vault: <- vault,
            endTime: currentTime+duration,
            inReceiver: inReceiverCapability,
            outReceiver: outReceiverCapability)
      }
    }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    args: (arg: any, t: any) => [
      arg(duration, t.UFix64),
      arg(amount, t.UFix64),
    ],
    limit: 9999,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const getRemainingBalance = async (account: string) => {
  try {
    const remainingBalance = await fcl.query({
      cadence: `
      import DCAdd from 0xMetronome

      pub fun main(account: Address): UFix64 {
          var dca = DCAdd.dcaDict[account]!

          return dca.total * (1.0 - (dca.lastUpdated - dca.startTime) / (dca.endTime - dca.startTime))
      }
      
    `,
      args: (arg: any, t: any) => [arg(account, t.Address)],
    });
    return remainingBalance;
  } catch {
    return [];
  }
};
