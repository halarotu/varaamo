import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { getMainImage } from 'utils/imageUtils';
import { getName } from 'utils/translationUtils';
import ReserveButton from './ReserveButton';
import ResourceAvailability from './ResourceAvailability';
import ResourceIcons from './ResourceIcons';

class ResourceListItem extends Component {
  getBackgroundImageStyles(image) {
    if (image && image.url) {
      return { backgroundImage: `url(${image.url}?dim=700x420)` };
    }
    return {};
  }

  render() {
    const { date, isLoggedIn, resource, unit } = this.props;

    return (
      <li className="resource-list-item">
        <Link
          to={`/resources/${resource.id}`}
          query={{ date: date.split('T')[0] }}
        >
          <div
            className="image-container"
            style={this.getBackgroundImageStyles(getMainImage(resource.images))}
          >
            <ResourceAvailability date={date} resource={resource} />
          </div>
        </Link>
        <div className="content">
          <ResourceIcons resource={resource} />
          <Link
            to={`/resources/${resource.id}`}
            query={{ date: date.split('T')[0] }}
          >
            <h4>{getName(resource)}</h4>
          </Link>
          <div className="unit-name">{getName(unit)}</div>
          <div className="controls">
            <ReserveButton date={date} isLoggedIn={isLoggedIn} resource={resource} />
          </div>
        </div>
      </li>
    );
  }
}

ResourceListItem.propTypes = {
  date: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  resource: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

export default ResourceListItem;