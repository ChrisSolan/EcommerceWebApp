import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home.tsx';
import {Deals} from './pages/deals.tsx';
import {Navbar} from './navbar.tsx';
import { Auth } from './pages/auth.tsx';
import {ShoppingCart} from './pages/shoppingCart.tsx';
import {Orders} from './pages/orders.tsx';
import { ShoppingProvider } from './contexts/shoppingContext.tsx';

function App() {
  return (
    <ShoppingProvider>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/deals' element={<Deals/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/cart' element={<ShoppingCart/>}/>
            <Route path='/orders' element={<Orders/>}/>
          </Routes>
        </Router>
      </div>
    </ShoppingProvider>
  );
}

export default App;
