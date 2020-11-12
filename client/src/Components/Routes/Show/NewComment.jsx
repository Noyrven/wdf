import React, { useState } from 'react'
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";


const NewComment = ({ match }) => {

    const [comment, setComment] = useState({
        text: '',
        pros: null,
        cons: null,
        rating: 0
    })

    const [redirect, setRedirect] = useState(false);
    const renderRedirect = () => {
        if (redirect) return <Redirect to={`/places/${match.params.id}`} />
    }

    const submit = e => {
        e.preventDefault();
        axios.post(`/api/places/${match.params.id}/comments`, { text: comment.text, pros: comment.pros, cons: comment.cons, rating: comment.rating }, { withCredentials: true })
            .then(res => { if (res.status === 200) setRedirect(true) })
            .catch(e => alert(e))
    }

    return (
        <>
            {renderRedirect()}
            <div className="container text-center mt-5">
                <h1>LEAVE YOUR REVIEW</h1>
                <div className="form-size">
                    <form onSubmit={submit}>

                        <div className="form__group field">
                            <textarea
                                type="input"
                                className="form__field"
                                placeholder='Write your comment here'
                                name="text"
                                id='text'
                                cols="30"
                                rows="3"
                                required
                                onChange={e => setComment({ ...comment, text: e.target.value })}
                            ></textarea>
                            <label htmlFor="text" className="form__label">Your comment</label>
                        </div>

                        <div className="form__group field">
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Pros"
                                name="pros"
                                id='pros'
                                onChange={e => setComment({ ...comment, pros: e.target.value })}
                            />
                            <label htmlFor="pros" className="form__label">Pros</label>
                        </div>

                        <div className="form__group field">
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Cons"
                                name="conss"
                                id='cons'
                                onChange={e => setComment({ ...comment, cons: e.target.value })}
                            />
                            <label htmlFor="pros" className="form__label">Cons</label>
                        </div>

                        <div className="form__group field">
                            <select
                                className="form__field"
                                defaultValue={'default'}
                                placeholder="Rate"
                                name="rate"
                                id='rate'
                                required
                                onChange={e => setComment({ ...comment, rating: Number(e.target.value) })}
                            >
                                <option value="default" disabled>How was your experience?</option>
                                <option value='1'>Hated it!</option>
                                <option value='2'>Didn't like it</option>
                                <option value='3'>It was OK</option>
                                <option value='4'>Loved it</option>
                                <option value='5'>It was the best!</option>
                            </select>
                            <label htmlFor="rate" className="form__label">Rate your experience</label>
                        </div>

                        <div className="form-group">
                            <input id="btn" className="btn btn-lg btn-primary btn-block" type='submit' value='Post a comment' />
                        </div>
                    </form>
                </div>
                <br />
                <Link className='site-a' to={`/places/${match.params.id}`}>Go Back</Link>
            </div>
        </>
    )
}

export default NewComment;