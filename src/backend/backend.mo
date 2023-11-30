import Shared "mo:crypto/ethereum";

public func transferSepoliaETH(to: Text, amount: Nat) : async {
    let privateKey = Shared.PrivateKey.fromString(process.env.yourPrivateKey);

    let contractAddress = Shared.Address.fromString("0x865E12a0cDF8E9604A7C954623F7466Dc40A3239");

    let senderAddress = Shared.Address.fromString("0x2D0cCca38fd0fFc505014798b5C8a47A7a2152F4");

    let transaction = {
        to = Shared.Address.fromString(to);
        value = amount;
        gasLimit = 21000n; // Replace with appropriate gas limit
        gasPrice = 10_000_000_000n; // Replace with appropriate gas price
        nonce = await Shared.getNonce(senderAddress);
    };

    let signedTx = Shared.signTransaction(privateKey, contractAddress, transaction);

    let result = await Shared.sendTransaction(signedTx);
}

// Function to check Sepolia ETH balance
public func checkSepoliaETHBalance(address: Text) : async Nat {
    let targetAddress = Shared.Address.fromString(address);

    let contractAddress = Shared.Address.fromString("0x865E12a0cDF8E9604A7C954623F7466Dc40A3239");

    let balance = await Shared.getBalance(contractAddress, targetAddress);
    
    return balance;
}
