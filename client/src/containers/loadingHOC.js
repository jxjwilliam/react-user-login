import React, {Component} from 'react';
import {isEmpty} from '../utils'

const LoadingHOC = loadingProp => WrappedComponent => {
    return class LoadingHOC extends Component {
        render() {
            return isEmpty(this.props[loadingProp])
                ? <div className="loader"/>
                : <WrappedComponent {...this.props}/>;
        }
    }
}


export default LoadingHOC;