import React, { useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
function RegistersP(onLogout) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        roleName: '',
        phoneNumber: '',
        message: '',
        image: null
    });
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const handleChange = async (e) => {
        const { name, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: files[0]  // Handle files differently
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }

        if (!validateEmail(formData.email)) {
            setError('Invalid Email', error);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 chars long', error);
            return;
        }

        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
                }
            });
            console.log(response.data);
            alert('Message sent!');
        } catch (error) {
            alert('Failed to send message.');
        }
    };

    return (
        /*      <!-- Layout wrapper --> */
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                {/*       <!-- Menu -->*/}
                <DashBoardMenus />
                {/*             <!-- / Menu -->
    
            <!-- Layout container --> */}
                <div class="layout-page">
                    {/*         <!-- Navbar --> */}
                    <Navbar />
                    {/*              <!-- / Navbar -->

                    {/*       <!-- Content wrapper --> */}
                    <div class="content-wrapper">
                        {/*     <!-- Content --> */}

                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Forms/</span>Add User</h4>

                            {/*       <!-- Basic Layout --> */}
                            <div class="row">
                                <div class="col-xl">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex justify-content-between align-items-center">
                                            <h5 class="mb-0">Basic with Information</h5>
                                            <small class="text-muted float-end">Merged input group</small>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div class="mb-3">
                                                    <label class="form-label" for="basic-icon-default-fullname">Full Name</label>
                                                    <div class="input-group input-group-merge">
                                                        <span id="basic-icon-default-fullname2" class="input-group-text"
                                                        ><i class="bx bx-user"></i
                                                        ></span>
                                                        <input
                                                            type="text"
                                                            name='name'
                                                            onChange={handleChange}
                                                            value={formData.name}
                                                            class="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="Full Name"
                                                            aria-label="Full Name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" for="basic-icon-default-fullname">User Name</label>
                                                    <div class="input-group input-group-merge">
                                                        <span class="input-group-text" id="basic-addon11">@</span>
                                                        <input
                                                            type="text"
                                                            name='userName'
                                                            onChange={handleChange}
                                                            value={formData.userName}
                                                            class="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="John Doe"
                                                            aria-label="John Doe"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                        />
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <label class="form-label" for="basic-icon-default-email">Email</label>
                                                    <div class="input-group input-group-merge">
                                                        <span class="input-group-text"><i class="bx bx-envelope"></i></span>
                                                        <input
                                                            type="text"
                                                            id="basic-icon-default-email"
                                                            name='email'
                                                            onChange={handleChange}
                                                            value={formData.email}
                                                            class="form-control"
                                                            placeholder="john.doe"
                                                            aria-label="john.doe"
                                                            aria-describedby="basic-icon-default-email2"
                                                        />
                                                        <span id="basic-icon-default-email2" class="input-group-text">@example.com</span>
                                                    </div>
                                                    <div class="form-text">You can use letters, numbers & periods</div>
                                                </div>


                                                <div class="mb-3 row">

                                                    <label class="form-label" for="basic-icon-default-password">Password</label>
                                                    <div class="input-group input-group-merge">
                                                        <span id="basic-default-password2" class="input-group-text cursor-pointer"
                                                        ><i class="bx bx-hide"></i
                                                        ></span>
                                                        <input type="password"
                                                            onChange={handleChange}
                                                            name='password'
                                                            value={formData.password}
                                                            class="form-control password-mask"
                                                            id="basic-default-password12"
                                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                            aria-describedby="basic-default-password2" />
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" for="basic-icon-default-phone">Phone No</label>
                                                    <div class="input-group input-group-merge">
                                                        <span id="basic-icon-default-phone2" class="input-group-text"
                                                        ><i class="bx bx-phone"></i
                                                        ></span>
                                                        <input
                                                            type="text"
                                                            id="basic-icon-default-phone"
                                                            onChange={handleChange}
                                                            name='phoneNumber'
                                                            value={formData.phoneNumber}
                                                            class="form-control phone-mask"
                                                            placeholder="658 799 8941"
                                                            aria-label="658 799 8941"
                                                            aria-describedby="basic-icon-default-phone2"
                                                        />
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <label for="exampleFormControlSelect2" class="form-label">Roles</label>
                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="roleName" value={formData.roleName} onChange={handleChange}>
                                                        <option value="">Select</option>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Instructor">Instructor</option>
                                                        <option value="Student">Student</option>
                                                        <option value="Guest/Viewer">Guest/Viewer</option>
                                                        <option value="Sale Team">Sale Team</option>
                                                        <option value="Telecaller Department">Telecaller Department</option>
                                                        <option value="Front Desk">Front Desk</option>
                                                        <option value="Receptions Desk">Receptions Desk</option>
                                                        <option value="Counselor Department">Counselor Department</option>
                                                        <option value="Account Department">Account Department</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label" for="basic-icon-default-message">Message</label>
                                                    <div class="input-group input-group-merge">
                                                        <span id="basic-icon-default-message2" class="input-group-text"
                                                        ><i class="bx bx-comment"></i></span>
                                                        <textarea
                                                            id="basic-icon-default-message"
                                                            class="form-control"
                                                            placeholder="Hi, Do you have a moment to talk Joe?"
                                                            aria-label="Hi, Do you have a moment to talk Joe?"
                                                            aria-describedby="basic-icon-default-message2"
                                                            name="message" value={formData.message} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="input-group">
                                                        <input
                                                            type="file"
                                                            class="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                            name="file"
                                                            accept="image/png, image/jpeg"
                                                            value={formData.image} onChange={handleChange}
                                                        />
                                                        <button class="btn btn-outline-primary" type="button" id="inputGroupFileAddon04">Button</button>
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-primary">Send</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*         <!-- / Content -->
    
                         <!-- Footer --> */}
                        <Footer />
                        {/*       <!-- / Footer --> */}

                        <div class="content-backdrop fade"></div>
                    </div>
                    {/*      <!-- Content wrapper --> */}
                </div>
                {/*           <!-- / Layout page --> */}
            </div >

            {/*   <!-- Overlay --> */}
            < div class="layout-overlay layout-menu-toggle" ></div >
        </div >

    )
}
export default RegistersP;