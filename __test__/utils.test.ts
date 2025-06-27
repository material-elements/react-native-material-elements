import { generateUniqueId } from '../src';

describe('generateUniqueId', () => {
  it('should return a non-empty string', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should include a timestamp and a random string separated by a hyphen', () => {
    const id = generateUniqueId();
    const parts = id.split('-');

    expect(parts.length).toBe(2);
    expect(parts[0]).toMatch(/^[a-z0-9]+$/);
    expect(parts[1]).toMatch(/^[a-z0-9]{5}$/);
  });

  it('should generate different ids on multiple calls', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
  });

  it('should generate id containing base36 characters only', () => {
    const id = generateUniqueId();
    expect(id).toMatch(/^[a-z0-9]+-[a-z0-9]+$/);
  });
});
