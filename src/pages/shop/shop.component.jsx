import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions'

import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

//Wrap component with HOC
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state = {
        loading: true
    }

    unsubscribeFromSnapShot = null;
    
    componentDidMount(){
        const { updateCollections } = this.props;
        //Run snapshot data transformation procedure at this level to ensure efficiency.
        const collectionRef = firestore.collection('collections');
        // Runs whenever snapshot of the ref updates or code is run for the first time
            // onSnapShot method get a snapshot object received by firestore
        this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
            // Convert snapshot object to map object that can be passed to reducer
            const collectionMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionMap);

            // Stop loading state when data call is done
            this.setState({loading: false});
        })
    }

    render(){
        const  { match } = this.props;
        const { loading } = this.state;

        return(
            <div className="shop-page"> 
                {/* User render instead of component */}
                {/* Takes in a function => same parameters as component */}
                <Route exact path={`${match.path}`} 
                    render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} />
                {/* Use url path as parameters. use colon to mark parameter */}
                <Route path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);