import React from 'react';
import MainPage from './MainPage';
import { connect } from 'react-redux';
import { getProfileTC, getStatusTC, updateStatusTC, saveAvatarTC, saveProfile } from '../../state/main-reducer';
import { Params, useParams } from 'react-router-dom';
import { WithAuthNavigate } from '../../hoc/WithAuthNavigate';
import { TProfile } from '../../models/common-types';
import { AppStateType } from '../../state/redux-store';
import { TProfileDataFormValue } from '../../models/types-components';

class MainPageContainer extends React.Component<TMainPageContainerProps> {
    refreshProfile() {
        let userId = this.props.param.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getProfileTC(userId);
        this.props.getStatusTC(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: TMainPageContainerProps, prevState: AppStateType) {
        if (this.props.param.userId !== prevProps.param.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <MainPage ownerId={this.props.ownerId}
                         currentId={this.props.param.userId} profile={this.props.profile}
                         status={this.props.status} updateStatus={this.props.updateStatusTC}
                         saveAvatarTC={this.props.saveAvatarTC} saveProfile={this.props.saveProfile} />;
    }
}

export type TMapStateToPropsMainPage = {
    authorizedUserId: number,
    profile: TProfile,
    status: string,
    ownerId: number
}

export type TMapDispatchToPropsMainPage = {
    getProfileTC: (userId: number) => void,
    getStatusTC: (userId: number) => void,
    updateStatusTC: (status: string) => void,
    saveAvatarTC: (file: File) => void,
    saveProfile: (data: TProfileDataFormValue) => Promise<void>
}

export type TMainPageContainerParamProps = {
    param: { userId: number }
}

export type TMainPageProps = TMapStateToPropsMainPage & TMapDispatchToPropsMainPage;
export type TMainPageContainerProps = TMapStateToPropsMainPage & TMapDispatchToPropsMainPage & TMainPageContainerParamProps;

const mapStateToProps = (state: AppStateType): TMapStateToPropsMainPage => ({
    authorizedUserId: state.auth.id,
    profile: state.mainPage.profile,
    status: state.mainPage.status,
    ownerId: state.auth.id
});


const AuthNavigateComponent = WithAuthNavigate(MainPageContainer);

const TakeParams = (props: TMainPageProps)  => {
    // @ts-ignore
    return <AuthNavigateComponent {...props} param={useParams()} />;
};

export default connect<TMapStateToPropsMainPage>(mapStateToProps,
    { getProfileTC, getStatusTC, updateStatusTC, saveAvatarTC, saveProfile })(TakeParams);