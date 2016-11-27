const ANIMATION_TIME = 2000; // ms

/**
 * Base class for all Birds, to provide some syntactical sugar.
 * @param {function} song A function which implements the behaviour of a bird.
 * @param {function} animation A function which implements the animation of a
 *     bird.
 * @param {function} [toStringFn] A function which returns the name of a bird.
 */
function Bird( song, animation, toStringFn ) {
	/** The song the bird should sing when it hears another bird. */
	this.apply = song;
	/** The animation the bird should perform when it hears another bird. */
	this.animate = animation;
	/**
	 * The name of the bird. Defaults to the function's toString but we may want
	 * something better in the future
	 */
	if( toStringFn ) this.toString = toStringFn;
}
Bird.prototype = {
	apply: function*( bird ) {
		if( false ) yield null;
		throw new Error('This bird\'s song was unimplemented!');
	},
	animate: function( bird ) {
		throw new Error('This bird\'s animation was unimplemented!');
	},
	toString: function( bird ) {
		return this.apply.toString(); // Not very nice...
		// We probably want a default implementation which calculates the name
		// of a bird.
	},
};


const Idiot = new Bird( function*( x ) {
                          yield { 'bird': this, 'input': x };
                          yield { 'return': x };
                        },
                        function() { /* todo */ },
                        function() { return 'Idiot Bird'; } );

const Mockingbird = new Bird(
	function*( x ) {
		yield { 'bird': this, 'input': x };
		var gen = x.apply(x); // The identifying 'song' part
		for( var result = gen.next(); !result.value.return; result = gen.next() ) {
			if( !result.done ) {
				yield result.value;
			} else {
				throw new Exception('There\'s a bug; the generator was exhausted ' +
				                    'before a return value was calculated.');
			}
		}
		yield result.value;
	},
	function() { /* todo */ },
	function() { return 'Mockingbird'; }
	);


function main() {
	var expression, result;


	// Example case: Idiot Bird hears the Idiot Bird
	expression = Idiot.apply( Idiot ); // typeof result === 'Generator'
	result = expression.next().value;
	console.log( 'My name is', result.bird.toString(),
	             'and I heard', result.input.toString() );
	// -> 'My name is Idiot Bird and I heard Idiot Bird'

	console.log( expression.next().value.return.toString() );
	// -> 'Idiot Bird'

	console.log( expression.next().done );
	// -> true


	// Example case: Idiot Bird hears the Mockingbird
	expression = Idiot.apply( Mockingbird );
	result = expression.next().value;
	console.log( 'My name is', result.bird.toString(),
	             'and I heard', result.input.toString() );
	// -> 'My name is Idiot Bird and I heard Mockingbird'

	console.log( expression.next().value.return.toString() );
	// -> 'Mockingbird'

	console.log( expression.next().done );
	// -> true


	// Example case: Mockingbird hears the Idiot Bird
	expression = Mockingbird.apply( Idiot );
	result = expression.next().value;
	console.log( 'My name is', result.bird.toString(),
	             'and I heard', result.input.toString() );
	// -> 'My name is Mockingbird and I heard Idiot Bird'

	result = expression.next().value;
	console.log( 'My name is', result.bird.toString(),
	             'and I heard', result.input.toString() );
	// -> 'My name is Idiot Bird and I heard Idiot Bird'

	console.log( expression.next().value.return.toString() );
	// -> 'Idiot Bird'

	console.log( expression.next().done );
	// -> true


	// Example case: Mockingbird hears the Mockingbird
	expression = Mockingbird.apply( Mockingbird );

	function nextStep() {
		var next = expression.next();
		if( !next.done ) {
			console.log( 'My name is', next.value.bird.toString(),
			             'and I heard', next.value.input.toString() );
			setTimeout( nextStep, ANIMATION_TIME ); // Schedule the next calculation.
		} else {
			console.error( 'This can\'t happen. There\'s a bug in the program.' );
		}
	}
	nextStep();
	// Prints 'My name is Mockingbird and I heard Mockingbird' every 2 sec.
}
main();


// in "(|bird|)", bird is a combinator;   (|A|)--(|B|) denotes application B(A) or (B A)

function apply(elem,input){ //  (|input|)---(|elem|)...
	/* move input inside elem
	 * Pseudocode:
	 *
	 * animate(input.right, elem.left);
	 * elem.classList.append("betareduced")  (if it is the ear of the bird)
	 * duplicate (or remove!) combinator at rhyme if necessary
	 * reverse animate each from rhyme beginning to end, {erasing rhyme lines}
	 * smoothly animate containing combinator to correct size?
	 *   - absolute v. relative positioning;  overflow must be visible (positioned outside content box)
	 * if there is already a combinator: apply immediately vs. add to the list of 'ready' combinators:
	 *   - (Eager vs Lazy  ~~  depth-first vs breadth-first)
	 *   - now   (|input|)---(|elem.child|)...      (can apply again)
	 * otherwise: replace .continue with input
	 *   - now  (|input|)...      (check for final output or toApply)
	 *
	 * OR if it is (|input|)--|elem.child| continue to move in (repeat entire apply) until
	 */
}

function toApply(elem){  // .top.combinator replaces .apply
	/* (|child1|)----.
	 *               |
	 * (|child2|)---(O)---
	 *
	 * becomes
	 *
	 * (|child2|)---(|child1|)---
	 *
	 * then apply can be called.
	 *
	 * -transition child1 to the right, expanding containing and applycircle
	 * -move (|child1|) to applycircle
	 * -reverse transition from top to applycircle
	 * -remove applycircle now it overlaps with (|child1|)
	 * -immediately call apply  (for both eager and lazy)
	 */
}
