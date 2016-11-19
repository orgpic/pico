import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
// import Collaborators from '../../../app/components/Collaborators';

xdescribe("Collaborators component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<Collaborators/>);
    expect(wrapper).to.exist;
  });

});
