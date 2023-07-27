import {ethers} from "ethers";
import {useEffect, useState} from "react";
import Button from "trmd3components/Button";
import Typography from "trmd3components/Typography";

const USDC_CONTRACT_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const USDT_CONTRACT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const DAI_CONTRACT_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const SHIB_CONTRACT_ADDRESS = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce";
const PEPE_CONTRACT_ADDRESS = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";

const USDC_USDT_PAIR_CONTRACT_ADDRESS =
	"0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f";
const USDC_DAI_PAIR_CONTRACT_ADDRESS =
	"0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5";
const USDC_SHIB_PAIR_CONTRACT_ADDRESS =
	"0x881d5c98866a08f90A6F60E3F94f0e461093D049";
const USDC_PEPE_PAIR_CONTRACT_ADDRESS =
	"0x5A75ed4624BbDA1e992dd006Ea2Aca83d64C30fb";
const USDT_DAI_PAIR_CONTRACT_ADDRESS =
	"0xB20bd5D04BE54f870D5C0d3cA85d82b34B836405";
const USDT_SHIB_PAIR_CONTRACT_ADDRESS =
	"0x773dD321873fe70553ACC295b1b49A104d968CC8";
const DAI_SHIB_PAIR_CONTRACT_ADDRESS =
	"0x4e6e41306C7Ef6E53eCdb34e3155C73fCb7869F3";
const SHIB_PEPE_PAIR_CONTRACT_ADDRESS =
	"0xe19abcDD64001fb4CAd9e456Efa366e07b3894a2";

function App() {
	const [_signer, setSigner] = useState(null);
	const [_provider, setProvider] = useState(null);

	const [_isConnectedToMetaMask, setIsConnectedToMetaMask] = useState(false);

	const [_walletAddress, setWalletAddress] = useState(null);

	const [_ethBalance, setEthBalance] = useState(null);

	const [_usdcBalance, setUsdcBalance] = useState(null);

	const [_usdtBalance, setUsdtBalance] = useState(null);

	const [_daiBalance, setDaiBalance] = useState(null);

	const [_shibBalance, setShibBalance] = useState(null);

	const [_pepeBalance, setPepeBalance] = useState(null);

	const [_UsdcUsdtPair, setUsdcUsdtPair] = useState(null);
	const [_UsdcDaiPair, setUsdcDaiPair] = useState(null);
	const [_UsdcShibPair, setUsdcShibPair] = useState(null);
	const [_UsdcPepePair, setUsdcPepePair] = useState(null);

	const [_UsdtDaiPair, setUsdtDaiPair] = useState(null);
	const [_UsdtShibPair, setUsdtShibPair] = useState(null);

	const [_DaiShibPair, setDaiShibPair] = useState(null);

	const [_ShibPepePair, setShibPepePair] = useState(null);

	async function getUsdcUsdtPair() {
		const UniswapV2Pair = new ethers.Contract(
			USDC_USDT_PAIR_CONTRACT_ADDRESS, // This is the address for the USDC/USDT pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const usdcPrecision = 6; // USDC precision (6 decimal places)
		const usdtPrecision = 6; // USDT precision (6 decimal places)

		const USDC_USDT_Price =
			Number(reserve1) /
			10 ** usdtPrecision /
			(Number(reserve0) / 10 ** usdcPrecision);

		return USDC_USDT_Price;
	}

	async function getUsdcDaiPair() {
		const UniswapV2Pair = new ethers.Contract(
			USDC_DAI_PAIR_CONTRACT_ADDRESS, // This is the address for the DAI/USDC pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const daiPrecision = 18; // Dai precision (18 decimal places)
		const usdcPrecision = 6; // USDC precision (6 decimal places)

		const USDC_DAI_Price =
			Number(reserve1) /
			10 ** usdcPrecision /
			(Number(reserve0) / 10 ** daiPrecision);

		return USDC_DAI_Price;
	}

	async function getUsdcShibPair() {
		const UniswapV2Pair = new ethers.Contract(
			USDC_SHIB_PAIR_CONTRACT_ADDRESS, // This is the address for the SHIB/USDC pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const shibPrecision = 18; // Shib precision (18 decimal places)
		const usdcPrecision = 6; // USDC precision (6 decimal places)

		const USDC_SHIB_Price =
			Number(reserve0) /
			10 ** shibPrecision /
			(Number(reserve1) / 10 ** usdcPrecision);

		return USDC_SHIB_Price;
	}

	async function getUsdcPepePair() {
		const UniswapV2Pair = new ethers.Contract(
			USDC_PEPE_PAIR_CONTRACT_ADDRESS, // This is the address for the PEPE/USDC pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const pepePrecision = 18; // PEPE precision (18 decimal places)
		const usdcPrecision = 6; // USDC precision (6 decimal places)

		const USDC_PEPE_Price =
			Number(reserve0) /
			10 ** pepePrecision /
			(Number(reserve1) / 10 ** usdcPrecision);

		return USDC_PEPE_Price;
	}

	async function getUsdtDaiPair() {
		const UniswapV2Pair = new ethers.Contract(
			USDT_DAI_PAIR_CONTRACT_ADDRESS, // This is the address for the USDT/DAI pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const daiPrecision = 18; // DAI precision (18 decimal places)
		const usdtPrecision = 6; // USDT precision (6 decimal places)

		const USDT_DAI_Price =
			Number(reserve0) /
			10 ** daiPrecision /
			(Number(reserve1) / 10 ** usdtPrecision);

		return USDT_DAI_Price;
	}

	async function getUsdtShibPair() {
		const UniswapV2Pair = new ethers.Contract(
			USDT_SHIB_PAIR_CONTRACT_ADDRESS, // This is the address for the USDT/SHIB pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const shibPrecision = 18; // SHIB precision (18 decimal places)
		const usdtPrecision = 6; // USDT precision (6 decimal places)

		const USDT_SHIB_Price =
			Number(reserve0) /
			10 ** shibPrecision /
			(Number(reserve1) / 10 ** usdtPrecision);

		return USDT_SHIB_Price;
	}

	async function getDaiShibPair() {
		const UniswapV2Pair = new ethers.Contract(
			DAI_SHIB_PAIR_CONTRACT_ADDRESS, // This is the address for the DAI/SHIB pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const shibPrecision = 18; // SHIB precision (18 decimal places)
		const daiPrecision = 18; // DAI precision (18 decimal places)

		const DAI_SHIB_Price =
			Number(reserve1) /
			10 ** shibPrecision /
			(Number(reserve0) / 10 ** daiPrecision);

		return DAI_SHIB_Price;
	}

	async function getShibPepePair() {
		const UniswapV2Pair = new ethers.Contract(
			SHIB_PEPE_PAIR_CONTRACT_ADDRESS, // This is the address for the SHIB/PEPE pair on UniswapV2
			[
				"function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
			],
			_provider
		);

		const [reserve0, reserve1] = await UniswapV2Pair.getReserves();

		const shibPrecision = 18; // SHIB precision (18 decimal places)
		const pepePrecision = 18; // PEPE precision (18 decimal places)

		const SHIB_PEPE_Price =
			Number(reserve0) /
			10 ** shibPrecision /
			(Number(reserve1) / 10 ** pepePrecision);

		return SHIB_PEPE_Price;
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
			const finalEthBalance = Number(ethBalance) / 10 ** 18;
			setEthBalance(finalEthBalance.toString());

			const usdcContract = new ethers.Contract(
				USDC_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const usdcBalance = await usdcContract.balanceOf(_signer.getAddress());
			const finalUsdcBalance = Number(usdcBalance) / 10 ** 6;
			setUsdcBalance(finalUsdcBalance.toString());

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
			const finalDaiBalance = Number(daiBalance) / 10 ** 18;
			setDaiBalance(finalDaiBalance.toString());

			const shibContract = new ethers.Contract(
				SHIB_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const shibBalance = await shibContract.balanceOf(_signer.getAddress());
			const finalShibBalance = Number(shibBalance) / 10 ** 18;
			setShibBalance(finalShibBalance.toString());

			const pepeContract = new ethers.Contract(
				PEPE_CONTRACT_ADDRESS,
				["function balanceOf(address) view returns (uint256)"],
				_provider
			);
			const pepeBalance = await pepeContract.balanceOf(_signer.getAddress());
			const finalPepeBalance = Number(pepeBalance) / 10 ** 18;
			setPepeBalance(finalPepeBalance.toString());

			const usdcUsdtPair = await getUsdcUsdtPair();
			setUsdcUsdtPair(usdcUsdtPair);

			const usdcDaiPair = await getUsdcDaiPair();
			setUsdcDaiPair(usdcDaiPair);

			const usdcShibPair = await getUsdcShibPair();
			setUsdcShibPair(usdcShibPair);

			const usdcPepePair = await getUsdcPepePair();
			setUsdcPepePair(usdcPepePair);

			const usdtDaiPair = await getUsdtDaiPair();
			setUsdtDaiPair(usdtDaiPair);

			const usdtShibPair = await getUsdtShibPair();
			setUsdtShibPair(usdtShibPair);

			const daiShibPair = await getDaiShibPair();
			setDaiShibPair(daiShibPair);

			const shibPepePair = await getShibPepePair();
			setShibPepePair(shibPepePair);
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
								<Typography>Your ETH Balance:</Typography>
								{_ethBalance !== null && <Typography>{_ethBalance}</Typography>}
								<Typography>ETH</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>Your USDC Balance: </Typography>
								{_usdcBalance !== null && (
									<Typography>{_usdcBalance}</Typography>
								)}
								<Typography>USDC</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>Your USDT Balance: </Typography>
								{_usdcBalance !== null && (
									<Typography>{_usdtBalance}</Typography>
								)}
								<Typography>USDT</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>Your DAI Balance:</Typography>
								{_daiBalance !== null && <Typography>{_daiBalance}</Typography>}
								<Typography>DAI</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>Your SHIB Balance:</Typography>
								{_shibBalance !== null && (
									<Typography>{_shibBalance}</Typography>
								)}
								<Typography>SHIB</Typography>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<div className="hero-item">
									<Typography>Your PEPE Balance:</Typography>
									{_pepeBalance !== null && (
										<Typography>{_pepeBalance}</Typography>
									)}
									<Typography>PEPE</Typography>
								</div>
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>USDC/USDT:</Typography>
								{_UsdcUsdtPair !== null && (
									<Typography>{_UsdcUsdtPair}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDC/DAI:</Typography>
								{_UsdcDaiPair !== null && (
									<Typography>{_UsdcDaiPair}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDC/SHIB:</Typography>
								{_UsdcShibPair !== null && (
									<Typography>{_UsdcShibPair}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDC/PEPE:</Typography>
								{_UsdcPepePair !== null && (
									<Typography>{_UsdcPepePair}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>USDT/DAI:</Typography>
								{_UsdtDaiPair !== null && (
									<Typography>{_UsdtDaiPair}</Typography>
								)}
							</div>
							<div className="hero-item">
								<Typography>USDT/SHIB:</Typography>
								{_UsdtShibPair !== null && (
									<Typography>{_UsdtShibPair}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>DAI/SHIB:</Typography>
								{_DaiShibPair !== null && (
									<Typography>{_DaiShibPair}</Typography>
								)}
							</div>
						</div>
						<div className="hero-section">
							<div className="hero-item">
								<Typography>SHIB/PEPE:</Typography>
								{_ShibPepePair !== null && (
									<Typography>{_ShibPepePair}</Typography>
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
