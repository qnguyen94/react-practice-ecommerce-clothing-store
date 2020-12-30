import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux'; // library for multiple layer component wrapping

import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors'// fetching signal from redux store
import WithSpinner from '../../components/with-spinner/with-spinner.component' // The higher order component
import CollectionPage from './collection.component' // The actual component

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionLoaded(state)
})

const CollectionPageContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer