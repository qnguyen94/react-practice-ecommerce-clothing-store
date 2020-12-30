import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../collection/collection.container'

class ShopPage extends React.Component{

    // Start data fetch whenever component mount
    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render(){
        const  { match } = this.props;

        return(
            <div className="shop-page"> 
                
                <Route exact path={`${match.path}`} 
                   component={CollectionsOverviewContainer}  />
                {/* Use url path as parameters. use colon to mark parameter */}
                <Route path={`${match.path}/:collectionId`} 
                    component={CollectionPageContainer} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);