import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?q=${searchTerm}`);
        setSearchTerm('')
    };

    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search:</label>
                <input
                    type='text'
                    id='search'
                    onChange={(event) => setSearchTerm(event.target.value)}
                    value={searchTerm}
                    required
                />
            </form>
        </div>
    )
};

export default SearchBar;