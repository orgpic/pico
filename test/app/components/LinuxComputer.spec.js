import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
// import LinuxComputer from '../../../app/components/LinuxComputer';

xdescribe("LinuxComputer component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<LinuxComputer/>);
    expect(wrapper).to.exist;
  });

});
