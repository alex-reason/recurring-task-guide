import { useParams } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
//firebase
import { doc, getDoc } from 'firebase/firestore';

const Guide = () => {
  const { mode } = useThemeContext();
  const { id } = useParams();

  // theme / mode
  const guideClassName = `guide guide${mode}`;
  const titleClassName = `centered page-title page-title${mode}`;

  const [guide, setGuide] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const retrieveData = async () => {
      const ref = doc(db, 'guides', id);
      try {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          setIsPending(false)
          setGuide(docSnap.data())
        } else {
          setIsPending(false);
          setError("Document does not exist")
        }
      } catch(err){
        console.log(err)
      }
      
    }
    retrieveData();
  }, [id]);


  const renderedGuide = guide && (
    <>
      <h2 className={titleClassName}>{guide.title}</h2>
      <p>Takes an estimated {guide.caseTime} to prepare case</p>
      <h4>General Documents List:</h4>
      <ul>
        {guide.documents.map(document => (
          <li key={`${guide.id}doc${guide.documents.indexOf(document)}`}>
            {document}
          </li>
        ))}
      </ul>
      <h4>General Steps:</h4>
      <p> {guide.generalSteps}</p>
    </>
  )

  return (
    <div className={guideClassName}>
      {error && <p className='centered'>{error}</p>}
      {isPending && <p className='centered'>Loading...</p>}
      {renderedGuide}
    </div>
  )
};

export default Guide;