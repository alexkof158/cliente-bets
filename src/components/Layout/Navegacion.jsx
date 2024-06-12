import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return ( 
        <aside className="sidebar col-3">
            <h2>Sports</h2>
            <nav className="navegacion">
                <hr />
                <Link to="/nba"><i className="fa-solid fa-basketball"></i> NBA</Link>
                <hr />
                <Link to="/mlb"><i className="fa-solid fa-baseball"></i> MLB</Link>
                <hr />
                <Link to="/uefa"><i className="fa-solid fa-futbol"></i> Uefa Champions League</Link><hr />
            </nav>
        </aside>
    );
}
 
export default Navegacion;
