import { makeAutoObservable, computed, runInAction } from 'mobx';

export class Store {
  constructor() {
    makeAutoObservable(this);
  }

  contents = [];

  prepareContentPath = (path) => {
    if (path === '/') {
      return '/content';
    }
    const pathEncode = encodeURIComponent(path.slice(1));
    return `/content/${pathEncode}`;
  };

  loadContent = async (contentPath) => {
    const res = await fetch(this.prepareContentPath(contentPath));
    const contents = await res.json();
    runInAction(() => {
      this.contents = contents;
    });
  };

  downloadLink = (name, ext = '') => {
    return computed(
      () => `http://${document.location.hostname}:3232/download${ext}/${name}`
    ).get();
  };
}
