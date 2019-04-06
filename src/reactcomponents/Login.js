import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label} from 'reactstrap';
import {connect} from "react-redux";
import axios from "axios";

class Login extends Component {
    state = {
        email: null,
        password: null,
        userValidation: null

    };
    onInputChange = (e) => {
        const {id, value} = e.target;
        this.setState({[id]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: '/login',
            method: 'post',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then((res) => {
            if (res.status == 200) {
                if (res.data.user)
                    {
                        this.props.login(res.data.user);
                        this.props.history.push('/home');
                    }
                else {
                    this.setState({
                        userValidation:
                            <Alert color="danger" style={{width: 500}}> "invalid e-mail or password!"</Alert>
                    });
                }
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error)
        });

    };

    render() {
        return (

            <div style={{height: 800}}>

                <Form style={{paddingTop: 50, paddingLeft: 100, border: "#7071ed", align: "right"}}
                      onSubmit={this.handleSubmit}>
                    <h2>Sign In</h2>
                    {this.state.userValidation}
                    <FormGroup>
                        <Col sm={2}>
                            <Label for="email">Email</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="email" type="email" size="md" onChange={this.onInputChange}
                                   required/>
                            <FormText>Example: joe@gmail.com</FormText>

                        </Col>

                    </FormGroup>

                    <FormGroup>
                        <Col sm={2}>
                            <Label for="password">Password</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="password" type="password" size="md" pattern=".{5,32}"
                                   title="minimum 5 characters, and maximum 32" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <Col style={{}}>
                        <Button size="md" color="success">Login</Button>
                    </Col>
                </Form>
                <FormFeedback invalid>
                    {this.state.userValidation}
                </FormFeedback>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};
const mapActionsToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch({type: 'LOGIN',user});
        }
    }
};
export default connect(mapStateToProps, mapActionsToProps)(Login);