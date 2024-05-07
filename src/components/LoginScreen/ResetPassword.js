import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../redux/actions/adminAction'
import Logo from "../../images/logo.png"


const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState()
    const [showPasswordConditions, setShowPasswordConditions] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowPasswordConditions(true);
        const inputValue = e.target.value;
        setIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(inputValue))
    };

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        } else {
            dispatch(changePassword(password, token, navigate))
            setPassword('')
            setConfirmPassword('')
            setError('')
        }
    }

    return (
        <div className='auth-fluid position-realtive d-flex flex-row center min-vh-100'>
            <div className='auth-fluid-form-box position-relative w-100' style={{ maxWidth: '412px' }}>
                <div className='d-flex center h-100'>
                    <div className='card-body'>
                        <div className='auth-brand center mb-4'>
                            <img src={Logo} alt='logo' style={{ height: "70px" }} />
                        </div>

                        <Form className='reset_form' onSubmit={submitHandler}>
                            <h3 className="mb-4"
                                style={{ lineHeight: '1.4' }}>
                                Create a New Password
                            </h3>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    name='password'
                                    className='shadow-none'
                                    style={{ borderRadius: "3px" }}
                                    required
                                />
                                {isValid ?
                                    <p className='text-success mt-1 mb-0' style={{ fontSize: '12px', fontWeight: "bold" }}>Strong Password</p>
                                    : isValid === false ? <p className='text-danger mt-1 mb-0' style={{ fontSize: '12px', fontWeight: "bold" }}>Weak Password</p>
                                        : null
                                }
                                {showPasswordConditions && (
                                    <div>
                                        <p className='text-danger mb-0' style={{ fontSize: '12px' }}>
                                            Password should be minimum 8 digit & which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
                                        </p>
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-1">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='shadow-none'
                                    style={{ borderRadius: "3px" }}
                                    required
                                />
                            </Form.Group>

                            {error && <p className='text-danger mb-0' style={{ fontSize: "13px" }}>{error}</p>}

                            <div className="mt-4">
                                <Button variant="primary" type="submit" style={{ borderRadius: "3px" }}>
                                    Save Password
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <div className='auth-fluid-right position-relative center 1'>
                <div className='auth-user-testimonial'></div>
            </div>
        </div>
    )
}

export default ResetPassword