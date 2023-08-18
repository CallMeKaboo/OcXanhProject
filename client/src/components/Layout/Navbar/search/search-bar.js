import axios from 'axios';
import React, { useState } from 'react';
import './search-bar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (value) => {
        if (value === '') {
            setSearchResults('');
        } else {
            axios
                .get(`/api/services/search?term=${value}`)
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.error('Error searching for services:', error);
                });
        }
        // e.preventDefault();
    };

    const handleChange = (value) => {
        setSearchTerm(value);
        handleSearch(value);
    };
    const handleServiceClick = (id) => {
        navigate(`/service/detail/${id}`); // Điều hướng tới trang dịch vụ với id tương ứng
        setSearchResults('');
        setSearchTerm('');
    };
    return (
        <>
            <form className="form-inline flex-nowrap align-items-stretch d-flex m-auto" onSubmit={handleSearch}>
                <input
                    className="form-control mr-sm-2"
                    value={searchTerm}
                    onChange={(e) => handleChange(e.target.value)}
                    type="search"
                    placeholder="Tìm kiếm..."
                    aria-label="Search"
                    style={{ borderRadius: '.375rem 0 0 .375rem' }}
                />
                <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                >
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <div className="search-res">
                {searchResults &&
                    searchResults.map((result) => (
                        <div
                            className="search-res_list "
                            key={result.id}
                            onClick={() => handleServiceClick(result.id)}
                        >
                            <p>{result.name}</p>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default SearchBar;
