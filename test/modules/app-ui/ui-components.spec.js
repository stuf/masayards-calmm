import { expect } from 'chai';
import React from 'karet';

import * as R from 'ramda';

import { /* setup,*/ render } from '../setup';
import ProgressBar from '../../../app/modules/app-ui/components/ui/progress-bar';

describe('App UI Components', () => {
  describe('<ProgressBar />', () => {
    const values = [
      [0, 100],
      [20, 100],
      [40, 100],
      [60, 100],
      [80, 100],
      [100, 100]
    ];

    it('should display a minimal progress bar', () => {
      const checkProgress = v => {
        const [fst, snd] = v;
        const wrapper =
          render(<ProgressBar value={v} />);

        const bar = wrapper.find('.bar');

        expect(bar.attr('data-progress')).to.equal(`${fst}`);
        expect(bar.css('width')).to.equal(`${fst}%`);
      };

      R.forEach(checkProgress, values);
    });

    it('should display progress with a text value callback', () => {
      const textFn = ([a, b]) => `${a} / ${b}`;

      const checkComponent = v => {
        const wrapper =
          render(<ProgressBar value={v} text={textFn} />);

        const label = wrapper.find('.progress');
        expect(label.text()).to.match(/\d+ \/ \d+/);
      };

      R.forEach(checkComponent, values);
    });

    it('should display a label for the progress bar', () => {
      const checkComponent = v => {
        const wrapper =
          render(<ProgressBar value={v}
                              showProgress
                              label="Progress bar label" />);

        const label = wrapper.find('.label');
        expect(label).to.be.of.length(1);
        expect(label.text()).to.equal('Progress bar label');
      };

      R.forEach(checkComponent, values);
    });
  });
});