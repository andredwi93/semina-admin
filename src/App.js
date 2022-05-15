import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Categories from './pages/Categories';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar'
import CategoryCreate from './pages/Categories/create';
import CategoryEdit from './pages/Categories/edit';
import Speakers from './pages/Speakers';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path='/login' element={<SignIn />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/create' element={<CategoryCreate />} />
        <Route path='/categories/:id' element={<CategoryEdit />} />
        <Route path='/speakers' element={<Speakers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
