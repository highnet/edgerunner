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

	const [_walletAddress, setWalletAddress] = useState(null);

	const [_ethBalance, setEthBalance] = useState(null);
	const [_ethBalanceInUsd, setEthBalanceInUsd] = useState(null);
	const [_ethPriceInUsd, setEthPriceInUsd] = useState(null);

	const [_usdcBalance, setUsdcBalance] = useState(null);
	const [_usdcBalanceInUsd, setUsdcBalanceInUsd] = useState(null);
	const [_usdcPriceInUsd, setUsdcPriceInUsd] = useState(null);

	const [_usdtBalance, setUsdtBalance] = useState(null);
	const [_usdtBalanceInUsd, setUsdtBalanceInUsd] = useState(null);
	const [_usdtPriceInUsd, setUsdtPriceInUsd] = useState(null);

	const [_daiBalance, setDaiBalance] = useState(null);
	const [_daiBalanceInUsd, setDaiBalanceInUsd] = useState(null);
	const [_daiPriceInUsd, setDaiPriceInUsd] = useState(null);

	const [_shibBalance, setShibBalance] = useState(null);
	const [_shibBalanceInUsd, setShibBalanceInUsd] = useState(null);
	const [_shibPriceInUsd, setShibPriceInUsd] = useState(null);

	const [_pepeBalance, setPepeBalance] = useState(null);
	const [_pepeBalanceInUsd, setPepeBalanceInUsd] = useState(null);
	const [_pepePriceInUsd, setPepePriceInUsd] = useState(null);

	const [_usdcPriceInUsdt, setUsdcPriceInUsdt] = useState(null);
	const [_usdcPriceInDai, setUsdcPriceInDai] = useState(null);
	const [_usdcPriceInShib, setUsdcPriceInShib] = useState(null);
	const [_usdcPriceInPepe, setUsdcPriceInPepe] = useState(null);
	const [_usdtPriceInDai, setUsdtPriceInDai] = useState(null);
	const [_usdtPriceInShib, setUsdtPriceInShib] = useState(null);
	const [_usdtPriceInPepe, setUsdtPriceInPepe] = useState(null);
	const [_daiPriceInShib, setDaiPriceInShib] = useState(null);
	const [_daiPriceInPepe, setDaiPriceInPepe] = useState(null);
	const [_shibPriceInPepe, setShibPriceInPepe] = useState(null);

	async function getEthPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
		);
		const data = await response.json();
		return data.ethereum.usd;
	}

	async function getUsdcPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd"
		);
		const data = await response.json();
		return data["usd-coin"].usd;
	}

	async function getUsdtPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd"
		);
		const data = await response.json();
		return data.tether.usd;
	}

	async function getDaiPrice() {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd"
		);
		const data = await response.json();
		return data.dai.usd;
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
		async function processChainData() {
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
			const usdcPrice = await getUsdcPrice();
			setUsdcPriceInUsd(usdcPrice);
			setUsdcBalance(usdcBalance.toString());
			setUsdcBalanceInUsd((Number(usdcBalance) * usdcPrice).toString());

			const usdtContract = new ethers.Contract(
				USDT_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const usdtBalance = await usdtContract.balanceOf(_signer.getAddress());
			const usdtPrice = await getUsdtPrice();
			setUsdtPriceInUsd(usdtPrice);
			setUsdtBalance(usdtBalance.toString());
			setUsdtBalanceInUsd((Number(usdtBalance) * usdtPrice).toString());

			const daiContract = new ethers.Contract(
				DAI_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const daiBalance = await daiContract.balanceOf(_signer.getAddress());
			const daiPrice = await getDaiPrice();
			setDaiPriceInUsd(daiPrice);
			setDaiBalance(daiBalance.toString());
			setDaiBalanceInUsd((Number(daiBalance) * daiPrice).toString());

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

			const usdcPriceInUsdt = usdcPrice / usdtPrice;
			setUsdcPriceInUsdt(usdcPriceInUsdt);

			const usdcPriceInDai = usdcPrice / daiPrice;
			setUsdcPriceInDai(usdcPriceInDai);

			const usdcPriceInShib = usdcPrice / shibPrice;
			setUsdcPriceInShib(usdcPriceInShib);

			const usdcPriceInPepe = usdcPrice / pepePrice;
			setUsdcPriceInPepe(usdcPriceInPepe);

			const usdtPriceInDai = usdtPrice / daiPrice;
			setUsdtPriceInDai(usdtPriceInDai);

			const usdtPriceInShib = usdtPrice / shibPrice;
			setUsdtPriceInShib(usdtPriceInShib);

			const usdtPriceInPepe = usdtPrice / pepePrice;
			setUsdtPriceInPepe(usdtPriceInPepe);

			const daiPriceInShib = daiPrice / shibPrice;
			setDaiPriceInShib(daiPriceInShib);

			const daiPriceInPepe = daiPrice / pepePrice;
			setDaiPriceInPepe(daiPriceInPepe);

			const shibPriceInPepe = shibPrice / pepePrice;
			setShibPriceInPepe(shibPriceInPepe);
		}

		if (_signer !== null && _provider !== null) {
			processChainData();
		}
	}, [_signer, _provider]);

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
								<Typography>Current ETH Price:</Typography>

								{_ethPriceInUsd !== null && (
									<Typography>${_ethPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>Your ETH Balance:</Typography>
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
								<Typography>Current USDC Price:</Typography>
								{_usdcPriceInUsd !== null && (
									<Typography>${_usdcPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>Your USDC Balance: </Typography>
								{_usdcBalance !== null && (
									<Typography>{_usdcBalance}</Typography>
								)}
								<Typography>USDC</Typography>
								{_usdcBalanceInUsd !== null && (
									<Typography>
										($
										{(_usdcBalanceInUsd / 1000000).toLocaleString("en-US", {
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
								<Typography>Current USDT Price:</Typography>
								{_usdtPriceInUsd !== null && (
									<Typography>${_usdtPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>Your USDT Balance: </Typography>
								{_usdcBalance !== null && (
									<Typography>{_usdtBalance}</Typography>
								)}
								<Typography>USDT</Typography>
								{_usdtBalanceInUsd !== null && (
									<Typography>
										($
										{(_usdtBalanceInUsd / 1000000).toLocaleString("en-US", {
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
								<Typography>Current DAI Price:</Typography>
								{_daiPriceInUsd !== null && (
									<Typography>${_daiPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>Your DAI Balance:</Typography>
								{_daiBalance !== null && <Typography>{_daiBalance}</Typography>}
								<Typography>DAI</Typography>
								{_daiBalanceInUsd !== null && (
									<Typography>
										($
										{(_daiBalanceInUsd / 1000000).toLocaleString("en-US", {
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
								<Typography>Current SHIB Price:</Typography>
								{_shibPriceInUsd !== null && (
									<Typography>${_shibPriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>Your SHIB Balance:</Typography>
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
						<div className="hero-section">
							<div className="hero-item">
								<Typography>Current PEPE Price:</Typography>
								{_pepePriceInUsd !== null && (
									<Typography>${_pepePriceInUsd}</Typography>
								)}
							</div>
							<div className="hero-item">
								<div className="hero-item">
									<Typography>Your PEPE Balance:</Typography>
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
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>USDC/USDT:</Typography>
								{_usdcPriceInUsdt !== null && (
									<Typography>{_usdcPriceInUsdt}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDC/DAI:</Typography>
								{_usdcPriceInDai !== null && (
									<Typography>{_usdcPriceInDai}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDC/SHIB:</Typography>
								{_usdcPriceInShib !== null && (
									<Typography>{_usdcPriceInShib}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDC/PEPE:</Typography>
								{_usdcPriceInPepe !== null && (
									<Typography>{_usdcPriceInPepe}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>USDT/DAI:</Typography>
								{_usdtPriceInDai !== null && (
									<Typography>{_usdtPriceInDai}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDT/SHIB:</Typography>
								{_usdtPriceInShib !== null && (
									<Typography>{_usdtPriceInShib}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDT/PEPE:</Typography>
								{_usdtPriceInPepe !== null && (
									<Typography>{_usdtPriceInPepe}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>DAI/SHIB:</Typography>
								{_daiPriceInShib !== null && (
									<Typography>{_daiPriceInShib}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>DAI/PEPE:</Typography>
								{_daiPriceInPepe !== null && (
									<Typography>{_daiPriceInPepe}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>SHIB/PEPE:</Typography>
								{_shibPriceInPepe !== null && (
									<Typography>{_shibPriceInPepe}</Typography>
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
