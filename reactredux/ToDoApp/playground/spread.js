// function add(a,b) {
// 	return a + b;
// }

// console.log(add(3,1));

// var toAdd = [9,5];

// console.log(add(...toAdd));


// var groupA = ['luke','dani'];

// var groupB = ['kyle','chris'];

// var final = [...groupA, ...groupB];

// console.log(final);

var person = ['luke', 22];
var person2 = ['dani', 18];

//Hi andrew, you are 25
function welcome (name, age) {
	console.log('Hi '+name+', you are '+age)
}
welcome(...person);
welcome(...person2);

var names = ['luke','dani'];
var final = ['kevin', ...names];
 //hi andrew
final.forEach(function (arr) {
 		console.log('Hi '+arr);
 });