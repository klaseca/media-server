export class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  loadContent = async (contentPath) => {
    const res = await fetch(this.baseUrl + this.#prepareContentPath(contentPath));
    return await res.json();
  };

  #prepareContentPath = (path) => {
    if (path === '/') {
      return '/content';
    }
    const pathEncode = encodeURIComponent(path.slice(1));
    return `/content/${pathEncode}`;
  };
}
