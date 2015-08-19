import {createSandboxSpy} from '../baseHelper';
import Top from '../../src/components/Top/index.jsx';
// import {StoreWatchComponent} from 'frill-core';
const TestUtils = React.addons.TestUtils;

const dummyFrill = {
  store: () => {
    return {
      count: 0,
      scrollItems: [],
      scrollItemsCount: 0,
      scrollItemTotal: 10,
    };
  },
  action: () => {
    return {
      countUp: () => {
        return 1;
      },
      countUpBy: (count) => {
        return count;
      },
      loadScrollItems: (count, retrieve) => {
        return count + retrieve;
      },
    };
  },
};

const frillSpy = {
  store: sinon.spy(dummyFrill, 'store'),
  action: sinon.spy(dummyFrill, 'action'),
};

function mountComponent(frill) {
  shallowRenderer = TestUtils.createRenderer();

  const _frill = frill || dummyFrill;
  shallowRenderer.render(<Top frill={_frill} />);

  component = shallowRenderer.getRenderOutput();
}

/**
 * TopComponent
 * @test {TopComponent}
 */
describe('TopComponent', () => {
  beforeEach(() => {
    spy = createSandboxSpy(Top.prototype, [
      'getStateFromFrill',
    ]);

    mountComponent();
  });
});
