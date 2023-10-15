const shortenAddress = (address: string, chars = 6) => {
  return address
    ? `${address.substring(0, chars + 2)}...${address.substring(
        address.length - chars
      )}`
    : "";
};

export default shortenAddress;
