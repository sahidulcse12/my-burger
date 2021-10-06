import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType
    }
}

export const removeIngredient = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENT,
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios
        .get("https://burger-builder-b20db-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + token + queryParams)
        .then(response => {
            //console.log(response.data)
            dispatch(loadOrders(response.data));
        })
        .catch(error => {
            dispatch(orderLoadFailed())
        })
}