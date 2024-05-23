import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';

function ListUse() {
    const [table, setTable] = useState([]);
    const { usersId } = useParams();
    const [error, setError] = useState(null);
    const [emailerror, setEmail] = useState(null);
    const [password, setPassword] = useState("Abc@123");
    const [roleData, setSaleTeamData] = useState([]);
    useEffect(() => {
        fetchData();
        fetchData1()
    }, []);
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTable(response.data.users);
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }

    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`http://localhost:3000/api/listrole`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.role;
                setSaleTeamData(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        departmentId: '',
        phoneNumber: '',
        message: '',
        image: null
    });


    const handleChange = (e) => {
        const { name, files } = e.target;
        let new_pass = e.target.value;
        setPassword(new_pass);
        let newname = e.target.value;
        setPassword(newname);
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
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        if (formData.password.length < 8 || !new_pass.match(lowerCase) || !new_pass.match(upperCase) || !new_pass.match(numbers)) {
            setError('Password must be at least 8 chars long Abc.@678', error);
            return;
        }
        if (formData.name == null) {
            setEmail('Invalid Form, First Name can not be empty', emailerror)
            return
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
            const token = localStorage.getItem('token');
            let response
            if (token) {
                response = await axios.post('http://localhost:3000/api/users', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/userlist";
                alert('Users SuccessFully Create');
            }
        } catch (error) {
            alert('Failed to send message.');
        }
    };

    const handleDelete = async (usersId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.delete(`http://localhost:3000/api/users/${usersId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData();
                alert('Data successfully deleted');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('An error occurred while deleting data');
        }
    };

    //Dropdown Navigation
    const [activeService, setOpenDropdown] = useState(null);

    // Function to toggle a specific dropdown
    const toggleDropdown = (serviceName) => {
        setOpenDropdown(activeService === serviceName ? '' : serviceName);
    };
    return (
        <>
            {/*     <!-- Layout wrapper --> */}
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
                    {/*      <!-- Menu --> */}
                    <DashBoardMenus />
                    {/*         <!-- / Menu --> */}

                    {/*     <!-- Layout container --> */}
                    <div class="layout-page">

                        <Navbar />

                        <div class="content-wrapper">



                            <div class="container-xxl flex-grow-1 container-p-y">



                                <div class="row g-4 mb-4">
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Session</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">21,459</h4>
                                                            <small class="text-success">(+29%)</small>
                                                        </div>
                                                        <p class="mb-0">Total Users</p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-primary">
                                                            <i class="bx bx-user bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Paid Users</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">4,567</h4>
                                                            <small class="text-success">(+18%)</small>
                                                        </div>
                                                        <p class="mb-0">Last week analytics </p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-danger">
                                                            <i class="bx bx-user-check bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Active Users</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">19,860</h4>
                                                            <small class="text-danger">(-14%)</small>
                                                        </div>
                                                        <p class="mb-0">Last week analytics</p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-success">
                                                            <i class="bx bx-group bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Pending Users</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">237</h4>
                                                            <small class="text-success">(+42%)</small>
                                                        </div>
                                                        <p class="mb-0">Last week analytics</p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-warning">
                                                            <i class="bx bx-user-voice bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header border-bottom">
                                        <h5 class="card-title">Search Filter</h5>
                                        <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                                            <div class="col-md-4 user_role"><select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option><option value="Admin">Admin</option><option value="Author">Author</option><option value="Editor">Editor</option><option value="Maintainer">Maintainer</option><option value="Subscriber">Subscriber</option></select></div>
                                            <div class="col-md-4 user_plan"><select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option><option value="Basic">Basic</option><option value="Company">Company</option><option value="Enterprise">Enterprise</option><option value="Team">Team</option></select></div>
                                            <div class="col-md-4 user_status"><select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option><option value="Pending" class="text-capitalize">Pending</option><option value="Active" class="text-capitalize">Active</option><option value="Inactive" class="text-capitalize">Inactive</option></select></div>
                                        </div>
                                    </div>
                                    <div class="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2"><div class="me-3"><div class="dataTables_length" id="DataTables_Table_0_length"><label><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div></div></div><div class="col-md-10"><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label></div><div class="dt-buttons btn-group flex-wrap"> <div class="btn-group"><button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3" tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div> <button class="btn btn-secondary add-new btn-primary" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser"><span><i class="bx bx-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add New User</span></span></button> </div></div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label=""></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="353px;" aria-label="User: activate to sort column ascending" aria-sort="descending">So.Id</th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="353px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">User Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="118px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Status: activate to sort column ascending">Role</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item ,index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">
                                                                <div class="d-flex justify-content-start align-items-center user-name">
                                                                    <div class="avatar-wrapper"><div class="avatar avatar-sm me-3">
                                                                        <img src={`http://localhost:3000/uploads/${item.image}`} alt="Avatar" class="rounded-circle" />
                                                                    </div>
                                                                    </div>
                                                                    <div class="d-flex flex-column">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{index +1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.userName}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.Role && item.Role.Name}</td>
                                                            <td><div class="d-inline-block text-nowrap">
                                                                <button class="btn btn-sm btn-icon" onClick={() => toggleDropdown('dropdownprofile')}>
                                                                    <i class="bx bx-edit"></i>
                                                                </button>
                                                                <button class="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                    <i class="bx bx-trash"></i>
                                                                </button>
                                                                
                                                                {activeService === 'dropdownprofile' && (<div classNmae="dropdown-menu dropdown-menu-end m-0">
                                                                    <Link to={`/userviews/${item.id}`} classNmae="dropdown-item">View</Link></div>)}</div></td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                                        <div class="offcanvas-header">
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add User</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                    <label class="form-label" for="add-user-fullname">Full Name</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='name'
                                                        onChange={handleChange}
                                                        value={formData.name} aria-label="John Doe" />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname">User Name</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='userName'
                                                        onChange={handleChange}
                                                        value={formData.userName} aria-label="John Doe" />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-email">Email</label>
                                                    <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com"  name='email'
                                                        onChange={handleChange}
                                                        value={formData.email} />

                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                <div class="mb-3">
                                                    <label class="form-label" for="add-user-contact">Contact</label>
                                                    <input type="text" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11"  name="phoneNumber"
                                                        onChange={handleChange}
                                                        value={formData.phoneNumber} />
                                                </div>
                                                <div class="mb-3">

                                                    <label class="form-label" for="basic-icon-default-password">Password</label>
                                                    <input type="password"
                                                        onChange={handleChange}
                                                        name='password'
                                                        value={formData.password}
                                                        class="form-control password-mask"
                                                        id="basic-default-password12"
                                                        placeholder="Abc@123"
                                                        aria-describedby="basic-default-password2" />
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlSelect2" class="form-label">Roles</label>

                                                    <label class="form-label" for="modalEditUserStatus"></label>
                                                    <select
                                                        id="modalEditUserStatus"
                                                        className="form-select"
                                                        name="departmentId"
                                                        value={formData.departmentId}
                                                        onChange={handleChange}
                                                    >
                                                        {roleData.map((option) => (
                                                            <option value={option.id}>{option.Name}</option>
                                                        ))}
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
                                                <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                <input type="hidden" /></form>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            {/*                <!-- / Content --> */}




                            {/*  <!-- Footer --> */}

                            <Footer />

                            {/*      <!-- / Footer --> */}

                        </div>
                    </div >
                    {/*     <!-- Overlay --> */}
                    < div class="layout-overlay layout-menu-toggle" ></div >
                </div >
                {/* / Layout wrapper  */}

            </div >

        </>
    )
}

export default ListUse