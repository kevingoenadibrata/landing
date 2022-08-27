import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/view/:id" element={<Landing />} />
            </Routes>
        </div>
    );
}

export default App;
