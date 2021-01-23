import { makeAutoObservable, computed, runInAction } from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  paths = [];
  contents = [];

  getDirs = async () => {
    const res = await fetch('/content');
    const json = await res.json();
    runInAction(() => {
      this.contents = json;
    });
  };

  getContent = async ({ target: { textContent } }) => {
    const parametr = this.paths.length
      ? `${this.paths.join('/')}/${textContent}`
      : textContent;
    const parametrEncode = encodeURIComponent(parametr);
    const res = await fetch(`/content/${parametrEncode}`);
    const json = await res.json();
    runInAction(() => {
      this.contents = json;
      this.paths.push(textContent);
    });
  };

  getDownContent = async (index) => {
    this.paths.splice(-index);
    const parametr = `${this.paths.join('/')}`;
    const parametrEncode = encodeURIComponent(parametr);
    const res = await fetch(`/content/${parametrEncode}`);
    const json = await res.json();
    runInAction(() => {
      this.contents = json;
    });
  };

  downloadLink = (name, ext = '') => {
    return computed(() => {
      const parametr = `${this.paths.join('/')}/${name}`;
      const parametrEncode = encodeURIComponent(parametr);
      return `http://${document.location.hostname}:3232/download${ext}/${parametrEncode}`;
    }).get();
  };
}

const store = new Store();

export default store;
