export function clearCookies(document: Document, cookieList: string[]) {
  cookieList.forEach((cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  });
}
