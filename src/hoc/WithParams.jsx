import React from 'react';
import { useParams } from 'react-router-dom';

const WithParams = (Component) => (props) => {
    // class ParamsComponent extends React.Component {
    //     render() {
    //         return <Component {...this.props} param={useParams()} />;
    //     }
    // }

    // return <Component {...props} param={useParams()} />;

};

export default WithParams;