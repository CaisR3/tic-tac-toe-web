import { Serializable } from './serializable';

export class Tx implements Serializable<Tx> {

  public txResponse: string;

  deserialize(input: any) {
    let response: string = input._body;
    let idIndex = response.indexOf('id');
    let length = response.length;

    this.txResponse = response.substring(idIndex + 7, length - 4);
    return this;
  }

  text(input: any) {
    this.txResponse = input;
    return this;
  }

}

