/*

   Stack allows you to control how many operations are running simultaneously.

*/

var Stack = require('./stack').Stack;
var counter = 0;
var concurrency = 5;

console.log("INFO :: Loading functions to Stack");

for(var i = 0; i < 20; i++) {

	// Add the function to the stack module.
	Stack.add( function test(next) {
		var now = new Date().getTime();
      		setTimeout( function() {
        	 	counter++;
         		console.log(" Process Complete :: " + counter );
         		next();
      		}, 2500);
     	});

}

console.log("INFO :: Executing Function with concurrency of " + concurrency);

// Process the stacked up functions.
Stack.run(function() { console.log("Done :: " + counter); }, concurrency);
