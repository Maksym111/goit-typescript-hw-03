interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

interface IHouse {
  tenants: IPerson[];
  door: boolean;
  key: IKey;
  comeIn(person: IPerson): void;
  openDoor(key: IKey): void;
}

class Key implements IKey {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {}

  getKey(): IKey {
    return this.key;
  }
}

abstract class House implements IHouse {
  door = false;
  tenants: IPerson[] = [];

  constructor(public key: IKey) {}

  comeIn(person: IPerson): void {
    if (this.door) {
      this.tenants.push(person);
    } else {
      console.log("The door is closed!");
    }
  }

  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  constructor(public key: IKey) {
    super(key);
  }
  openDoor(key: IKey): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    } else {
      console.log("This is wrong key!");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
