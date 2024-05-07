import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { IoMdSave } from 'react-icons/io'
import Footer from '../../../components/Footer/Footer'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../../redux/actions/adminAction'
import { useNavigate } from 'react-router-dom'

const ChangePassword = ({ token }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (oldPassword === newPassword) {
            setError("New password can't be same as old password")
        } else if (newPassword !== confirmPassword) {
            setError('Passwords do not match! Re-enter Confirm Password');
        } else {
            dispatch(changePassword(newPassword, token, navigate))
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setError('')
        }
    }


    return (
        <div className="content-page position-relative" id="content">
            <div className="content">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row mt-3">
                            <div className="col-lg-12 col-xl-12">
                                <div className="card-box">
                                    <div className="pt-0">
                                        <div className="mt-3" id="change_pwd">
                                            <form onSubmit={submitHandler}>
                                                <h6 className="mb-4 text-uppercase" style={{ fontWeight: '700' }}>
                                                    <MdAccountCircle className='me-1' size={20} />
                                                    Change Password
                                                </h6>
                                                <div className="row mb-2">
                                                    <div className="col-md-12 mb-3">
                                                        <div className="form-group">
                                                            <label htmlFor="old_password"
                                                                className='form-control-label mb-2 fw-bold'>
                                                                Old Password
                                                            </label>
                                                            <input type="password"
                                                                className="form-control"
                                                                id="old_password"
                                                                name="oldPassword"
                                                                value={oldPassword}
                                                                onChange={(e) => setOldPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-group">
                                                            <label htmlFor="new_password"
                                                                className='form-control-label mb-2 fw-bold'>
                                                                New Password
                                                            </label>
                                                            <input type="password"
                                                                className="form-control"
                                                                id="new_password"
                                                                name="password"
                                                                value={newPassword}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    setNewPassword(inputValue)
                                                                    setIsValid(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(inputValue))
                                                                }}
                                                                required
                                                            />
                                                            {isValid ?
                                                                <p className='text-success mt-1 mb-0' style={{ fontSize: '12px', fontWeight: "bold" }}>Strong Password</p>
                                                                : isValid === false ? <p className='text-danger mt-1 mb-0' style={{ fontSize: '12px', fontWeight: "bold" }}>Weak Password</p>
                                                                    : null
                                                            }
                                                            <p className='text-danger' style={{ fontSize: '12px' }}>
                                                                Password should be minimum 8 digit & which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-group">
                                                            <label htmlFor="confirm_password"
                                                                className='form-control-label mb-2 fw-bold'
                                                            >Confirm Password</label>
                                                            <input type="password"
                                                                className="form-control"
                                                                id="confirm_password"
                                                                name="confirmPassword"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {error && <p className='text-danger'>{error}</p>}

                                                <div className="text-end">
                                                    <button type="submit"
                                                        className="btn btn-success">
                                                        <IoMdSave />
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChangePassword