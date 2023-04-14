import { Link } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext';
import { useAuthContext } from '../hooks/useAuthContext';
import deleteIcon from '../assets/delete.svg';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';

const GuideList = ({ data }) => {
    const { bgColor } = useThemeContext();
    const btnClassName = `card__btn card__btn${bgColor}`;
    const cardClassName = `card card${bgColor}`;

    const { user } = useAuthContext();

    const [authToDeleteWarning, setAuthToDeleteWarning] = useState(false);

    const handleDelete = async (id) => {
        if (user) {
            setAuthToDeleteWarning(false)
            const ref = doc(db, 'guides', id)
            await deleteDoc(ref)
        }
        if (!user) {
            setAuthToDeleteWarning(true);
            console.log('cannot delete; please login to delete case task')
        }
    };

    if (data.length === 0) {
        return <div className='centered'>No guides or templates to load...</div>
    };

    const renderedList = data.map(guide => {
        return (
            <div className={cardClassName} key={guide.id}>
                {authToDeleteWarning && <p className='card__warning'>Cannot delete; please login</p>}
                <img
                    className='card__delete'
                    src={deleteIcon}
                    alt='delete icon'
                    onClick={() => handleDelete(guide.id)}
                />
                <h3>{guide.title}</h3>
                <p className='card__p'>{guide.caseTime} to accomplish</p>
                <p className='card__p'>{guide.generalSteps.substring(0, 100)}...</p>
                <Link className={btnClassName} to={`/guides/${guide.id}`}>Read More</Link>
            </div>
        )
    });

    return (
        <div className='guide-list'>
            {renderedList}
        </div>
    )
};

export default GuideList;