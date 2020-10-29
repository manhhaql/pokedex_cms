import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

class PaginationComponent extends React.Component {

    constructor(props) {
        super(props);
    };

    onChangePage(event, page) {
        event.preventDefault();
        console.log("CLICKED!")
        this.props.onChangePage(page);
    };
    onChangeLimit(event) {
        event.preventDefault();
        this.props.onChangeLimit(parseInt(event.target.value));
    };

    render() {
        return (
            <div className='d-flex align-items-start justify-content-end mt-2'>
                <Pagination aria-label="Page navigation">
                    <PaginationItem onClick={(event) => this.onChangePage(event, 1)} >
                        <PaginationLink first  />
                    </PaginationItem>
                    <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page - 1 > 1 ? this.props.page - 1 : 1)}>
                        <PaginationLink previous  />
                    </PaginationItem>
                    {
                        this.props.page > 3 && (
                            <PaginationItem>
                                <PaginationLink >
                                    ...
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {
                        this.props.page > 2 && (
                            <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page - 2)} >
                                <PaginationLink >
                                    {this.props.page - 2}
                                </PaginationLink >
                            </PaginationItem>
                        )
                    }
                    {
                        this.props.page > 1 && (
                            <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page - 1)} >
                                <PaginationLink >
                                    {this.props.page - 1}
                                </PaginationLink >
                            </PaginationItem>
                        )
                    }
                    <PaginationItem active>
                        <PaginationLink >
                            {this.props.page}
                        </PaginationLink>
                    </PaginationItem>
                    {
                        Math.ceil(this.props.total / this.props.limit) - this.props.page > 0 && (
                            <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page + 1)} >
                                <PaginationLink >
                                    {this.props.page + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {
                        Math.ceil(this.props.total / this.props.limit) - this.props.page > 1 && (
                            <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page + 2)} >
                                <PaginationLink >
                                    {this.props.page + 2}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {
                        Math.ceil(this.props.total / this.props.limit) - this.props.page > 2 && (
                            <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page + 3)} >
                                <PaginationLink >
                                    {this.props.page + 3}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    {
                        Math.ceil(this.props.total / this.props.limit) - this.props.page > 3 && (
                            <PaginationItem>
                                <PaginationLink >
                                    ...
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    <PaginationItem onClick={(event) => this.onChangePage(event, this.props.page + 1 < Math.ceil(this.props.total / this.props.limit) ? this.props.page + 1 : Math.ceil(this.props.total / this.props.limit))}>
                        <PaginationLink next/>
                    </PaginationItem>
                    <PaginationItem onClick={(event) => this.onChangePage(event, Math.ceil(this.props.total / this.props.limit))}>
                        <PaginationLink last/>
                    </PaginationItem>
                </Pagination>
                <div className='toolbar d-flex align-items-center'>
                    <select className='form-control mr-2' style={{ width: 70 }} value={this.props.limit} onChange={(event) => this.onChangeLimit(event)} >
                        {
                            this.props.limits.map((limit, index) => {
                                return (
                                    <option key={`pagination_limit_${index}`} value={limit}>{limit}</option>
                                )
                            })
                        }
                    </select>
                    <span className='text-secondary'>
                        {`Total ${this.props.limit > this.props.total ? this.props.total : this.props.limit, this.props.total}${this.props.total > 1 ? " results" : " result"}.` }
                    </span>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaginationComponent));