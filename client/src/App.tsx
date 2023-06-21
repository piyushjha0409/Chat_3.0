import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/chat/Chat';
import { AppContextProvider } from './context/AppContext';

function App() {
  return (
     <BrowserRouter>
     <Routes>
     <AppContextProvider>
     <Route path='/' element={<Homepage />} />
     <Route path='/Chat' element={<Chat />} />
     </AppContextProvider>
     </Routes>
     </BrowserRouter>
      
  );
}

export default App;
