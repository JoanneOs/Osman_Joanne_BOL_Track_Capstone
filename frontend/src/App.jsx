import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BolList from './pages/BolList';
import AddBol from './pages/AddBol';
import EditBol from './pages/EditBol';
import BolDetail from './pages/BolDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BolList />} />
            <Route path="/bols" element={<BolList />} />
            <Route path="/bols/add" element={<AddBol />} />
            <Route path="/bols/:id" element={<BolDetail />} />
            <Route path="/bols/:id/edit" element={<EditBol />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;