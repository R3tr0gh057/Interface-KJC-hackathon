import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import bgGradient from "../assets/bg-gradient.svg";
import { Link } from "react-router-dom";
import { checkPassword } from "../scripts/lib";
import { useState } from "react";


export default function PasswordSearch() {
	const [passwordResult, setPasswordResult] = useState(null); // State to store the result

	const handleSubmit = async (event) => {
		event.preventDefault();
		const password = event.target[0].value;

		const result = await checkPassword(password); // Fetch password breach result
		setPasswordResult(result); // Set result in state
	};

	return (
		<>
			<NavBar />
			<div className="w-full h-screen flex flex-col items-start justify-center px-32 relative bg-hero_gradient bg-cover">
				<h1 className="dm-sans text-6xl font-medium w-2/5 h-fit mb-10 leading-snug">
					Check your
					<div className="text-[#697EFF]">Password</div> here
				</h1>
				<SearchBar handleSubmit={handleSubmit} placeholder={"Password"} />
				<div className="w-1/2 absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center dm-sans">
					<p className="text-2xl mb-5">All checks are performed securely and no sensitive data is stored.</p>
					<p className="text-[#5A6474]">
						We help you discover if your email has been part of a data breach. By entering your email, you can see whether it was exposed in any known breaches, helping you take action to secure your accounts.
					</p>
				</div>
			</div>
			<div className="w-screen h-full bg-[#F5F5F5]">
				<div className="w-full h-auto mt-5 p-5 bg-gray-100 rounded-md">
					{passwordResult ? (
						typeof passwordResult === "string" ? (
							<p className="text-2xl font-bold">
								{passwordResult} {/* Display "Password not breached" or any other status */}
							</p>
						) : (
							<div>
								<p className="text-2xl font-bold text-red-500">Password has been breached!</p>
								<p className="text-lg">Occurrences: {passwordResult.SearchPassAnon.count}</p>
								{/* You can add more details from the `data` if needed */}
							</div>
						)
					) : (
						<p className="text-xl">Enter a password to check if it's been breached.</p>
					)}
				</div>
			</div>
		</>
	);
}
