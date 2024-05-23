import React, { useState } from 'react';

function LoginPage({ onLogin }) {
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        email: '',
        password: '',
    });
/*     const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }; */

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
     
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state;

     /*    if (!validateEmail(email)) {
            setError('Invalid Email',error);
            return;
        } */

      /*   if (password.length < 8) {
            setError('Password must be at least 8 chars long',error);
            return;
        }
 */
       /*  setError(null); */
             // Assuming onLogin returns a promise
             try {
                const response = await onLogin(email, password);
                if (!response.success) {
                    setError(response.message);
                }
            } catch (error) {
                setError('An error occurred while logging in');
            }
    
    };
    return (
        <div>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        {/* <!-- Register --> */}
                        <div className="card">
                            <div className="card-body">
                                {/* <!-- Logo --> */}
                                <div className="app-brand justify-content-center">
                                    <a href="/dashboard" className="app-brand-link gap-2">
                                        <span className="app-brand-logo demo"></span>
                                        <span className="app-brand-text demo text-body fw-bolder">LMS</span>
                                    </a>
                                </div>
                                {/* <!-- /Logo --> */}
                                <h4 className="mb-2">Welcome to Lms! 👋</h4>
                                <p className="mb-4">Please sign-in to your account and start the adventure</p>
                               
                             
                                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email or Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={state.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email or username"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <a href="auth-forgot-password-basic.html">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                value={state.password}
                                                onChange={handleChange}
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                            />
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" />
                                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <!-- /Register --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
