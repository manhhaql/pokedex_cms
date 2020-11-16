import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { 
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

import Select from 'react-select';

import HTTPRequest from 'helper/httpRequest';

import * as dataConstant from 'constant/data';

import TableCommonComponent from 'components/common/table';
import PaginationComponent from 'components/common/pagination';

import {
    UpdateUserStatusModal,
    UpdateUserTypeModal,
} from './UserModals';

class UsersComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: null,
            total: null,
            params: {
                id: null,
                username: '',
                type: null,
                status: null,
                page: 1,
                limit: 5,
                
            }
        };
        this.userTypeOptions = [
            {label: "Admin", value: dataConstant.USER_ADMIN},
            {label: "Guest", value: dataConstant.USER_GUEST},
        ];
        this.userStatusOptions = [
            {label: "Active", value: dataConstant.STATUS_ACTIVE},
            {label: "Inactive", value: dataConstant.STATUS_INACTIVE},
        ];
        this._isMounted = false;
    };

    getUsers() {
        const params = {}
        if(this.state.params.id) {
            params.id = this.state.params.id
        }
        if(this.state.params.username) {
            params.username = this.state.params.username
        }
        if(this.state.params.type) {
            params.type = this.state.params.type
        }
        if(this.state.params.status) {
            params.status = this.state.params.status
        }
        HTTPRequest.get({
            url: 'users/',
            token: this.props.appAuthentication && this.props.appAuthentication.token,
            params: {
                page: this.state.params.page,
                limit: this.state.params.limit,
                id: params.id,
                username: params.username,
                type: params.type,
                status: params.status,
            }
        }).then(response => {
            if(this._isMounted) {
                this.setState({
                    userData: response.data.data,
                    total: response.data.total
                })
            }
            
        }).catch(error => {
            console.log(error)
        })
    };

    onReload = () => {
        this.setState({
            params: Object.assign({}, this.state.params, {
                id: null,
                username: '',
                type: null,
                status: null,
                page: 1,
                limit: 5,
            })
        }, ()=> {
            this.getUsers();
        })
    };

    onInputsChanged(field, value) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                [field]: value
            })
        })
    };

    onSearchSubmit(e) {
        e.preventDefault();
        this.setState({
            params: Object.assign({}, this.state.params, {
                page: 1
            }),
            userData: [],
            total: 0
        }, () => {
            this.getUsers();
        });
    };

    onChangePage(page) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                page: page
            })
        }, () => {
            this.getUsers();
        });
    };
    onChangeLimit(limit) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                limit: limit
            })
        }, () => {
            this.getUsers();
        });
    };

    onChangeFilterByType = (e) => {
        this.setState({
                params: Object.assign({}, this.state.params, {
                type: e.value
            })
        }, ()=> {
            this.getUsers()
        });
    };
    onChangeFilterByStatus = (e) => {
        this.setState({
            params: Object.assign({}, this.state.params, {
                status: e.value
            })
        }, () => {
            this.getUsers();
        });
    };

    _renderUserStatus(status) {
        return (
            <Badge className="font-weight-bold text-nowrap"
                color={
                    `${status === dataConstant.STATUS_ACTIVE ? 'success' : 'secondary'}`
                }>
                {
                    status === dataConstant.STATUS_ACTIVE ? "Active" : 'Inavtive'
                }
            </Badge>
        )
    };

    _renderActionColumn(user) {
        return (
            <ul className="list-unstyled">
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-danger" >
                        <i className="fas fa-cog"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="text-center">
                            Actions
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            <Link to="" className="text-dark" onClick={()=>{}}>
                                <i className="fas fa-edit mr-2 text-secondary"></i>Edit Generals
                            </Link>
                        </DropdownItem>
                        <DropdownItem>
                            <UpdateUserTypeModal 
                                user={user}
                                getUsers={()=>this.getUsers()}
                            />
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="text-center">
                            <UpdateUserStatusModal 
                                user={user}
                                getUsers={()=>this.getUsers()}
                            />
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </ul>
        )
    };

    _renderActionColumn(user) {
        return (
            <div className="Action-button__group">
                <div className="Action-button__item">
                    <UpdateUserTypeModal 
                        user={user}
                        getUsers={()=>this.getUsers()}
                    />
                </div>
                <div className="Action-button__item">
                    <UpdateUserStatusModal 
                        user={user}
                        getUsers={()=>this.getUsers()}
                    />
                </div>
            </div>
        )
    };

    _renderUserTable() {
        const options = [
            {
                th: "#ID",
                td: (user, index) => user.id,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'id'
            },
            {
                th: "Action",
                td: (user, index) => this._renderActionColumn(user),
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'action'
            },
            {
                th: "Username",
                td: (user, index) => user.username,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle font-weight-bold text-primary text-capitalize',
                key: 'username'
            },
            {
                th: "Email",
                td: (user, index) => user.email,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'email'
            },
            {
                th: "Type",
                td: (user, index) => user.type,
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'type'
            },
            {
                th: "Status",
                td: (user, index) => this._renderUserStatus(user.status),
                thClass: 'text-center align-middle',
                tdClass: 'text-center align-middle',
                key: 'status'
            }
        ];
        return <div>
            <TableCommonComponent
                data={this.state.userData}
                wrapper='user_table_wrapper'
                options={options}
            />
        </div>
    };

    componentDidMount() {
        this._isMounted = true;
        this.getUsers()
    };
    render() {
        let params = this.state.params;
        let typeLabel = this.userTypeOptions.filter(a=> a.value === params.type)
        .map(a=> a.label);
        let statusLabel = this.userStatusOptions.filter(a=> a.value === params.status)
        .map(a=> a.label);
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <h2 className="text-secondary Content-header__title">User Table</h2>
                    <div className="d-flex align-items-center">
                        <Button color="link" onClick={this.onReload}>
                            <i className="fas fa-sync-alt"></i>
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className='form-group'>
                            <label className="form-control-plaintext">
                                Search
                            </label>
                            <form onSubmit={(e)=>this.onSearchSubmit(e)}>
                            <InputGroup>
                                <Input placeholder="Enter text here..."
                                        name="username" 
                                        value={this.state.params.username} 
                                        onChange={(event)=>this.onInputsChanged("username", event.target.value)}/>
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary"><i className="fas fa-search"></i></Button>
                                </InputGroupAddon>
                            </InputGroup>
                            </form>
                            
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className='form-group'>
                            <label className="form-control-plaintext">
                                By Type
                            </label>
                            <Select 
                                className="text-capitalize"
                                value={{
                                    label: typeLabel && typeLabel.length ? typeLabel : <div className="text-secondary">Select...</div>
                                }} 
                                options={this.userTypeOptions} 
                                onChange={this.onChangeFilterByType}
                            />
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className='form-group'>
                            <label className="form-control-plaintext">
                                By Status
                            </label>
                            <Select 
                                className="text-capitalize"
                                value={{
                                    label: statusLabel && statusLabel.length ? statusLabel : <div className="text-secondary">Select...</div>
                                }}
                                options={this.userStatusOptions} 
                                onChange={this.onChangeFilterByStatus}
                            />
                        </div>
                    </div>
                </div>
                {
                    this.state.userData && (
                        <div>
                            {this._renderUserTable()}
                            <PaginationComponent
                                limits={[2, 5, 10, 50]}
                                page={this.state.params.page}
                                limit={this.state.params.limit}
                                total={this.state.total}
                                onChangePage={(page) => this.onChangePage(page)}
                                onChangeLimit={(limit) => this.onChangeLimit(limit)}
                            />
                        </div>
                    )
                }
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    appAuthentication: state.appAuthentication.current
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersComponent));