import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/chat/Chat';
function App() {
  return (
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Homepage />} />
     <Route path='/Chat' element={<Chat />} />
     </Routes>
     </BrowserRouter>
      
  );
}

export default App;
