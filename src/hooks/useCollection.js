import { useState, useEffect } from 'react'
import { db } from '../firebase/config';
//firebase
import { collection, onSnapshot } from 'firebase/firestore';

export const useCollection = (coll) => {
    const [documents, setDocuments] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        let ref = collection(db, coll);

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ id: doc.id, ...doc.data() })
            })
            setIsPending(false)
            setDocuments(results);
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsubscribe(); //cleanup 
    }, [coll]);

    return { documents, isPending, error }
};
