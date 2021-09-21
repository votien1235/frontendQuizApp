import React, { useContext, useEffect, useState } from "react";
import authCtx from "../../context/auth";
import { useHistory } from "react-router-dom";
import { Container, Form, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Avatar } from "../shared/Avatar";
import axios from "../../utils/axios";
import { Loading } from "../shared/Loading";

const Profile = () => {
    const { authUser, setAuthUser } = useContext(authCtx);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isPasswordChanging, setIsPasswordChanging] = useState(false);
    const [isSucceeded, setIsSucceeded] = useState(false);
    const [err, setErr] = useState(null)
    const history = useHistory()
    const [values, setValues] = useState({
        photoUrl: authUser.photoUrl ? authUser.photoUrl : undefined,
        displayName: authUser.displayName ? authUser.displayName : undefined,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })


    useEffect(() => {
        if (!authUser) {
            history.push("/")
        }
    }, [history, authUser]);

    if (!authUser) {
        return null;
    }
    const handleChanges = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    };


    const fileInputOnChange = async (event) => {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setValues({
                ...values,
                photoUrl: "http://localhost:5000" + res.data.filePath
            })
        } catch (err) {
            console.log(err)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, photoUrl } = values
        setIsUpdatingProfile(true)
        const res = await axios.put("/auth/me", { displayName, photoUrl });
        setAuthUser(res.data)
        setIsUpdatingProfile(false);
    }

    const errCur = "Current password  cannot be empty!";
    const errNewPassword = " New password cannot be empty!";
    const errConfirmPassword = "ConfirmPassword cannot be empty!";

    const handleChangePassword = async (event) => {
        event.preventDefault();
        setIsSucceeded(false)
        setIsPasswordChanging(true)
        setErr(null)
        if (!values.currentPassword) {
            setErr(errCur);
            return setIsPasswordChanging(false);
        }
        if (!values.newPassword) {
            setErr(errNewPassword);
            return setIsPasswordChanging(false);
        }
        if (!values.confirmPassword) {
            setErr(errConfirmPassword);
            return setIsPasswordChanging(false);
        }
        if (values.newPassword !== values.confirmPassword) {
            setErr("Confirm password not matched")
            return setIsPasswordChanging(false);
        }
        const { currentPassword, newPassword } = values;
        try {

            await axios.put("/auth/me/change-password", { currentPassword, newPassword });
            setIsSucceeded(true)
        } catch (err) {

        }
        finally {
            setIsPasswordChanging(false)
        }
    }

    return (


        <Container youstyle={{ fontSize: "x-large" }}>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }} xl={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Header><h3>Profile:</h3></Card.Header>
                        <Card.Body >
                            <div className=" d-flex flex-column align-items-center">
                                <Avatar size="xl" src={values.photoUrl} />
                                <input type="file" className="border mt-3" onChange={fileInputOnChange} />
                            </div>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" disabled value={authUser.username} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder=" Enter display name ..."
                                    name="displayname"
                                    value={values.displayName}
                                    onChange={handleChanges} />
                            </Form.Group>
                            {isUpdatingProfile ? <Loading text="Updating...." /> : <>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" onClick={handleSubmit} className="rounded-pill md-block">Update Profile</Button>
                                </div>
                            </>}
                        </Card.Body>
                    </Card>
                    <hr className="my-5" />
                    <Card>
                        <Card.Header><h3>Change Password:</h3></Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="currentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" placeholder=" 
                                Enter your current password ..."
                                    name="currentPassword"
                                    value={values.currentPassword}
                                    onChange={handleChanges} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password"
                                    placeholder=" Enter new password ..."
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChanges} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="password"
                                    placeholder=" Enter confirm password ..."
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChanges} />
                            </Form.Group>
                            {isPasswordChanging ? <Loading text="Changing your password ..." /> :
                                <>{err && <Alert variant="danger" style={{ textAlign: "center" }}>{err}</Alert>}
                                    {isSucceeded && <Alert variant="success">Changed successfully!</Alert>}
                                    <div className="d-grid gap-2 mb-5">
                                        <Button variant="primary" type="submit" onClick={handleChangePassword} className="rounded-pill md-block">Change Password</Button>
                                    </div>
                                </>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


    )
}

export default Profile;