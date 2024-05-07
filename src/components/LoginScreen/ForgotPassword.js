import React, { useState } from 'react'
import "./login.css"
import Home from "../../images/home.png"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/actions/adminAction';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }



    return (
        <>
            <div className='auth-fluid position-realtive d-flex flex-row center min-vh-100'>
                <div className='auth-fluid-form-box position-relative w-100'>
                    <div className='d-flex h-100'>
                        <div className='card-body'>
                            <div className='auth-brand center mb-5 pb-4'>
                                <img src={Home} alt='' className='w-25' style={{ height: "50px" }} />
                            </div>

                            <Form onSubmit={submitHandler}>
                                <h5 className="fw-bold">Recover Password</h5>
                                <p className="text-muted mb-4" style={{ fontSize: "15px" }}>
                                    Enter your email address and we'll send you an email with instructions to reset your password.
                                </p>

                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email here"
                                        className='shadow-none'
                                        required
                                        style={{ borderRadius: "3px" }}
                                    />
                                </Form.Group>

                                <div className="d-grid  ">
                                    <Button variant="primary" type="submit" style={{ borderRadius: "3px" }}>
                                        Reset Password
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className='auth-fluid-right position-relative text-center'>
                    <div className="auth-user-testimonial">
                        <h2 className="mb-3 text-white" style={{ fontWeight: "600" }}>
                            I love the color!
                        </h2>
                        <p className="lead text-white">
                            <ImQuotesLeft size={15} style={{ marginTop: "-15px", marginRight: "5px" }} />
                            I've been using your theme from the previous developer for our web app, once I knew new version is out, I immediately bought with no hesitation. Great themes, good documentation with lots of customization available and sample app that really fit our need.
                            <ImQuotesRight size={15} style={{ marginTop: "-15px", marginLeft: "5px" }} />
                        </p>
                        <h5 className="text-white">
                            - Fadlisaad (Ubold Admin User)
                        </h5>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ForgotPassword