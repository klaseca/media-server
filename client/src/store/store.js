import { configure, observable, action, computed, runInAction } from 'mobx';

configure({ enforceActions: 'always' });

const store = observable(
  {
    paths: [],
    contents: [],
    async getDirs() {
      const res = await fetch('/content');
      const json = await res.json();
      runInAction(() => {
        this.contents = json;
      });
    },
    async getContent({ target: { textContent } }) {
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
    },
    async getDownContent(index) {
      this.paths.splice(-index);
      const parametr = `${this.paths.join('/')}`;
      const parametrEncode = encodeURIComponent(parametr);
      const res = await fetch(`/content/${parametrEncode}`);
      const json = await res.json();
      runInAction(() => {
        this.contents = json;
      });
    },
    downloadLink(name, ext = '') {
      return computed(() => {
        const parametr = `${this.paths.join('/')}/${name}`;
        const parametrEncode = encodeURIComponent(parametr);
        return `http://${document.location.hostname}:3232/download${ext}/${parametrEncode}`;
      });
    },
  },
  {
    getDirs: action,
    getContent: action,
    getDownContent: action,
  }
);

export default store;
