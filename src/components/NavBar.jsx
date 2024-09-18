export default function NavBar() {
	return (
		<div className="w-[90vw] h-16 z-10 bg-[#697EFF] fixed top-10 left-1/2 -translate-x-1/2 px-10 flex justify-between items-center rounded-2xl">
			<h1 className="dm-sans text-white font-black text-3xl">SecureME</h1>
			<div className="dm-sans flex gap-6 text-white font-medium text-lg">
				<p>home</p>
				<p>domain search</p>
				<p>password</p>
				<p>info</p>
			</div>
		</div>
	);
}
