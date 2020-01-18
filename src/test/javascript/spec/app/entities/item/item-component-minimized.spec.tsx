import React from 'react';
import { shallow } from 'enzyme';
import { Button} from 'reactstrap';

import {ItemCompMinimized} from 'app/entities/item/item-component-minimized';


describe('ItemComponentMinimized', () => {
  let mountedWrapper;

  const toggle = ()=>{

  };

  const devProps = {
    id: 23,
    title: "title"
  };


  const wrapper = (props = devProps) => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<ItemCompMinimized {...props} />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here
  it('Renders an Item Comp Minimized without image', () => {
    const component = wrapper();
    // the created snapshot must be committed to source control
    expect(component).toMatchSnapshot();
    expect(component.find(Button).length).toEqual(1);
  });
});
