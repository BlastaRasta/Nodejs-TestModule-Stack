/*
   Limit concurrent functions module.
*/

var Stack = function(){
	
	this.stack = []; // List of functions in stack.
	this.concurrency = 0; // Current count of concurrency functions.
	
	this.defaultConcurrency = 10; // Default concurrency, if one is not supplied. 
	this.completed = null; // Default function after stack is empty.

	/*
	   Pushing new function to the stack. 
	*/

	this.add = function(cb){
		this.stack.push(cb); 
	};

	/*
	   Process all functions in the stack not exceeding the concurrency limit.
	*/

	this.run = function(completed, concurrency){
		
		// Load Settings.
		this.completed = completed || this.completed;
		this.defaultConcurrency = concurrency || this.defaultConcurrency;

		var length = this.stack.length; // Get current amount of function in stac.k
		
		// Keeping track of the current function in stack.
		var that = this; 
 		var next = function(){
			that.concurrency--;
			(--length == 0 ? that.completed() : that.run());
		};

		// Running the functions concurrently to the limit.
		while(this.concurrency < this.defaultConcurrency && this.stack.length > 0) {
         		this.concurrency++;
         		var callback = this.stack.shift();
         		callback(next);
      		};

	};

};

// Export as Node.js Module.
exports.Stack = new Stack;

console.log("INFO :: Stack Module Loaded");
