import {useState} from 'react';
import {AxiosError} from 'axios';
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import api from '../axiosConfig';

export const Auth = () => {
    return (
        <div className='auth'>
            <Login/>
            <Register/>
        </div>
    )
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async(event: React.FormEvent) => {
        event.preventDefault(); //allows us to submit the form without reloading the whole page
        setErrorMsg('');

        try {
            const response = await api.post('/auth/login', {
                username,
                password,
            });

            setCookies("access_token", response.data.token); //token stored in cookies
            window.localStorage.setItem("userID", response.data.userID); //userID stored in local storage
            window.localStorage.setItem("username", username); //username stored in local storage
            navigate("/");
        } catch (err) {
            const error = err as AxiosError; //cast the error to Axios error so we have a type
            if (error.response?.status === 404) {setErrorMsg("User doesn't exist!"); }
            else if (error.response?.status === 401) {setErrorMsg("Username or password is incorrect"); }
            else {console.error(err);}
        }
    }
    
    return (
        <div className='auth-container text-center items-center justify-center py-[15px]'>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
                <div className='form-group py-[3px]'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' className='border-2 border-black' value={username} required onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group  pb-[10px]'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' className='border-2 border-black' value={password} required onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button className="rounded-md hover:bg-[#FFA69E] font-semibold my-4 px-[20px] py-[6px] text-black bg-[#FF686B]" type='submit'>Login</button>
            </form>
        </div>
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async(event: React.FormEvent) => {
        event.preventDefault(); //allows us to submit the form without reloading the whole page

        try {
            await api.post('/auth/register', {
                username,
                password,
            });
            alert("Registration Complete!");
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div className='auth-container text-center min-h-screen justify-center'>
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <div className='form-group py-[3px]'>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' className='border-2 border-black' value={username} required maxLength={24} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className='form-group  pb-[10px]'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' className='border-2 border-black' value={password} required maxLength={16} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button className="rounded-md hover:bg-[#FFA69E] font-semibold my-4 px-[20px] py-[6px] text-black bg-[#FF686B]" type='submit'>Register</button>
            </form>
        </div>
    );
};
