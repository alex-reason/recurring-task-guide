import { useState } from 'react'
import { useAuthContext } from "./useAuthContext";
// firebase imports
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = (email, password) => {
        setError(null);
        setIsPending(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                dispatch({ type: 'LOGIN', payload: response.user })
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => setIsPending(false))
    };

    return { error, login, isPending }
};
