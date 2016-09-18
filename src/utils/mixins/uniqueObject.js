// Very basic implementation.
let objectCount = 0;
export default class UniqueObject {
  constructor() {
    this.uuid = objectCount++;
  }
}
