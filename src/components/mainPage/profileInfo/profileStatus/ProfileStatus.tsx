import React, { ChangeEvent } from 'react';

export type TProfileStatusProps = {
    status: string,
    updateStatus: (status: string) => void
}

export type TProfileStatusState = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<TProfileStatusProps, TProfileStatusState> {
    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps: TProfileStatusProps, prevState: TProfileStatusState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    onActivateEditMode = () => {
        this.setState({ editMode: true });
    };

    onDeactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: event.currentTarget.value });
    };

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div><span onDoubleClick={this.onActivateEditMode}>{this.props.status || '-------'}</span></div>
                    : <div><input onBlur={this.onDeactivateEditMode} onChange={this.onStatusChange}
                                  value={this.state.status} autoFocus={true} /></div>
                }
            </div>
        );
    }
}

export default ProfileStatus;