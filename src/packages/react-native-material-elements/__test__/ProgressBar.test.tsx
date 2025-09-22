import { ProgressBar } from '../src';
import { render } from './test-utils';

describe('ProgressBar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    jest.useFakeTimers();
    const { toJSON } = render(<ProgressBar progress={0.2} />);
    expect(toJSON()).toMatchSnapshot();
    jest.clearAllTimers();
  });
});
