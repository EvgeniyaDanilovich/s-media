import React from 'react';
import MainPage from './MainPage';
import { connect } from 'react-redux';
import { getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator, saveAvatarTC, saveProfile } from '../../state/main-reducer';
import { useParams } from 'react-router-dom';
import { WithAuthNavigate } from '../../hoc/WithAuthNavigate';

class MainPageContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.param.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.param.userId !== prevProps.param.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return <MainPage ownerId={this.props.ownerId}
                         currentId={this.props.param.userId} profile={this.props.profile}
                         status={this.props.status} updateStatus={this.props.updateStatusThunkCreator}
                         saveAvatarTC={this.props.saveAvatarTC} saveProfile={this.props.saveProfile}/>;
    }
}

const mapStateToProps = (state) => ({
    authorizedUserId: state.auth.id,
    profile: state.mainPage.profile,
    status: state.mainPage.status,
    ownerId: state.auth.id
});

const AuthNavigateComponent = WithAuthNavigate(MainPageContainer);

const TakeParams = (props) => {
    return <AuthNavigateComponent {...props} param={useParams()} />;
};

// const TakeParams = WithParams(AuthNavigateComponent);

// export const c = compose(
//     connect(mapStateToProps, { getProfileThunkCreator }),
//     TakeParams,
//     WithAuthNavigate
// )(MainPageContainer);

export default connect(mapStateToProps, { getProfileThunkCreator, getStatusThunkCreator,
    updateStatusThunkCreator, saveAvatarTC, saveProfile  })(TakeParams);