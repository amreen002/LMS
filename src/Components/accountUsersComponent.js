import React, { useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
function AccountP() {

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

    const handleChange = (e) => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.post('http://localhost:3000/api/users', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file upload
                         Authorization: `Bearer ${token}`

                    }
                });
                console.log(response.data);
                alert('Message sent!');
            }
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
                        {/*    <!-- Content --> */}

                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Account Settings /</span> Account</h4>

                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="nav nav-pills flex-column flex-md-row mb-3">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-user me-1"></i> Account</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="pages-account-settings-notifications.html"
                                            ><i class="bx bx-bell me-1"></i> Notifications</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="pages-account-settings-connections.html"
                                            ><i class="bx bx-link-alt me-1"></i> Connections</a
                                            >
                                        </li>
                                    </ul>
                                    <div class="card mb-4">
                                        <h5 class="card-header">Profile Details</h5>
                                        {/*   <!-- Account --> */}
                                        <div class="card-body">
                                            <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                <img
                                                    src="../assets/img/avatars/1.png"
                                                    alt="user-avatar"
                                                    class="d-block rounded"
                                                    height="100"
                                                    width="100"
                                                    id="uploadedAvatar"
                                                />
                                                <div class="button-wrapper ">
                                                    <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                                                        <span class="d-none d-sm-block">Upload new photo</span>
                                                        <i class="bx bx-upload d-block d-sm-none"></i>
                                                        <input
                                                            type="file"
                                                            id="upload"
                                                            class="account-file-input"
                                                            hidden
                                                            name="file"
                                                            accept="image/png, image/jpeg"
                                                            value={formData.image} onChange={handleChange}
                                                        />
                                                    </label>
                                                    <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                        <i class="bx bx-reset d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Reset</span>
                                                    </button>

                                                    <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-0" />
                                        <div class="card-body">
                                            <form id="formAccountSettings" method="POST" onSubmit={handleSubmit}>
                                                <div class="row">
                                                    <div class="mb-3 col-md-6">
                                                        <label for="firstName" class="form-label">Full Name</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="name"
                                                            name='name'
                                                            onChange={handleChange}
                                                            value={formData.name}
                                                            autofocus
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="lastName" class="form-label">User Name</label>
                                                        <input class="form-control" type="text" name='userName' id='user-name'
                                                            onChange={handleChange}
                                                            value={formData.userName} />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="email" class="form-label">E-mail</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            value={formData.email}
                                                            placeholder="john.doe@example.com"
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="form-label" for="phoneNumber">Phone Number</label>
                                                        <div class="input-group input-group-merge">
                                                            <span class="input-group-text">(+91)</span>
                                                            <input
                                                                type="text"
                                                                id="phoneNumber"
                                                                name="phoneNumber"
                                                                onChange={handleChange}
                                                                value={formData.phoneNumber}
                                                                class="form-control"
                                                                placeholder="202 555 0111"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="form-label" for="basic-icon-default-password">Password</label>
                                                        <input
                                                            type="password"
                                                            onChange={handleChange}
                                                            name='password'
                                                            value={formData.password}
                                                            class="form-control password-mask"
                                                            id="basic-default-password12"
                                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                            aria-describedby="basic-default-password2"
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="exampleFormControlSelect2" class="form-label">Roles</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="roleName" value={formData.roleName} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="Admin">Admin</option>
                                                            <option value="Instructor">Instructor</option>
                                                            <option value="Student">Student</option>
                                                            <option value="Guest/Viewer">Guest/Viewer</option>
                                                            <option value="Sale Team"> Sale Team</option>
                                                            <option value="Telecaller Department">Telecaller Department</option>
                                                            <option value="Telecaller Team">Telecaller Team</option>
                                                            <option value="Receptions Desk Or Visitor">Receptions Desk Or Visitor</option>
                                                            <option value="Receptions Desk">Receptions Desk</option>
                                                            <option value="Counselor Department">Counselor Department</option>
                                                            <option value="Account Department">Account Department</option>
                                                            <option value="Counseling Department">Counseling Department</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="basic-icon-default-message">Message</label>
                                                        <div class="input-group input-group-merge">
                                                            <span id="basic-icon-default-message2" class="input-group-text"
                                                            ><i class="bx bx-comment"></i
                                                            ></span>
                                                            <textarea
                                                                id="basic-icon-default-message"
                                                                class="form-control"
                                                                placeholder="Hi, Do you have a moment to talk Joe?"
                                                                aria-label="Hi, Do you have a moment to talk Joe?"
                                                                aria-describedby="basic-icon-default-message2"
                                                                name="message" value={formData.message} onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <button type="submit" class="btn btn-primary me-2">Save changes</button>
                                                    <button type="reset" class="btn btn-outline-secondary">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                        {/*       <!-- /Account --> */}
                                    </div>
                                    <div class="card">
                                        <h5 class="card-header">Delete Account</h5>
                                        <div class="card-body">
                                            <div class="mb-3 col-12 mb-0">
                                                <div class="alert alert-warning">
                                                    <h6 class="alert-heading fw-bold mb-1">Are you sure you want to delete your account?</h6>
                                                    <p class="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                                                </div>
                                            </div>
                                            <form id="formAccountDeactivation" onsubmit="return false">
                                                <div class="form-check mb-3">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        name="accountActivation"
                                                        id="accountActivation"
                                                    />
                                                    <label class="form-check-label" for="accountActivation"
                                                    >I confirm my account deactivation</label
                                                    >
                                                </div>
                                                <button type="submit" class="btn btn-danger deactivate-account">Deactivate Account</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*        <!-- / Content --> */}

                        {/*      <!-- Footer --> */}
                        <Footer />
                        {/*   <!-- / Footer --> */}

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
export default AccountP;