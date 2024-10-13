export function cleanText(text: string) {
    // Удаляем все символы, которые не являются буквами, цифрами или стандартными символами
    return text.replace(/[^\w\s.,!?а-яА-Я\u4e00-\u9fa5]/g, '');
}