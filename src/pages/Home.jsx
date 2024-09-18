import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import bgGradient from "../assets/bg-gradient.svg"

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="w-screen h-screen flex flex-col items-start justify-center px-32 relative">
				<h1 className="dm-sans text-6xl font-medium w-2/5 h-fit">
					lorem ipsum loda <span className="text-[#697EFF]">kdhssbsdcjcn</span> dscsxsc.
				</h1>
				<SearchBar />
                <img src={bgGradient} className="absolute" alt="" />
			</div>
		</>
	);
}
