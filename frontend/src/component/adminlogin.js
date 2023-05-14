import React, { useState } from 'react';
import LoginBg from '../login1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css';
// import { application } from 'express';
const Loginadmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/adminlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 422 || !data) {
      toast.error('invalid Credentials');
    } else if (!email || !password) {
      toast.error('plz filled property');
    } else {
      toast.success('login Successfull');
      navigate('/main2');
    }
  };

  return (
    <>
      <div
        className="bg"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(150, 0, 250, 0.1), rgba(0, 19, 100, 0)), url(${LoginBg}) `,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          // opacity: 1,
          width: '100%',
        }}
      >
        <div className="Auth-form-container">
          <form method="POST" className="Auth-form">
            <div className="Auth-form-content">
              <h2 className="Auth-form-title">Sign In</h2>
              <div className="form-group mt-3">
                {/* <label>Email address</label>
                                <input
                                    type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                                    className="form-control mt-1" name='email'
                                    placeholder="Enter email"
                                /> */}

                <input
                  type="email"
                  className="form-control mt-1"
                  name="email"
                  id="email"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email*"
                ></input>
              </div>
              <div className="form-group mt-3">
                {/* <label>Password</label>
                                <input
                                    type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                                    className="form-control mt-1"   name='password'
                                    placeholder="Enter password"
                                /> */}
                <input
                  type="password"
                  className="form-control mt-1"
                  name="password"
                  id="password"
                  autoComplete="on"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password*"
                ></input>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" onClick={loginUser} className="btn btn">
                  {/* <NavLink to="/main2" style={{color:'white',textDecoration:'none'}}>Submit</NavLink> */}
                  <NavLink style={{ color: 'white', textDecoration: 'none' }}>
                    Submit
                  </NavLink>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Loginadmin;
