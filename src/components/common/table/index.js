import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Table.css';

class TableCommonComponent extends React.Component {

    render() {
        return <>
            
            {
                this.props.appAuthentication && <div className='Table' id={this.props.wrapper}>
                    {
                        this.props.data.length === 0 && this.props.appAuthentication.user ?
                            <div className='d-flex align-items-center justify-content-center' style={{ minHeight: "200px" }}>
                                <h3 className='kt-font-bold'>
                                    NO DATA
                                </h3>
                            </div> : 
                            <table className='table table-striped table-bordered' role="grid" id='table' style={this.props.tableStyles}>
                                <thead className='thead-dark'>
                                    <tr className='' role="row">
                                        {
                                            this.props.options.map(item =>
                                                <th
                                                    className={`Table-sticky__th ${item.thClass}`}
                                                    style={item.thStyle}
                                                    key={item.key}
                                                >
                                                    {item.th}
                                                </th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {
                                        this.props.data && this.props.data.map((item, index) => <tr className='' key={`tablerow-${index}`}>
                                            {
                                                this.props.options.map(option =>
                                                    <td
                                                        className={typeof option.tdClass === 'function' ? option.tdClass(item) : option.tdClass}
                                                        style={typeof option.tdStyle === 'function' ? option.tdStyle(item) : option.tdStyle}
                                                        key={`${option.key}-${index}`}
                                                    >
                                                        {typeof option.td === 'function' ? option.td(item, index) : option.td}
                                                    </td>
                                                )
                                            }
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            }
        </>
    }
}
const mapStateToProps = (state) => ({
    appAuthentication: state.appAuthentication.current,
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableCommonComponent));