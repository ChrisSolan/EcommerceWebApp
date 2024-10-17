import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { useShoppingContext } from './contexts/shoppingContext';

export const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['access_token']);
    const logout = () => {
        setCookies("access_token", ""); //clear and set the cookies to empty
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    const {cartCount} = useShoppingContext();

    return (
        <div className=''>
            <Link to= "/" className=''>Home</Link>
            <Link to="/deals" className=''>Deals</Link>
            <Link to="/cart" className=''>Cart ({cartCount})</Link>
            {cookies.access_token ?  (
                <button onClick={logout}>Logout</button>
            ): (
                <Link to="/auth" className=''>Login/Register</Link>
            )}
        </div>
    )
}