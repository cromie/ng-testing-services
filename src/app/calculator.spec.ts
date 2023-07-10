import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Test for multiply', () => {
    it('should return a 14', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const res = calculator.multiply(2, 7);
      //Assert
      expect(res).toEqual(14);
    });

    it('should return a 20', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const res = calculator.multiply(5, 4);
      //Assert
      expect(res).toEqual(20);
    });
  });

  describe('Tests for divide', () => {
    it('should return some numbers', () => {
      //Arrange
      const calculator = new Calculator();
      //Act & (Assert for first 2 lines)
      expect(calculator.divide(8, 4)).toEqual(2);
      expect(calculator.divide(16, 4)).toEqual(4);
      const res = calculator.divide(6, 2);
      //Assert
      expect(res).toEqual(3);
    });

    it('for zero', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      expect(calculator.divide(8, 0)).toBeNull();
      expect(calculator.divide(132523452352356, 0)).toBeNull();
    });
  });

  it('Matchers tests', () => {
    const name = 'nick';
    let name2;
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTrue();
    expect(1 + 1 === 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(19);

    expect('12345').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('apples');
  });
});
