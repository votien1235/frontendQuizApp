import axios from "../../utils/axios";
import React, { useContext, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Loading } from "../shared/Loading";
import { Link } from "react-router-dom";
import authCtx from "../../context/auth"

export const SignIn = () => {

    // const history = useHistory();

    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const handleChanges = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    };
    const { setAuthUser } = useContext(authCtx)
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr(false);
        setLoading(true)
        if (!values.username || !values.password) {
            setErr("Username & Password can not be empty!")
            return setLoading(false);
        }
        try {
            const res = await axios.post("/auth/sign-in", values);
            const { jwt, user } = res.data;
            localStorage.setItem("jwt", jwt);
            axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
            setAuthUser(user);
        } catch (err) {
            setErr(err.response.data)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <Card.Header><h3>Sign in</h3></Card.Header>
            <Card.Body>
                {loading ? <Loading text="Signing in..." /> : <>
                    {err && <Alert variant="danger" style={{ textAlign: "center" }}>{err}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder=" Username ..." name="username" value={values.username} onChange={handleChanges} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="password" placeholder=" Password ..." name="password" value={values.password} onChange={handleChanges} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" className="rounded-pill md-block">Sign in</Button>
                        </div>
                    </Form>
                    <p className="mt-2 small text-center">Don't have account? <Link to="/auth/sign-up">Sign Up</Link> now</p>
                </>}

            </Card.Body>
        </Card>

    )
}