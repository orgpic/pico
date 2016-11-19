import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
// import App from '../../../app/components/App';

xdescribe("App component", function() {
  
  it("should exist", function() {
    const wrapper = shallow(<App/>);
    expect(wrapper).to.exist;
  });

});
