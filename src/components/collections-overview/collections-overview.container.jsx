import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux'; // library for multiple layer component wrapping

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors' // fetching signal from redux store
import WithSpinner from '../../components/with-spinner/with-spinner.component' // The higher order component
import CollectionOverview from './collections-overview.component'   // The actual component

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

// Normal way
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview))

// Use Compose, evaluate from right to left
const CollectionsOverviewContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionsOverviewContainer;