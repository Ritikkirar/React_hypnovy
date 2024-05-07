import React, { useEffect, useState } from 'react'
import "./login.css"
import Logo from "../../images/logo.png"
import Button from 'react-bootstrap/Button';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminlogin } from '../../redux/actions/adminAction';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState("password");
  const [isChecked, setIsChecked] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.checkbox && localStorage.email !== '') {
      setIsChecked(true)
      setEmail(localStorage.username)
    }
  }, [])


  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return
    }
    setPasswordType("password")
  }

  const onChangeCheckbox = (e) => {
    setIsChecked(e.target.checked)
  }


  const LoginHandler = async (e) => {
    e.preventDefault();
    if (isChecked && email !== '') {
      localStorage.username = email
      localStorage.checkbox = isChecked
    } else if (isChecked === false) {
      localStorage.removeItem('username')
      localStorage.removeItem('checkbox')
    }
    dispatch(adminlogin(email, password))
  }


  return (
    <>
      <div className='auth-fluid position-realtive d-flex flex-row center min-vh-100'>
        <div className='auth-fluid-form-box position-relative w-100'>
          <div className='d-flex center h-100'>
            <div className='card-body'>
              <div className='auth-brand center'>
                <img src={Logo} alt='logo' className='w-75' style={{ height: "70px" }} />
              </div>
              <h4 className="mt-3">Sign In</h4>
              <p className="text-muted mb-4">Enter your email address and password to access account.</p>

              <Form onSubmit={LoginHandler} >
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

                <Form.Group className="mb-4 position-relative" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Link to="/forgot-password" className='float-end forgot_password mt-2'>
                    Forgot your password?
                  </Link>

                  <Form.Control
                    type={passwordType}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    placeholder="Enter password"
                    className='shadow-none position-relative'
                    required
                    style={{ borderRadius: "3px" }}
                  />

                  <div className='input-group-text'>
                    <div onClick={togglePassword}>
                      {passwordType === "password" ?
                        <BsEye className="eye_icon position-absolute end-0 mb-2 text-center" size={20} />
                        : <BsEyeSlash className="eye_icon position-absolute end-0 mb-2 text-center" size={20} />}
                    </div>
                  </div>

                </Form.Group>
                <Form.Group className="mb-4 shadow-none" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me"
                    checked={isChecked} onChange={onChangeCheckbox}
                  />
                </Form.Group>

                <div className="d-grid  ">
                  <Button variant="danger " type="submit" style={{ borderRadius: "3px" }}>
                    Login
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

    </>
  )
}

export default Login