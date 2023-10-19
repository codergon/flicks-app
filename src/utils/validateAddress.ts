import { PublicKey } from "@solana/web3.js";

const validateSolanaAddress = (addr: string) => {
  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(addr);
    return PublicKey.isOnCurve(publicKey.toBytes());
  } catch (err) {
    return false;
  }
};

export default validateSolanaAddress;
