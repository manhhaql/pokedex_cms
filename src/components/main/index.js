import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DashboardComponent from './dashboard';

class MainComponent extends React.Component {
    render() {
        return (
            <div>
                <h2>MAIN COMPONENT</h2>
                <button>Logout</button>
                <DashboardComponent/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));