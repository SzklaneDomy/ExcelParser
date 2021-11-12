import React, { Component } from 'react'
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'


export default class CheckUserId extends Component {
    state = {
        userID: '',
        isCaptchaVerified: true,
        fetchedIDs: null,
        userIDverified: null,
        fetchingIDs: false,
    }

    onChangeUserID = (e) => {
        this.setState({ userID: e.target.value })
        console.log(this.state.userID)
    }
    onClickUserID = () => {
        if (this.state.userID.trim() === 0 || this.state.userID.length !== 6) {
            this.setState({ userIDverified: false })
        } else {
            this.setState({ fetchingIDs: true })
            axios.get(process.env.REACT_APP_SHEETS_URL)
                .then((res) => {
                    this.setState({ fetchedIDs: res.data.match(/.{1,6}/g) })
                })
                .catch((err) => {
                    console.log(err)
                })
                .then(() => {
                    if (this.state.isCaptchaVerified) {
                        if (this.state.fetchedIDs.includes(this.state.userID)) {
                            this.setState({ userIDverified: true })
                            this.props.parentCallback(true)
                        } else {
                            this.setState({ fetchingIDs: false })
                            this.setState({ userIDverified: false })
                        }
                        console.log(this.state)
                    }
                })
        }
    }

    renderUserWarning = () => {
        if (this.state.userIDverified === false) {
            return (
                <Form.Text className="text-muted">
                    Sorry but this ID is not in our databse
                </Form.Text>
            );
        }
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label color="white">Whats Your ID</Form.Label>
                            <Form.Control type="email" placeholder="Enter ID" onChange={this.onChangeUserID} />
                            {this.renderUserWarning()}
                        </Form.Group>
                        <Button onClick={this.onClickUserID}>Validate {this.state.fetchingIDs ? <Spinner animation="border" size='sm' style={{ marginBottom: "3%" }} /> : null}</Button>
                    </Form>
                </Jumbotron>
            </div>
        )
    }
}
