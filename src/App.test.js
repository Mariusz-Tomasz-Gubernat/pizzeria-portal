import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

it('rendrs without crashing', () => {
  shallow(<App />);
});