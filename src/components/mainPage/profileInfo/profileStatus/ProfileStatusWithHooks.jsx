import React, { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {
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

    const onStatusChange = (event) => {
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