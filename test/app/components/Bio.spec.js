import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Bio from '../../../app/components/Bio';

describe("Bio component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<Bio/>);
    expect(wrapper).to.exist;
  });

});
