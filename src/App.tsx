import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Button from "trmd3components/Button";
import Typography from "trmd3components/Typography";

const USDC_CONTRACT_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const USDT_CONTRACT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const DAI_CONTRACT_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const SHIB_CONTRACT_ADDRESS = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce";
const PEPE_CONTRACT_ADDRESS = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";

function App() {
	const [_signer, setSigner] = useState(null);
	const [_provider, setProvider] = useState(null);
	const [_isConnectedToMetaMask, setIsConnectedToMetaMask] = useState(false);
	const [_ethPriceInUsd, setEthPriceInUsd] = useState(null);
	const [_shibPriceInUsd, setShibPriceInUsd] = useState(null);
	const [_pepePriceInUsd, setPepePriceInUsd] = useState(null);
	const [_walletAddress, setWalletAddress] = useState(null);
	const [_ethBalance, setEthBalance] = useState(null);
	const [_ethBalanceInUsd, setEthBalanceInUsd] = useState(null);
	const [_usdcBalance, setUsdcBalance] = useState(null);
	const [_usdtBalance, setUsdtBalance] = useState(null);
	const [_daiBalance, setDaiBalance] = useState(null);
	const [_shibBalance, setShibBalance] = useState(null);
	const [_shibBalanceInUsd, setShibBalanceInUsd] = useState(null);
	const [_pepeBalance, setPepeBalance] = useState(null);
	const [_pepeBalanceInUsd, setPepeBalanceInUsd] = useState(null);

	async function connectToMetaMask() {
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
			if (_provider == null) {
				return;
			}

			const ethBalance = await _provider.getBalance(_signer.getAddress());
			const ethPrice = await getEthPrice();
			setEthPriceInUsd(ethPrice);
			setEthBalance(ethBalance.toString());
			setEthBalanceInUsd((Number(ethBalance) * ethPrice).toString());

			const usdcContract = new ethers.Contract(
				USDC_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const usdcBalance = await usdcContract.balanceOf(_signer.getAddress());
			setUsdcBalance(usdcBalance.toString());

			const usdtContract = new ethers.Contract(
				USDT_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);

			const usdtBalance = await usdtContract.balanceOf(_signer.getAddress());
			setUsdtBalance(usdtBalance.toString());

			const daiContract = new ethers.Contract(
				DAI_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const daiBalance = await daiContract.balanceOf(_signer.getAddress());
			setDaiBalance(daiBalance.toString());

			const shibContract = new ethers.Contract(
				SHIB_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const shibBalance = await shibContract.balanceOf(_signer.getAddress());
			const shibPrice = await getShibPrice();
			setShibPriceInUsd(shibPrice);
			setShibBalance(shibBalance.toString());
			setShibBalanceInUsd((Number(shibBalance) * shibPrice).toString());

			const pepeContract = new ethers.Contract(
				PEPE_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const pepeBalance = await pepeContract.balanceOf(_signer.getAddress());
			const pepePrice = await getPepePrice();
			setPepePriceInUsd(pepePrice);
			setPepeBalance(pepeBalance.toString());
			setPepeBalanceInUsd((Number(pepeBalance) * pepePrice).toString());
		}

		if (_signer !== null && _provider !== null) {
			getBalances();
		}
	}, [_signer, _provider]);

	async function getEthPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
		);
		const data = await response.json();
		return data.ethereum.usd;
	}

	async function getShibPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=shiba-inu&vs_currencies=usd"
		);
		const data = await response.json();
		return data["shiba-inu"].usd;
	}

	async function getPepePrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=pepe&vs_currencies=usd"
		);
		const data = await response.json();
		return data["pepe"].usd;
	}

	return (
		<>
			<div className="hero">
				<div className="hero-section">
					<Typography>Welcome To Edgerunner!</Typography>
				</div>
				{!_isConnectedToMetaMask && (
					<Button onClick={connectToMetaMask}>Connect With MetaMask</Button>
				)}
				{_isConnectedToMetaMask && (
					<>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>Wallet Address:</Typography>
								{_walletAddress !== null && (
									<Typography>{_walletAddress}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>ETH Price:</Typography>

								{_ethPriceInUsd !== null && (
									<Typography>${_ethPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>ETH Balance:</Typography>
								{_ethBalance !== null && <Typography>{_ethBalance}</Typography>}
								<Typography>ETH</Typography>
								{_ethBalanceInUsd !== null && (
									<Typography>
										($
										{(_ethBalanceInUsd / 1000000).toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
										)
									</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>USDC Balance: </Typography>
								{_usdcBalance !== null && (
									<Typography>
										$
										{(_usdcBalance / 1000000).toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</Typography>
								)}
								<Typography>USDC</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>USDT Balance: </Typography>
								<Typography>
									$
									{(_usdtBalance / 1000000).toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</Typography>
								<Typography>USDT</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>DAI Balance:</Typography>
								<Typography>
									$
									{(_daiBalance / 1000000).toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</Typography>
								<Typography>DAI</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>SHIB Price:</Typography>
								{_shibPriceInUsd !== null && (
									<Typography>${_shibPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>SHIB Balance:</Typography>
								{_shibBalance !== null && (
									<Typography>{_shibBalance}</Typography>
								)}
								<Typography>SHIB</Typography>
								{_shibBalanceInUsd !== null && (
									<Typography>
										($
										{(_shibBalanceInUsd / 1000000).toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
										)
									</Typography>
								)}
							</div>
						</div>
						<div className="hero-item">
							<Typography>PEPE Price:</Typography>
							{_pepePriceInUsd !== null && (
								<Typography>${_pepePriceInUsd}</Typography>
							)}
						</div>
						<div className="hero-item">
							<div className="hero-item">
								<Typography>PEPE Balance:</Typography>
								{_pepeBalance !== null && (
									<Typography>{_pepeBalance}</Typography>
								)}
								<Typography>PEPE</Typography>
								{_pepeBalanceInUsd !== null && (
									<Typography>
										($
										{(_pepeBalanceInUsd / 1000000).toLocaleString("en-US", {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
										)
									</Typography>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default App;
