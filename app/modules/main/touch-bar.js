import * as R from 'ramda';

import logger from '../../logger';

const createInstance = R.curry((Component, opts) => new Component(opts));

const createTouchBar = TouchBar => {
  logger.info('Create default touch bar');
  const {
    TouchBarLabel,
    TouchBarButton,
    TouchBarSpacer,
    TouchBarGroup,
    TouchBarPopover
  } = TouchBar;

  const makeLabel = createInstance(TouchBarLabel);
  const makeButton = createInstance(TouchBarButton);

  const smallSpacer = new TouchBarSpacer({ size: 'small' });
  const largeSpacer = new TouchBarSpacer({ size: 'large' });

  const player = new TouchBarPopover({
    label: 'Player info',
    items: new TouchBar(R.map(makeLabel, [
      { label: 'Level: 0' },
      { label: 'Ships: 0/0' },
      { label: 'Equipment: 0/0' }
    ]))
  });

  const dataControls = new TouchBarGroup({
    items: new TouchBar(R.map(makeButton, [
      { label: 'Ships' },
      { label: 'Equipment' },
      { label: 'Fleets' },
      { label: 'Quests' }
    ]))
  });

  const touchBar = new TouchBar([
    player,
    largeSpacer,
    dataControls
  ]);

  return touchBar;
};

export default createTouchBar;
