import { Serializable } from './serializable';

export class Play implements Serializable<Play> {
  id: string;
  row: number;
  column: number;

  deserialize(input: any) {
    return this;
  }
}
