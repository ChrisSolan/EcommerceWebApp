import { useCookies } from "react-cookie";
import {useNavigate} from 'react-router-dom';

export const Account = () => {
   
    const username = window.localStorage.getItem("username");
    const userID = window.localStorage.getItem("userID");
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['access_token']);
    const logout = () => {
        setCookies("access_token", ""); //clear and set the cookies to empty
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("username");
        navigate("/auth");
    }

    /*
    const onDelete = async() => {
        try {

            await axios.delete(`http://localhost:3010/auth/${userID}`, { headers: { authorization: cookies.access_token} });
            alert('Account Deleted!');
        } catch (err) {
            console.log(err);
        }
    }
    */
    return (
        <div className="flex-col text-center justify-center">
            
            <h1 className="mx-[15px] mb-3 font-bold text-lg">{username}'s Account Page</h1>
            <button onClick={logout} className="rounded-md hover:bg-[#FFA69E] font-semibold my-4 px-[20px] py-[6px] text-black bg-[#FF686B]">Logout</button>
           
            
        </div>
    )
}