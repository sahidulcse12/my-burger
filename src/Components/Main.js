import React from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import Orders from './Orders/Orders';
import CheckOut from './Orders/CheckOut/CheckOut';

import { Route } from 'react-router-dom';

const Main = (props) => {
    return (
        <div>
            <Header />
            <div className="container">
                <Route path="/orders" component={Orders} />
                <Route path="/checkout" component={CheckOut} />
                <Route path="/" exact component={BurgerBuilder} />
            </div>
        </div>
    );
};

export default Main;