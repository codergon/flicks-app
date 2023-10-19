const shortenAddress = (address: string, chars = 6, equal = false) => {
  return address
    ? `${address.substring(0, chars + 2)}...${address.substring(
        address.length - (!equal ? chars : chars + 2)
      )}`
    : "";
};

export default shortenAddress;
