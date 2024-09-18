
export default function SearchBar({handleSubmit}) {

	return (
		<form onSubmit={handleSubmit} className="w-full flex gap-2 dm-sans">
			<input className="w-[90%] h-16 pl-5 rounded-bl-xl rounded-tl-xl text-3xl font-bold border-gray-500" placeholder="secureme@gmail.com" type="email" id="email" />
			<button type="submit" className="bg-[#697EFF] w-[10%] text-white rounded-br-xl rounded-tr-xl text-3xl font-bold">send</button>
		</form>
	);
}
