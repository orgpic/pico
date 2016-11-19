import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import CodeEditor from '../../../app/components/CodeEditor';
// import localStorage from 'store';

xdescribe("CodeEditor component", function() {

  it("should exist", function() {
    localStorage['user'] = JSON.stringify({ username: 'steve' });

    const wrapper = shallow(<CodeEditor/>);
    expect(wrapper).to.exist;
  });
  
  it("should have textarea element", function() {
    const wrapper = shallow(<CodeEditor/>);
    expect(wrapper.find('textarea')).to.have.length(1);
  });

});
