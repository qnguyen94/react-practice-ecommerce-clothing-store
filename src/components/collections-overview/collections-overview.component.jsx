import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PreviewCollection from '../../components/preview-collection/preview-collection.component'
import { selectCollectionsforPreview } from '../../redux/shop/shop.selectors'

import './collections-overview.styles.scss'

const CollectionOverview = ({ collections }) => {
    return(
        <div className="collections-overview">
            {
                collections.map(({id, ...otherCollectionProps}) => (
                <PreviewCollection key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsforPreview
})

export default connect(mapStateToProps)(CollectionOverview);