import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Stats from '../../../app/components/Stats';

describe("Stats component", function() {
  
  it("should exist", function() {
    var wrapper = mount(<Stats commandHistory={['ls']} />);
    // wrapper.setProps({ commandHistory: ['ls'] });
    // wrapper = mount(<Stats/>);
    // console.log('state:', wrapper.state().commandHistory);
    expect(wrapper).to.exist;
    expect(wrapper.state().commandHistory).to.eql(['ls']);

  });

});
