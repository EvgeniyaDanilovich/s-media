import React from 'react';
import { Header } from './Header';
import { logoutTC } from '../../state/auth-reducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../state/redux-store';
import { TMapDispatchHeaderContainer, TMapStateHeaderContainer } from '../../models/types-components';

class HeaderContainer extends React.Component<TMapStateHeaderContainer & TMapDispatchHeaderContainer> {
    // componentDidMount() {
    //     this.props.getAuthUserDataTC()
    // }

    render() {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = (state: AppStateType): TMapStateHeaderContainer => ({
    userId: state.auth.id,
    login: state.auth.login,
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, { logoutTC })(HeaderContainer);

