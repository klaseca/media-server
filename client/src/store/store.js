import { makeObservable, observable, action } from 'mobx';

export class Store {
  contents = [];

  constructor() {
    makeObservable(this, {
      contents: observable.ref,
      setContents: action,
    });
  }

  setContents = (contents) => {
    this.contents = contents;
  };
}
