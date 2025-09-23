import { ProgressBar } from '../src';
import { render } from './test-utils';

describe('ProgressBar component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<ProgressBar progress={0.2} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
