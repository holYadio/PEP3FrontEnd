import './App.css';
import NavBarComponent from './components/NavBar';
import Home from './components/Home';
import Test from './components/Test';
import FinalTest from './components/FinalTest';
import UploadPregunta from './components/UploadPregunta';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBarComponent />} >
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
            <Route path="finaltest" element={<FinalTest />} />
            <Route path="upload" element={<UploadPregunta />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
