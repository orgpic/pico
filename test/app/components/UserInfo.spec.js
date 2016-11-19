import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import UserInfo from '../../../app/components/UserInfo';

describe("UserInfo component", function() {
  
  it("should exist", function() {
    var wrapper = shallow(<UserInfo />);
    expect(wrapper).to.exist;
  });

});
