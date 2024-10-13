const { cleanText } = require('../components/shared/articles/fns/cleanText.ts');

describe('cleanText', () => {
  it('Не должно затрагивать обычный текст', () => {
    expect(cleanText('Hello, World! 123')).toBe('Hello, World! 123');
  });
  it('Не должно затрагивать русский текст', () => {
    expect(cleanText('Здарова мое имя андрюха я крутой!!! 22')).toBe(
      'Здарова мое имя андрюха я крутой!!! 22',
    );
  });
  it('Не должно затрагивать иероглифы', () => {
    expect(cleanText('異體字')).toBe('異體字')
  });
  it('Должно очищать символы не относящиеся к alpha-numeric', () => {
    expect(cleanText('Привет, мир! Этот текст содержит странные символы: S̵̩̘̎̈́̀̈́̊̈͘͝')).toBe('Привет, мир! Этот текст содержит странные символы S');
  });
  it('Возвращает пустую строку на пустую строку', () => {
    expect(cleanText('')).toBe('');
  });
});
