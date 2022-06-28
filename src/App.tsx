import React, { useState } from 'react';
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';


export const SearchContext = React.createContext({});

export const App = () => {

    const [searchValue, setSearchValue] = useState('');


    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/404" element={<h2>404: PAGE NOT FOUND 😕</h2>} />
                            <Route path="*" element={<Navigate to={'/404'} />} />
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>
    )
};
