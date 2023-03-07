import { useNavigate } from "react-router-dom";
import { useState } from "react"
//hooks
import { useSignUp } from "../hooks/useSignup";
import { useThemeContext } from "../hooks/useThemeContext";

const Signup = () => {
    // themes
    const { bgColor } = useThemeContext();
    let btnClassName = `btn btn${bgColor}`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);

    const navigate = useNavigate();

    const { signup, error, isPending } = useSignUp();

    const handleSubmit = (e) => {
        setErrorPassword('');
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorPassword('Password and Confirm Password does not match.')
            setPassword('');
            setConfirmPassword('');
        }
        if (password === confirmPassword) {
            setErrorPassword('');
            signup(email, password);
            if (!error){
                navigate('/');
            }
        }
    };

    return (
        <form className='auth__form' onSubmit={handleSubmit}>

            <label>
                <span>email:</span>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>password:</span>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            <label>
                <span>confirm password:</span>
                <input
                    type='password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
            </label> 

            {errorPassword && <p className='auth__error'>{errorPassword}</p>}
            {!isPending && <button className={btnClassName}>sign up</button>}
            {isPending && <button className={btnClassName} disabled>loading</button>}
            {error && <p>{error}</p>}
        </form>
    )
};

export default Signup;