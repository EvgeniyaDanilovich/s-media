import React, { ChangeEvent, useEffect, useState } from 'react';
import { TProfileStatusWithHooksProps } from '../../../../models/types-components';

const ProfileStatusWithHooks: React.FC<TProfileStatusWithHooksProps> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const onActivateEditMode = () => {
        setEditMode(true);
    };

    const onDeactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.currentTarget.value);
    };

    return (
        <div>
            {!editMode
                ? <div>Status: <span onDoubleClick={onActivateEditMode}>{status || '-------'}</span></div>
                : <div><input onBlur={onDeactivateEditMode} onChange={onStatusChange}
                              value={status} autoFocus={true} /></div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;