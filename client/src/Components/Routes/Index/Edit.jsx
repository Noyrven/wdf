import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Edit = ({ match }) => {

    const [place, setPlace] = useState({ image: '' });
    const { id } = match.params;

    useEffect(() => {
        axios.get(`/api/places/${id}`, { withCredentials: true })
            .then(res => setPlace(res.data.place))
    }, [id])

    const [filePath, setPath] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const [btnMessage, setMessage] = useState('Edit')

    const submit = e => {
        e.preventDefault();

        setMessage('Publishing...')

        const fd = new FormData();
        for (let key in place) {
            fd.append(key, place[key])
        };
        axios
            .put(`/api/places/${id}`, fd, { withCredentials: true })
            .then(res => { if (res.status === 200) setRedirect(true); setMessage('Edit') })
            .catch(e => alert(e))
    }

    const deletePlace = () => {
        axios
            .delete(`/api/places/${id}`, { withCredentials: true })
            .then(res => { if (res.status === 200) setRedirect(true) })
            .catch(e => alert(e))
    }

    const renderRedirect = () => {
        if (redirect) return <Redirect to='/places/' />
    };


    return (
        <>
            {renderRedirect()}
            <div className='container text-center p-0 mt-5'>
                <h1>Edit chosen place</h1>
                <form onSubmit={submit}>

                    <div className="form__group field">
                        <input
                            type="input"
                            className="form__field"
                            placeholder="Title"
                            defaultValue={place.name}
                            name="title"
                            id='title'
                            required
                            onChange={e => setPlace({ ...place, name: e.target.value })}
                        />
                        <label htmlFor="title" className="form__label">Title</label>
                    </div>


                    <div className="form__group field">
                        <input
                            type="text"
                            className="form__field"
                            value={filePath ? place.image.name : place.image}
                            name="image"
                            id='image'
                            readOnly
                            placeholder="image"
                        />
                        <label htmlFor="image" className="form__label">Image</label>
                        <input
                            type="file"
                            id='file-input'
                            onChange={e => {
                                setPlace({ ...place, image: e.target.files[0] });
                                setPath(true)
                            }
                            }
                        />
                        <label htmlFor="file-input">Browse</label>
                    </div>

                    <div className="form__group field">
                        <input
                            type="address"
                            className="form__field"
                            placeholder="address"
                            defaultValue={place.address}
                            name="address"
                            id='address'
                            required
                            onChange={e => setPlace({ ...place, address: e.target.value })}
                        />
                        <label htmlFor="address" className="form__label">Address</label>
                    </div>


                    <div className="form__group field">
                        <select
                            className="form__field"
                            value={place.price}
                            placeholder="price"
                            name="price"
                            id='price'
                            onChange={e => setPlace({ ...place, price: e.target.value })}
                        >
                            <option value="$">$ Inexpensive</option>
                            <option value="$$">$$ Moderately priced</option>
                            <option value="$$$">$$$ Expensive</option>
                        </select>
                        <label htmlFor="price" className="form__label">Price Category</label>
                    </div>


                    <div className="form__group field">
                        <input
                            type="text"
                            className="form__field"
                            placeholder="opened"
                            defaultValue={place.opened}
                            name="opened"
                            id='opened'
                            onChange={e => setPlace({ ...place, opened: e.target.value })}
                        />
                        <label htmlFor="opened" className="form__label">Hours Opened</label>
                    </div>


                    <div className="form__group field">
                        <select
                            className="form__field"
                            defaultValue={'default'}
                            placeholder="cuisine"
                            value={place.cuisine}
                            name="cuisine"
                            id='cuisine'
                            onChange={e => setPlace({ ...place, cuisine: e.target.value })}
                        >
                            <option value="default" disabled>Choose cuisine type</option>
                            <option value="American">American</option>
                            <option value="Asian fusion">Asian fusion</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Burgers">Burgers</option>
                            <option value="Cafes">Cafes</option>
                            <option value="Classic">Classic</option>
                            <option value="Ethnic">Ethnic</option>
                            <option value="Fast food">Fast food</option>
                            <option value="Fish">Fish</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Greek">Greek</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Organic">Organic</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Polish">Polish</option>
                            <option value="Ukrainian">Ukrainian</option>
                        </select>
                        <label htmlFor="cuisine" className="form__label">Cuisine type</label>
                    </div>


                    <div className="form__group field">
                        <input
                            type="text"
                            className="form__field"
                            placeholder="menu"
                            defaultValue={place.menu}
                            name="menu"
                            id='menu'
                            onChange={e => setPlace({ ...place, menu: e.target.value })}
                        />
                        <label htmlFor="menu" className="form__label">Menu or Website</label>
                    </div>


                    <div className="form__group field">
                        <input
                            type="tel"
                            className="form__field"
                            placeholder="telephone"
                            defaultValue={place.telephone}
                            name="telephone"
                            id='telephone'
                            onChange={e => setPlace({ ...place, telephone: e.target.value })}
                        />
                        <label htmlFor="telephone" className="form__label">Contact Phone</label>
                    </div>

                    <div className="form-group">
                        <input
                            id="btn"
                            className="btn btn-lg btn-primary btn-block"
                            type='submit'
                            value={btnMessage}
                        />
                        <input
                            className="btn btn-lg btn-danger btn-block"
                            type='submit'
                            value='Delete this place'
                            onClick={() => deletePlace()}
                        />
                    </div>
                </form>

                <a className='site-a' href={`/places/${id}`}>Go Back</a>
            </div>
        </>

    )
}



export default Edit