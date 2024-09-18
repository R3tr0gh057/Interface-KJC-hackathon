import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import bgGradient from "../assets/bg-gradient.svg";

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="w-full h-screen flex flex-col items-start justify-center px-32 relative bg-hero_gradient bg-cover">
				<h1 className="dm-sans text-6xl font-medium w-2/5 h-fit mb-10 leading-snug">
					Is your
					<div className="text-[#697EFF]">Data Security</div> up-to-date ?
				</h1>
				<SearchBar />
				<div className="w-1/2 absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col text-center dm-sans">
					<p className="text-2xl mb-5">All checks are performed securely and no sensitive data is stored.</p>
					<p className="text-[#5A6474]">
						We help you discover if your email has been part of a data breach. By entering your email, you can see whether it was exposed in any known breaches, helping you take action to secure your accounts.
					</p>
				</div>
			</div>
            <div className="w-screen h-full bg-[#F5F5F5]"></div>
		</>
	);
}
