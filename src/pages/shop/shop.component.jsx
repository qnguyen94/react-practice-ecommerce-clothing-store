import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

const ShopPage = ({ match }) => {
        return(
            <div className="shop-page"> 
                <Route exact path={`${match.path}`} component={CollectionOverview} />

                {/* Use url path as parameters. use colon to mark parameter */}
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
}

export default ShopPage;