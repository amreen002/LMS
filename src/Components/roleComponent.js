import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Modal } from 'bootstrap';

function AddRoleForm() {
    const [Name, setName] = useState('');
    const [Create, setCreate] = useState(''); // State to manage permissions
    const [Update, setUpdate] = useState(''); // State to manage permissions
    const [Delete, setDelete] = useState(''); // State to manage permissions
    const [Read, setRead] = useState(''); // State to manage permissions
    const [RoleId, setRoleId] = useState(''); // State to manage permissions
    const [UserId, setUserId] = useState(''); // State to manage permissions
    const [saleTeamData, setSaleTeamData] = useState([]);
    const [roleData, setroleData] = useState({});
    const { roleId } = useParams();
    const [modal, setModal] = useState(null);

    const handleModalOpen = () => {
        if (modal) {
            const modalInstance = new Modal(modal);
            modalInstance.show();
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData1(roleId)
    }, [roleId]);


    const fetchData = async () => {
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






    const fetchData1 = async (roleId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`http://localhost:3000/api/listrole/${roleId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.role;
                setroleData(userData)
                setName(userData.Name)
                // Set permissions based on API response
                setPermissions([
                    {
                        modelName: 'Lead',
                        Create: userData.UserPermissionRoles.Create,
                        Read: userData.UserPermissionRoles.Read,
                        Update: userData.UserPermissionRoles.Update,
                        Delete: userData.UserPermissionRoles.Delete,
                    },
                    {
                        modelName: 'User',
                        Create: userData.UserPermissionRoles.Create,
                        Read: userData.UserPermissionRoles.Read,
                        Update: userData.UserPermissionRoles.Update,
                        Delete: userData.UserPermissionRoles.Delete,
                    },
                    {
                        modelName: 'Lead Allotted',
                        Create: userData.UserPermissionRoles.Create,
                        Read: userData.UserPermissionRoles.Read,
                        Update: userData.UserPermissionRoles.Update,
                        Delete: userData.UserPermissionRoles.Delete,
                    },
                    {
                        modelName: 'Lead Allotted View',
                        Create: userData.UserPermissionRoles.Create,
                        Read: userData.UserPermissionRoles.Read,
                        Update: userData.UserPermissionRoles.Update,
                        Delete: userData.UserPermissionRoles.Delete,
                    },
                ]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleChange = (e, index, item) => {
        const { name, checked } = e.target;
        setPermissions(prevState => {
            const updatedPermissions = [...prevState];
            updatedPermissions[index][name] = checked ? true : false;
            return updatedPermissions;
        });
    };


    const [permissions, setPermissions] = useState(() => JSON.parse(localStorage.getItem('permissions')) || [
        {
            modelName: 'Lead',
            Create: false,
            Read: false,
            Update: false,
            Delete: false,
        },
        {
            modelName: 'User',
            Create: false,
            Read: false,
            Update: false,
            Delete: false,
        },
        {
            modelName: 'Lead Allotted',
            Create: false,
            Read: false,
            Update: false,
            Delete: false,
        },
        {
            modelName: 'Lead Allotted View',
            Create: false,
            Read: false,
            Update: false,
            Delete: false,
        },
    ]);

    useEffect(() => {
        localStorage.setItem('permissions', JSON.stringify(permissions));
    }, [permissions]);





    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            Name,
            permission: permissions
        };



        try {
            const token = localStorage.getItem('token');
            if (token) {

                let response = await fetch('http://localhost:3000/api/addrole', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                })


                if (response.status === 200) {
                    alert('Department Create successfully');
                    navigate('/role');
                }


            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedUserData = {
                Name,
                permission: permissions
            };
            if (token) {
                await axios.put(`http://localhost:3000/api/viewsrole/${roleId}`, updatedUserData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData1(roleId);
                alert('User Permission updated successfully')

            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('An error occurred while updating user data');
        }
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


                                <h4 class="py-3 mb-2">Department List</h4>

                                <p>A role provided access to predefined menus and features so that depending on <br></br> assigned role an administrator can have access to what user needs.</p>

                                <div class="row g-4">
                                    <div class="col-xl-4 col-lg-6 col-md-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <h6 class="fw-normal">Total 4 users</h6>
                                                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Vinnie Mostowy" data-bs-original-title="Vinnie Mostowy">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Allen Rieske" data-bs-original-title="Allen Rieske">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Julee Rossignol" data-bs-original-title="Julee Rossignol">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kaith D'souza" data-bs-original-title="Kaith D'souza">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="John Doe" data-bs-original-title="John Doe">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <div class="role-heading">
                                                        <h4 class="mb-1">Administrator</h4>
                                                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal"><small>Edit Role</small></a>
                                                    </div>
                                                    <a href="javascript:void(0);" class="text-muted"><i class="bx bx-copy"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-md-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <h6 class="fw-normal">Total 7 users</h6>
                                                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Jimmy Ressula" data-bs-original-title="Jimmy Ressula">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="John Doe" data-bs-original-title="John Doe">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kristi Lawker" data-bs-original-title="Kristi Lawker">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kaith D'souza" data-bs-original-title="Kaith D'souza">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Danny Paul" data-bs-original-title="Danny Paul">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <div class="role-heading">
                                                        <h4 class="mb-1">Manager</h4>
                                                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal"><small>Edit Role</small></a>
                                                    </div>
                                                    <a href="javascript:void(0);" class="text-muted"><i class="bx bx-copy"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-md-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <h6 class="fw-normal">Total 5 users</h6>
                                                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Andrew Tye" data-bs-original-title="Andrew Tye">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Rishi Swaat" data-bs-original-title="Rishi Swaat">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Rossie Kim" data-bs-original-title="Rossie Kim">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kim Merchent" data-bs-original-title="Kim Merchent">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Sam D'souza" data-bs-original-title="Sam D'souza">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <div class="role-heading">
                                                        <h4 class="mb-1">Users</h4>
                                                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal"><small>Edit Role</small></a>
                                                    </div>
                                                    <a href="javascript:void(0);" class="text-muted"><i class="bx bx-copy"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-md-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <h6 class="fw-normal">Total 3 users</h6>
                                                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kim Karlos" data-bs-original-title="Kim Karlos">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Katy Turner" data-bs-original-title="Katy Turner">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Peter Adward" data-bs-original-title="Peter Adward">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kaith D'souza" data-bs-original-title="Kaith D'souza">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="John Parker" data-bs-original-title="John Parker">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <div class="role-heading">
                                                        <h4 class="mb-1">Support</h4>
                                                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal"><small>Edit Role</small></a>
                                                    </div>
                                                    <a href="javascript:void(0);" class="text-muted"><i class="bx bx-copy"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-md-6">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between mb-2">
                                                    <h6 class="fw-normal">Total 2 users</h6>
                                                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Kim Merchent" data-bs-original-title="Kim Merchent">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Sam D'souza" data-bs-original-title="Sam D'souza">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Nurvi Karlos" data-bs-original-title="Nurvi Karlos">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Andrew Tye" data-bs-original-title="Andrew Tye">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Rossie Kim" data-bs-original-title="Rossie Kim">
                                                            <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar" />
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-end">
                                                    <div class="role-heading">
                                                        <h4 class="mb-1">Restricted User</h4>
                                                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal"><small>Edit Role</small></a>
                                                    </div>
                                                    <a href="javascript:void(0);" class="text-muted"><i class="bx bx-copy"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 col-lg-6 col-md-6">
                                        <div class="card h-100">
                                            <div class="row h-100">
                                                <div class="col-sm-5">
                                                    <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-3">
                                                        <img src="../../assets/img/illustrations/sitting-girl-with-laptop-light.png" class="img-fluid" alt="Image" width="120" data-app-light-img="illustrations/sitting-girl-with-laptop-light.png" data-app-dark-img="illustrations/sitting-girl-with-laptop-dark.png" />
                                                    </div>
                                                </div>
                                                <div class="col-sm-7">
                                                    <div class="card-body text-sm-end text-center ps-sm-0">
                                                        <button data-bs-target="#addRoleModal" data-bs-toggle="modal" class="btn btn-primary mb-3 text-nowrap add-new-role">Add New Department</button>
                                                        <p class="mb-0">Add role, if it does not exist</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">

                                        <div class="card">
                                            <div class="card-header border-bottom">
                                                <h3>Department Permissions</h3>
                                            </div>
                                            <div class="card-datatable table-responsive">

                                                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2"><div class="me-3"><div class="dataTables_length" id="DataTables_Table_0_length"><label><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div></div></div><div class="col-md-10"><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                </label></div><div class="dt-buttons btn-group flex-wrap"> </div></div></div></div>
                                                    <form>


                                                        <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ display: "none" }} class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="User: activate to sort column ascending" aria-sort="descending"></th>
                                                                    <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                                    <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" width="250px;" aria-label="">Department Name</th>
                                                                    {/*                                                                     <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Plan: activate to sort column ascending">Create </th>
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">Update</th>
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Read</th>
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Delete</th>
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Submit</th> */}

                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Plan: activate to sort column ascending">Action </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {saleTeamData.map((item, index) => (
                                                                    <tr key={item.id}>
                                                                        {/*    <td className="sorting_1">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={selectedItem && selectedItem.id === item.id}
                                                                                onChange={(e) => handleCheckboxChange(e, item)}
                                                                            />
                                                                        </td> */}
                                                                        {/*  <td style={{ display: "none" }}>
                                                                            {selectedItem && selectedItem.id === item.id ? (
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="add-user-fullname"
                                                                                    placeholder="John Doe"
                                                                                    name='RoleId'
                                                                                    value={RoleId}
                                                                                    onChange={(e) => setRoleId(e.target.value)}
                                                                                />
                                                                            ) : (
                                                                                <span>{item && item.id}</span>
                                                                            )}
                                                                        </td> */}
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.Name}</td>
                                                                        <td>
                                                                            <div className="d-inline-block text-nowrap">
                                                                                <Link to={`/role/${item.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editUserss" data-bs-toggle="modal">
                                                                                    <i class="bx bx-edit"></i>
                                                                                </button>
                                                                                </Link>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>


                                                        </table>

                                                        <input type="hidden" /></form>
                                                    <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Upadtr api table */}


                            <div class="modal fade" id="editUserss" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-simple modal-dialog-centered modal-add-new-role">
                                    <div class="modal-content p-3 p-md-5">
                                        <div class="modal-body">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            <div class="text-center mb-4">
                                                <h3 class="role-title">Add New Department</h3>
                                                <p>Set Department permissions</p>
                                            </div>

                                            <form id="editUserss" onSubmit={handleUpdate} className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" noValidate>
                                                <div className="col-12 mb-4 fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="modalRoleName">Department Name</label>
                                                    <input type="text" id="modalRoleName" name="Name" value={Name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter a department name" tabIndex="-1" />
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>

                                                <table className="table table-flush-spacing">
                                                    {permissions.map((permission, index) => (
                                                        <tbody key={index}>
                                                            <tr>
                                                                <td className="text-nowrap fw-medium">{permission.modelName}</td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox" name="Create" checked={permission.Create} onChange={(e) => handleChange(e, index)} />
                                                                        Create
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox"  name="Read" checked={permission.Read} onChange={(e) => handleChange(e, index)} />
                                                                        Read
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox" name="Update" checked={permission.Update} onChange={(e) => handleChange(e, index)} />
                                                                        Update
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox"  name="Delete" checked={permission.Delete} onChange={(e) => handleChange(e, index)} />
                                                                        Delete
                                                                    </label>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ))}

                                                </table>

                                                <div className="col-12 text-center">
                                                    <button type="submit" className="btn btn-primary me-sm-3 me-1">Submit</button>
                                                    <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                </div>
                                                <input type="hidden" />
                                            </form>

                                            {/*      <!--/ Add role form --> */}
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/*    {/*                          <!--/ Add Role Modal --> */}
                            <div class="modal fade" id="addRoleModal" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-simple modal-dialog-centered modal-add-new-role">
                                    <div class="modal-content p-3 p-md-5">
                                        <div class="modal-body">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            <div class="text-center mb-4">
                                                <h3 class="role-title">Add New Department</h3>
                                                <p>Set Department permissions</p>
                                            </div>

                                            <form id="addRoleForm" onSubmit={handleSubmit} className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" noValidate>
                                                <div className="col-12 mb-4 fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="modalRoleName">Department Name</label>
                                                    <input type="text" id="modalRoleName" name="Name" value={Name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter a department name" tabIndex="-1" />
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>

                                                <table className="table table-flush-spacing">
                                                    {permissions.map((permission, index) => (
                                                        <tbody key={index}>
                                                            <tr>
                                                                <td className="text-nowrap fw-medium">{permission.modelName}</td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox" name="Create" checked={permission.Create} onChange={(e) => handleChange(e, index)} />
                                                                        Create
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox" name="Read" checked={permission.Read} onChange={(e) => handleChange(e, index)} />
                                                                        Read
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox" name="Update" checked={permission.Update} onChange={(e) => handleChange(e, index)} />
                                                                        Update
                                                                    </label>
                                                                </td>
                                                                <td>
                                                                    <label>
                                                                        <input type="checkbox" name="Delete" checked={permission.Delete} onChange={(e) => handleChange(e, index)} />
                                                                        Delete
                                                                    </label>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    ))}

                                                </table>

                                                <div className="col-12 text-center">
                                                    <button type="submit" className="btn btn-primary me-sm-3 me-1">Submit</button>
                                                    <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                </div>
                                                <input type="hidden" />
                                            </form>

                                            {/*      <!--/ Add role form --> */}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/*   <!-- / Add Role Modal -->  */}
                        </div>

                        {/*  <!-- Footer --> */}

                        <Footer />

                        {/*      <!-- / Footer --> */}

                    </div>
                </div >

                <div class="layout-overlay layout-menu-toggle"></div>
            </div >



        </>
    )
}

export default AddRoleForm