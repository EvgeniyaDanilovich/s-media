import React from 'react';
// @ts-ignore
import preloader from '../../../assets/images/preloader.svg';

const Preloader: React.FC = () => {
    return (
        <div>
            <img src={preloader} alt="preloader" />
        </div>
    );
};

export default Preloader;