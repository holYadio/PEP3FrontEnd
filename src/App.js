import './App.css';
import NavBarComponent from './components/NavBar';
import Home from './components/Home';
import UploadPregunta from './components/UploadPregunta';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Question1 from './components/Question1';
import Question2 from './components/Question2';
import Question3 from './components/Question3';
import Question4 from './components/Question4';
import Resultado from './components/Resultado';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBarComponent />} >
            <Route index element={<Home />} />
            <Route path="question1" element={<Question1 />} />
            <Route path="question2" element={<Question2 />} />
            <Route path="question3" element={<Question3 />} />
            <Route path="question4" element={<Question4 />} />
            <Route path="resultado" element={<Resultado />} />
            <Route path="upload" element={<UploadPregunta />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
