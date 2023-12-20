import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from "./Views/Landing/Landing"
import Home from './Views/Home/Home';
import Detail from './Views/Detail/Detail';
import { useLocation } from 'react-router-dom';
import Searchbar from './Views/Searchbar/Searchbar';
import Form from './Views/Form/Form';
import SearchResults from './Views/SearchResults/SearchResults';
function App() {
  const pathname = useLocation();
  return (
    <div className="App">
      {pathname.pathname !== '/' && <Searchbar />}
      <Routes>
        <Route path='/search' element={<SearchResults />} />
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path="/detail/:dogId" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

