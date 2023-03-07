import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import GuideList from "../components/GuideList";
import { useThemeContext } from "../hooks/useThemeContext";
import { db } from "../firebase/config";
// firebase
import { collection, onSnapshot } from 'firebase/firestore';

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const qText = queryParams.get('q');
  
  const [isPending, setIsPending] = useState(false);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(false);

  // theme /  mode
  const { mode } = useThemeContext();
  const titleClassName = `page-title centered page-title${mode}`;

  useEffect(() => {
    setIsPending(true);
    let ref = collection(db, 'guides');

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError("There are no such guides");
        setIsPending(false);
      } else {
        let searchResults = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().title.toLowerCase().includes(qText.toLowerCase())) {
            searchResults.push({ id: doc.id, ...doc.data() });
          }
        });
        setGuides(searchResults);
        setIsPending(false);
      }
    })
    return () => unsubscribe();
  }, [qText]);

  return (
    <div>
      <h2 className={titleClassName}>Guides including "{qText}"</h2>
      {error && <p className='centered'>{error}</p>}
      {isPending && <p className='centered'>loading...</p>}
      {guides && <GuideList data={guides} />}
    </div>
  )
};

export default Search;