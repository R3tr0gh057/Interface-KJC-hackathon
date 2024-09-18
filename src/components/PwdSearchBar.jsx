import {checkPassword} from "../scripts/lib.js"

export default function SearchBar() {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(checkPassword(event.target[0].value))
    }

	return (
		<form onSubmit={handleSubmit} className="w-full flex gap-2 dm-sans">
			<input className="w-[90%] h-16 pl-5 rounded-bl-xl rounded-tl-xl text-3xl font-bold border-gray-500" placeholder="Password" id="password" />
			<button type="submit" className="bg-[#697EFF] w-[10%] text-white rounded-br-xl rounded-tr-xl text-3xl font-bold">send</button>
		</form>
	);
}
