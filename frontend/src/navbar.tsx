import {Link} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import { useShoppingContext } from './contexts/shoppingContext';

export const Navbar = () => {
    const [cookies, ] = useCookies(['access_token']);
    const {cartCount} = useShoppingContext();

    return (
        <div className=''>
            <Link to= "/" className=''>Home</Link>
            <Link to="/deals" className=''>Deals</Link>
            <Link to="/cart" className=''>Cart ({cartCount})</Link>
            {cookies.access_token ?  (
                <>
                    <Link to="/orders" className=''>Orders</Link>
                    <Link to="/account" className=''>Account</Link>
                </>
            ): (
                <Link to="/auth" className=''>Login/Register</Link>
            )}
        </div>
    )
}