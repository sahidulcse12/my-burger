import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import CheckOut from './Orders/CheckOut/CheckOut';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';



const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {

    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={CheckOut} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div style={{
                backgroundColor: "#D70F64",
                height: "70px",
            }}>
                <div className="container">
                    <Header />
                    <div>
                        {routes}
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);