import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Button from "trmd3components/Button";
import Typography from "trmd3components/Typography";

const USDC_CONTRACT_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

function App() {
	const [signer, setSigner] = useState(null);
	const [provider, setProvider] = useState(null);
	const [walletAddress, setWalletAddress] = useState(null);
	const [ethBalance, setEthBalance] = useState(null);
	const [ethBalanceInUsd, setEthBalanceInUsd] = useState(null);
	const [usdcBalance, setUsdcBalance] = useState(null);
	const [isConnectedToMetaMask, setIsConnectedToMetaMask] = useState(false);

	async function connectToMetaMask() {
		console.log("Connecting To MetaMask");
		if (window.ethereum == null) {
			setProvider(ethers.getDefaultProvider("homestead"));
			setIsConnectedToMetaMask(false);
		} else {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			setProvider(provider);
			setSigner(signer);
			setWalletAddress(await signer.getAddress());
			setIsConnectedToMetaMask(true);
		}
	}

	useEffect(() => {
		async function getBalances() {
			if (provider == null) {
				console.log("Provider is null; connect to MetaMask first");
				return;
			}
			const ethBalance = await provider.getBalance(signer.getAddress());
			const ethPrice = await getEthPrice();
			setEthBalanceInUsd((Number(ethBalance) * ethPrice).toString());
			setEthBalance(ethBalance.toString());

			const usdcContract = new ethers.Contract(
				USDC_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				provider
			);
			const usdcBalance = await usdcContract.balanceOf(signer.getAddress());
			setUsdcBalance(usdcBalance.toString());
		}

		if (signer !== null && provider !== null) {
			getBalances();
		}
	}, [signer, provider]);

	async function getEthPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
		);
		const data = await response.json();
		return data.ethereum.usd;
	}

	return (
		<>
			<div className="hero">
				<Typography>Welcome To Edgerunner!</Typography>
				{!isConnectedToMetaMask && (
					<Button onClick={connectToMetaMask}>Connect With MetaMask</Button>
				)}
				{isConnectedToMetaMask && (
					<>
						<div className="balance">
							<div className="balance-item">
								<Typography>Wallet Address:</Typography>
							</div>
							<div className="balance-item">
								{walletAddress !== null && (
									<Typography>{walletAddress}</Typography>
								)}
							</div>
						</div>
						<div className="balance">
							<div className="balance-item">
								<Typography>ETH balance:</Typography>
							</div>
							<div className="balance-item">
								{ethBalance !== null && <Typography>{ethBalance}</Typography>}
							</div>
							<div className="balance-item">
								<Typography>ETH</Typography>
							</div>
							<div className="balance-item">
								{ethBalanceInUsd !== null && (
									<Typography>
										($
										{(ethBalanceInUsd / 1000000).toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
										)
									</Typography>
								)}
							</div>
						</div>
						<div className="balance">
							<div className="balance-item">
								<Typography>USDC balance: </Typography>
							</div>
							{usdcBalance !== null && (
								<div className="balance-item">
									<Typography>
										$
										{(usdcBalance / 1000000).toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</Typography>
								</div>
							)}
							<div className="balance-item">
								<Typography>USDC</Typography>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
