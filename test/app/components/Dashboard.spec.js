import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Dashboard from '../../../app/components/Dashboard';

xdescribe("Dashboard component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<Dashboard/>);
    expect(wrapper).to.exist;
  });

});
