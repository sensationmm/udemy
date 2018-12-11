class Stark {
  name : string = 'Brandon';
  static castle : string = 'Winterfell';
  saying : string;

  constructor() {
    this.saying = 'Winterfell';
  }

  hello(person : string) {
    console.log(`Hello ${person}`);
  }
}

var ned = new Stark();
ned.saying = 'Winter is coming';

// console.log(Stark.castle);
ned.hello('Robert');
