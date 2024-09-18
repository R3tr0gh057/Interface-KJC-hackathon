import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import bgGradient from "../assets/bg-gradient.svg";
import { checkEmailDetails } from "../scripts/lib.js";
import { useState } from "react";

export default function Home() {
	const [data, setData] = useState({ breaches: [] }); // Initialize with default empty breaches array

	const handleSubmit = async (event) => {
		event.preventDefault();

		const output = await checkEmailDetails(event.target[0].value);
		setData(output || { breaches: [] }); // Ensure data is not null
	};

	return (
		<>
			<NavBar />
			<div className="w-full h-screen flex flex-col items-start justify-center px-32 relative bg-hero_gradient bg-cover">
				<h1 className="dm-sans text-6xl font-medium w-2/5 h-fit mb-10 leading-snug">
					Is your
					<div className="text-[#697EFF]">Data Security</div> up-to-date ?
				</h1>
				<SearchBar handleSubmit={handleSubmit} />
				<div className="w-1/2 absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center dm-sans">
					<p className="text-2xl mb-5">All checks are performed securely and no sensitive data is stored.</p>
					<p className="text-[#5A6474]">
						We help you discover if your email has been part of a data breach. By entering your email, you can see whether it was exposed in any known breaches, helping you take action to secure your accounts.
					</p>
				</div>
			</div>
			<div className="dm-sans w-screen h-screen px-32  bg-[#F5F5F5] flex flex-col items-center justify-center">
				<h2 className="text-4xl font-bold">Report</h2>
				<p className={`text-3xl font-bold ${data.numberOfBreaches > 0 ? "text-[#F23834]" : "text-green-500"}`}>{data.numberOfBreaches > 0 ? "You've been breached." : "You're safe!"}</p>{" "}
				<div>
					<p>no of breaches found: {data.numberOfBreaches}</p>
				</div>
				{data && (
					<div className="h-[50vh] dm-sans overflow-auto px-10 py-10 bg-white shadow-lg">
						{data.breaches.map((breach, index) => (
							<>
								<div key={index} className="breach-item">
									<h3 className="font-bold text-3xl">{breach.breach}</h3>
									<div className="flex items-center justify-center">
										<p className="font-bold text-[#616161]">{breach.details}</p>
										<img src={breach.logo} className="w-2/5" alt={`${breach.breach} logo`} />
									</div>
								</div>
								<span className="w-full h-2 bg-[#B0B0B0]"></span>
							</>
						))}
					</div>
				)}
			</div>
		</>
	);
}
