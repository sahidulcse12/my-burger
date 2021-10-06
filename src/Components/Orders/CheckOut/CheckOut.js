import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreators';

const mapStateToProps = (state) => {
    //console.log(state.token)
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class CheckOut extends Component {

    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputHandleChange = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
        }
        axios
            .post("https://burger-builder-b20db-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully"
                    })
                    this.props.resetIngredients()
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something went wrong!!please try again"
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something went wrong!!please try again"
                });
            })
    }

    render() {
        let form = (<div>
            <h4 style={{
                border: '1px solid grey',
                boxShadow: '1px 1px #888888',
                borderRadius: "5px",
                padding: '20px'
            }}>Payment : {this.props.totalPrice}</h4>

            <form style={{
                border: '1px solid grey',
                boxShadow: '1px 1px #888888',
                borderRadius: "5px",
                padding: '20px'
            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={(e) => this.inputHandleChange(e)}></textarea>
                <br />
                <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Please enter your phone number" onChange={(e) => this.inputHandleChange(e)} />
                <br />
                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputHandleChange(e)}>
                    <option value="Cash on delivery">Cash on delivery</option>
                    <option value="BKash">BKash</option>
                </select>
                <br />
                <Button style={{ backgroundColor: "#D70F64" }} className="mr-auto" onClick={this.submitHandler} disabled={!this.props.purchasable}>Place Order</Button>
                <Button color="secondary" className="ml-2" style={{ marginLeft: "3px" }} onClick={this.goBack}>Cancel</Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);