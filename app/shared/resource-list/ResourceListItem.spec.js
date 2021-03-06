import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router';
import Immutable from 'seamless-immutable';

import BackgroundImage from 'shared/background-image';
import ResourceIcons from 'shared/resource-icons';
import Image from 'utils/fixtures/Image';
import Resource from 'utils/fixtures/Resource';
import Unit from 'utils/fixtures/Unit';
import { getResourcePageUrl } from 'utils/resourceUtils';
import ReserveButton from './ReserveButton';
import ResourceListItem from './ResourceListItem';

describe('shared/resource-list/ResourceListItem', () => {
  const date = '2015-10-10';
  const defaultProps = {
    isLoggedIn: false,
    resource: Immutable(Resource.build({
      images: [Image.build()],
    })),
    unit: Immutable(Unit.build()),
  };
  const context = {
    location: { query: { date } },
  };

  function getWrapper(extraProps) {
    return shallow(<ResourceListItem {...defaultProps} {...extraProps} />, { context });
  }

  it('renders an li element', () => {
    const li = getWrapper().find('li');

    expect(li.length).to.equal(1);
  });

  it('renders BackgroundImage component with correct image', () => {
    const backgroundImage = getWrapper().find(BackgroundImage);
    const resourceMainImage = defaultProps.resource.images[0];

    expect(backgroundImage.length).to.equal(1);
    expect(backgroundImage.prop('image')).to.deep.equal(resourceMainImage);
  });

  it('contains links to correct resource page', () => {
    const links = getWrapper().find(Link);
    const expectedUrl = getResourcePageUrl(defaultProps.resource, date);

    expect(links.length).to.equal(2);
    expect(links.at(0).props().to).to.equal(expectedUrl);
    expect(links.at(1).props().to).to.equal(expectedUrl);
  });

  it('renders ResourceIcons component', () => {
    const resourceIcons = getWrapper().find(ResourceIcons);

    expect(resourceIcons.length).to.equal(1);
  });

  it('renders the name of the resource inside a h4 header', () => {
    const header = getWrapper().find('h4');
    const expected = defaultProps.resource.name;

    expect(header.html()).to.contain(expected);
  });

  it('renders the name of the given unit in props', () => {
    const unitName = getWrapper().find('.unit-name');
    const expected = defaultProps.unit.name;

    expect(unitName.text()).to.contain(expected);
  });

  it('renders a ReserveButton with correct props', () => {
    const reserveButton = getWrapper().find(ReserveButton);

    expect(reserveButton.length).to.equal(1);
    expect(reserveButton.props().date).to.equal(date);
    expect(reserveButton.props().isLoggedIn).to.equal(defaultProps.isLoggedIn);
    expect(reserveButton.props().resource).to.equal(defaultProps.resource);
  });
});
