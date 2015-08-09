/**
 * An example for test documantation
 * @test {TestExample}
 */
describe('A test for documentation purpose', () => {
  /**
   * @test {TestExample#hello}
   */
  it('hello', () => {
    const foo = 'a';
    expect(foo).to.equal('a');
  });
});
