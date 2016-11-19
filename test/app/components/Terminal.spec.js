import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
// import Terminal from '../../../app/components/Terminal';
// import $ from 'jquery';

xdescribe("Terminal component", function() {

  it("should exist", function() {
    const wrapper = shallow(<Terminal/>);
    expect(wrapper).to.exist;
  });

});
