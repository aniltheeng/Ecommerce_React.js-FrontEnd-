import React, { useState, useEffect } from 'react';
import { getCategories, list } from './uiApi';
import Card from './Card';
import Style from '../../Style.css'
const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })


    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({ ...data, categories: data })
            }
        })
    }
    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search,category);
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true }); 
                    }
                })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handleChange = (name) => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    }


    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${ results.length } products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <center> <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2></center>

                {results.map((product, i) => (<Card key={i} product={product} />))}
            </div>

        );
    }

    const searchForm = () => (
        <div className = "btnBx">
            <form onSubmit={searchSubmit} className="d-flex">
                <select  className = "allBtn" style = {{width:"80px",height:"44px"}} id="agileinfo-nav_search" name="agileinfo_search" onChange={handleChange('category')}>
                    <option value="All">All</option>
                    {categories.map((c, i) => (

                        <option key={i} value={c._id}>
                            {c.category_name}
                        </option>

                    ))}

                </select>
                <input className = "inputBx my-42px"  style = {{width:"660px",height:"44px"}} name="Search" type="search" size="100" onChange={handleChange('search')} required="required" />
                <button type="submit" className="btn btn-warning searchIcon " style = {{width:"49px",height:"44px"}}  aria-label="Left Align">
                    <span className="fa fa-search " aria-hidden="true"></span>
                </button>
            </form>
        </div>
    )
    return (
        <>
            <div className="container">
                {searchForm()}

            </div>
            <div>
                <div class = "searchResults">
                    {searchedProducts(results)}
                </div>
            </div>
            <div className="clearfix"></div>
        </>
    )
}

export default Search;