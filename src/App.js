import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './pages/Categories';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar'
import CategoryCreate from './pages/Categories/create';
import CategoryEdit from './pages/Categories/edit';
import Speakers from './pages/Speakers';
import { useEffect } from 'react';
import { listen } from './redux/listener';
import CreateSpeakers from './pages/Speakers/create';
import EditSpeakers from './pages/Speakers/edit';

function App() {
  useEffect(() => {
    listen()
  }, [])
  
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/create' element={<CategoryCreate />} />
        <Route path='/categories/edit/:id' element={<CategoryEdit />} />
        <Route path='/speakers' element={<Speakers />} />
        <Route path='/speakers/create' element={<CreateSpeakers />} />
        <Route path='/speakers/edit/:id' element={<EditSpeakers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
