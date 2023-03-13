import FungibleToken from "FungibleToken"
import FiatToken from "FiatToken"
import SwapInterfaces from "SwapInterfaces"

access(all) contract DCAdd {
    pub var dcaDict: {Address: DCA}

    pub var inputVault: @FungibleToken.Vault

    pub var pairCapability: Capability<&{SwapInterfaces.PairPublic}>
    
    pub fun process(addr: Address, feeCapability: Capability<&{FungibleToken.Receiver}>){
        var currentTime = getCurrentBlock().timestamp
        var dca = self.dcaDict[addr]!

        var elapsedTime = currentTime - dca.lastUpdated
        var perSec = dca.total / (dca.endTime - dca.startTime)
        var accumulatedAmount = perSec* elapsedTime

        var vaultIn <- self.inputVault.withdraw(amount: accumulatedAmount*0.98)
        var feeVault <- self.inputVault.withdraw(amount: accumulatedAmount*0.02)
        var vaultOut <- self.pairCapability.borrow()!.swap(vaultIn: <-vaultIn, exactAmountOut: nil)

        feeCapability.borrow()!.deposit(from: <- feeVault)
        dca.outReceiver.borrow()!.deposit(from: <- vaultOut)

        dca.lastUpdated = currentTime
    }

    pub fun deposit(
        vault: @FungibleToken.Vault,
        endTime: UFix64,
        inReceiver: Capability<&{FungibleToken.Receiver}>,
        outReceiver: Capability<&{FungibleToken.Receiver}>
    ){
        var currentTime = getCurrentBlock().timestamp
        var amount = vault.balance
        self.inputVault.deposit(from: <- vault)

        self.dcaDict[inReceiver.address] = DCA(
                endTime: endTime,
                total: amount, 
                inReceiver: inReceiver, 
                outReceiver: outReceiver
            )
    }

    pub struct DCA{
        pub(set) var lastUpdated: UFix64
        pub(set) var total: UFix64
        pub(set) var startTime: UFix64
        pub(set) var endTime: UFix64
        pub var inReceiver: Capability<&{FungibleToken.Receiver}>
        pub var outReceiver: Capability<&{FungibleToken.Receiver}>

        init(
            endTime: UFix64, 
            total: UFix64,
            inReceiver: Capability<&{FungibleToken.Receiver}>,
            outReceiver: Capability<&{FungibleToken.Receiver}>
        ) {
            self.startTime = getCurrentBlock().timestamp
            self.endTime = endTime
            self.total = total
            self.lastUpdated = self.startTime
            self.inReceiver = inReceiver
            self.outReceiver = outReceiver
        }
    }

    pub init(
    ){
        self.dcaDict = {}
        self.pairCapability = getAccount(Address(0x3ab944e376d92ed8)).getCapability<&{SwapInterfaces.PairPublic}>(/public/increment_swap_pair)
        self.inputVault <- FiatToken.createEmptyVault()
    }

}

 