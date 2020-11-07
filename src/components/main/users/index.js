import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { 
    Badge,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import Select from 'react-select';

import HTTPRequest from 'helper/httpRequest';

import * as routeNameConstant from 'constant/routeName';
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
                name: '',
                type: null,
                status: null,
                page: 1,
                limit: 5,
                
            },
            filterData: {
                type: null,
                status: null,
            }
        };
        this._isMounted = false;
    };

    getUsers() {
        const params = {}
        if(this.state.params.id) {
            params.id = this.state.params.id
        }
        if(this.state.params.name) {
            params.name = this.state.params.name
        }
        if(this.state.params.type) {
            params.type = this.state.params.type
        }
        if(this.state.params.status) {
            params.status = this.state.params.status
        }
        HTTPRequest.get({
            url: 'users/',
            token: this.props.appAuthentication.token,
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
        return (
            <div>
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