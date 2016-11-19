import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ProfilePicture from '../../../app/components/ProfilePicture';

describe("ProfilePicture component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<ProfilePicture/>);
    expect(wrapper).to.exist;
  });

});
