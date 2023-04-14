import { useState } from "react";
// hooks
import { useLogin } from "../hooks/useLogin";
import { useThemeContext } from "../hooks/useThemeContext";

const Login = () => {
  // themes
  const { bgColor } = useThemeContext();
  const btnClassName = `btn btn${bgColor}`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
  };

  return (
    <form className='auth__form' onSubmit={handleSubmit}>
      <h3>Login</h3>
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

      {!isPending && <button className={btnClassName}>login</button>}
      {isPending && <button className={btnClassName} disabled>loading</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login