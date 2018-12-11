var n : Number = 1;

var names : string[] = ["Jon","Rickon","Arya"];

enum Starks {Jon, Bran, Eddard, Catlyn};

var cat : Starks = Starks.Catlyn;

function getName() : string{
  return "Bran";
}

function warn() : void{
  console.log('Winter is coming');
}
