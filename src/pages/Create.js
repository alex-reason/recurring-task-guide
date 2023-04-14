import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";
// firebase
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Create = () => {
  const [title, setTitle] = useState('');
  const [generalSteps, setGeneralSteps] = useState('');
  const [caseTime, setCaseTime] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [documents, setDocuments] = useState([]);

  const documentInput = useRef(null);
  const navigate = useNavigate();
  // themes
  const { bgColor, mode } = useThemeContext();
  const btnClassName = `btn btn${bgColor}`;
  const createClassName = `create create${mode}`
  const titleClassName = `centered page-title page-title${mode}`

  const handleAdd = (e) => {
    e.preventDefault();
    const doc = newDocument.trim();
    if (doc && !documents.includes(doc)) {
      setDocuments(prevDocs => [...prevDocs, doc])
    }
    setNewDocument('');
    documentInput.current.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ref = collection(db, 'guides')
    const docToPost = { title, documents, generalSteps, caseTime: caseTime + ' minutes' }
    await addDoc(ref, docToPost);
    navigate('/');
  };

  return (
    <div className={createClassName}>
      <h2 className={titleClassName}>Add a new guide</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Guide title:</span>
          <input
            type='text'
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Documents:</span>
          <div className='documents'>
            <input
              type='text'
              onChange={(e) => setNewDocument(e.target.value)}
              value={newDocument}
              ref={documentInput}
            />
            <button className={btnClassName} onClick={handleAdd}>add</button>
          </div>
        </label>
        <p>current documents: <em>{documents.join(', ')}</em></p>

        <label>
          <span>General steps:</span>
          <textarea
            onChange={(event) => setGeneralSteps(event.target.value)}
            value={generalSteps}
            required
          />
        </label>

        <label>
          <span>Estimate preparation time</span>
          <input
            type='number'
            onChange={(event) => setCaseTime(event.target.value)}
            value={caseTime}
            required
          />
        </label>

        <button className={btnClassName}>Submit</button>
      </form>
    </div>
  )
};

export default Create;