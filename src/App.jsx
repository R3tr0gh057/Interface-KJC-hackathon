import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DomainSearch from './pages/DomainSearch';
import PasswordSearch from './pages/PasswordSearch';
import NavBar from './components/NavBar'; // Import NavBar
import Info from './pages/Info'; // Import NavBar

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/domain-search" element={<DomainSearch />} />
                <Route path="/password" element={<PasswordSearch />} />
                <Route path="/info" element={<Info />} />
                {/* You can add more routes here */}
            </Routes>
        </Router>
    );
}

export default App;
