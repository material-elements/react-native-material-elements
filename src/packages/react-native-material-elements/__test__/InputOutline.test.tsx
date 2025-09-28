import { Outline } from '../src/components/TextField/InputOutline';
import { render } from './test-utils';

describe('InputOutline component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<Outline />);
    expect(toJSON()).toMatchSnapshot();
  });
});
