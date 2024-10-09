import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home.tsx';
import {Deals} from './pages/deals.tsx';
import {Navbar} from './navbar.tsx';
import { Auth } from './pages/auth.tsx';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/deals' element={<Deals/>}/>
          <Route path='/auth' element={<Auth/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
