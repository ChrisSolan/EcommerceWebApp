import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/home.tsx';
import {Navbar} from './navbar.tsx';
import { Auth } from './pages/auth.tsx';
import {ShoppingCart} from './pages/shoppingCart.tsx';
import {Orders} from './pages/orders.tsx';
import { ShoppingProvider } from './contexts/shoppingContext.tsx';
import { Account } from './pages/account.tsx'; 

function App() {
  return (
    <ShoppingProvider>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/cart' element={<ShoppingCart/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/account' element={<Account/>}/>
          </Routes>
        </Router>
      </div>
    </ShoppingProvider>
  );
}

export default App;
