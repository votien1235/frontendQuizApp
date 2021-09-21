import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { Loading } from "../shared/Loading";

export const SignUp = () => {

    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: "",
    });

    const handleChanges = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    };

    const [err, setErr] = useState(null);
    const [isSucceeded, setIsSucceeded] = useState(false);
    const [loading, setLoading] = useState(false);
    const errUsername = "Username  cannot be empty!";
    const errPassword = "Password cannot be empty!";
    const errConfirmPassword = "ConfirmPassword cannot be empty!";

    const errC = "Confirm password not matched!";


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr(null);
        setLoading(true);
        setIsSucceeded(false);
        if (!values.username) {
            setErr(errUsername);
            return setLoading(false);
        }
        if (!values.password) {
            setErr(errPassword);
            return setLoading(false);
        }
        if (!values.confirmPassword) {
            setErr(errConfirmPassword);
            return setLoading(false);
        }
        if (values.confirmPassword !== values.password) {
            setErr(errC)
            return setLoading(false);
        }
        try {
            await axios.post("/auth/sign-up", values, {

                headers: {
                    "Content-Type": "application/json"
                }
            });
            setIsSucceeded(true);
        } catch (err) {
            setErr(err.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Card.Header><h3>Sign Up</h3></Card.Header>
            <Card.Body>
                {
                    loading ? <Loading text="Signing up..."></Loading> : <>

                        {err && <Alert variant="danger" style={{ textAlign: "center" }}>{err}</Alert>}
                        {isSucceeded && <Alert variant="success">Resgister successfully!</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username ... " name="username" onChange={handleChanges} value={values.username} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password ..." name="password" onChange={handleChanges} value={values.password} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Retype your password ..." name="confirmPassword" onChange={handleChanges} value={values.confirmPassword} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" className="rounded-pill md-block">Sign Up</Button>
                            </div>
                            <p className="mt-2 small text-center">Already   have an account?<Link to="/auth/sign-in">Sign in</Link></p>
                        </Form>
                    </>
                }
            </Card.Body>
        </Card>


    )
}