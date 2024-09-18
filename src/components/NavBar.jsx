import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className="w-[90vw] h-16 z-10 bg-[#697EFF] fixed top-10 left-1/2 -translate-x-1/2 px-10 flex justify-between items-center rounded-2xl">
            <h1 className="dm-sans text-white font-black text-3xl">SecureME</h1>
            <div className="dm-sans flex gap-6 text-white font-medium text-lg">
                <Link to="/" className="hover:underline">home</Link>
                <Link to="/domain-search" className="hover:underline">domain search</Link>
                <Link to="/password" className="hover:underline">password</Link>
                <Link to="/info" className="hover:underline">info</Link>
            </div>
        </div>
    );
}
