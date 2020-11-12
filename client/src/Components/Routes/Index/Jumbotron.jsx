import React from 'react';

const Jumbotron = ({auth}) => {

    let url ='';
    auth? url="/places/new" : url='/login'


    return (
        <div id="overlay">
            <header className="jumbotron">
                <div className="container">
                    <h1>W.F&D</h1>
                    <h2>WARSAW BEST DRINKS & FOOD</h2>
                    <h3>View our best hand-picked places from entire Warsaw</h3>
                    <br />
                    <p>
                        <a id="btn" href={url}>Share a New Place</a>
                    </p>
                </div>
            </header>
        </div>
    )
};

export default Jumbotron;


