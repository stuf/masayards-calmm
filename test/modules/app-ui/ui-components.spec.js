import { expect } from 'chai';
import React from 'karet';

import * as R from 'ramda';

import { /* setup,*/ render } from '../setup';
import { Progress } from '../../../app/modules/app-ui/components/ui';

describe('App UI Components', () => {
  describe('Progress', () => {
    it('should render a basic progress bar', () => {
      const wrapper = render(<Progress value={50} />);
      const bar = wrapper.find('.progress-bar__indicator');
      expect(bar.css('width')).to.equal('50%');
    });
  });
});
