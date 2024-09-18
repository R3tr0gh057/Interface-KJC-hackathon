import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import bgGradient from "../assets/bg-gradient.svg";
import { Link } from "react-router-dom";
import { checkDomain } from "../scripts/lib";
import { useState } from "react";

export default function DomainSearch() {
	const [domainResult, setDomainResult] = useState(null); // State to store the result

	const handleSubmit = async (event) => {
		event.preventDefault();
		const domain = event.target[0].value;

		const result = await checkDomain(domain);
		console.log(result) // Fetch domain breach result
		setDomainResult(result); // Set result in state
	};

	return (
		<>
			<NavBar />
			<div className="w-full h-screen flex flex-col items-start justify-center px-32 relative bg-hero_gradient bg-cover">
				<h1 className="dm-sans text-6xl font-medium w-2/5 h-fit mb-10 leading-snug">
					Search the
					<div className="text-[#697EFF]">Domain</div> below
				</h1>
				<SearchBar handleSubmit={handleSubmit} placeholder={"secureme.com"} />
				<div className="w-1/2 absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center dm-sans">
					<p className="text-2xl mb-5">All checks are performed securely and no sensitive data is stored.</p>
					<p className="text-[#5A6474]">
						We help you discover if your email has been part of a data breach. By entering your email, you can see whether it was exposed in any known breaches, helping you take action to secure your accounts.
					</p>
				</div>
			</div>
			<div className="w-screen h-full bg-[#F5F5F5]">
				{domainResult ? (
					Object.keys(domainResult).length > 0 ? (
						<div>
							<p className="text-2xl font-bold text-red-500">Domain has been breached!</p>
							<p className="text-lg">Breaches Count: {domainResult.breach_count || "N/A"}</p>
							<p className="text-lg">Last Breach: {domainResult.last_breach || "N/A"}</p>
							{/* Display more details if available */}
							<p className="text-lg">Additional Info: {domainResult.additional_info || "N/A"}</p>
						</div>
					) : (
						<p className="text-2xl font-bold">No breaches found for this domain.</p>
					)
				) : (
					<p className="text-xl">Enter a domain to check for breaches.</p>
				)}
			</div>
		</>
	);
}
