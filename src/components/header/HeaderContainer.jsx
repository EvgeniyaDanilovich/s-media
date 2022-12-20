import React from 'react';
import { Header } from './Header';
import { logoutTC } from '../../state/auth-reducer';
import { connect } from 'react-redux';

class HeaderContainer extends React.Component {
    // componentDidMount() {
    //     this.props.getAuthUserDataTC()
    // }

    render() {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    userId: state.auth.id,
    login: state.auth.login,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { logoutTC })(HeaderContainer);

