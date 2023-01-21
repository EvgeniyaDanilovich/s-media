import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../state/redux-store';

const mapStateToPropsForNavigate = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as TWithAuthNavigateProps);

export type TWithAuthNavigateProps = {
    isAuth: boolean
}

export function WithAuthNavigate<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<TWithAuthNavigateProps> = (props)  => {
        const {isAuth, ...restProps} = props;

        if (!isAuth) return <Navigate to={'/login'} />;
        return <WrappedComponent {...restProps as WCP} />;
    };

    return connect<TWithAuthNavigateProps, {}, WCP, AppStateType>(mapStateToPropsForNavigate, {})(RedirectComponent);
}


// class RedirectComponent extends React.Component<WCP> {
//     render() {
//         if (!this.props.isAuth) return <Navigate to={'/login'} />;
//         return <WrappedComponent {...this.props}/>;
//     }
// }