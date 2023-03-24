function formatAddress(address) {
  const walletAddress = address.toString();
  return `${walletAddress.substring(0, 5)}...${walletAddress.substring(38)}`;
}

export default formatAddress;
