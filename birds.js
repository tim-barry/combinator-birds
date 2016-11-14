// in "(|bird|)", bird is a combinator;   (|A|)--(|B|) denotes application B(A) or (B A)

function apply(elem,input){ //  (|input|)---(|elem|)...
	/* Pseudocode:
	 * 
	 * animate(input.right, elem.left);
	 * elem.classList.append("betareduced")
	 * duplicate combinator at rhyme
	 * reverse animate each from rhyme beginning to end, erasing rhyme lines
	 * smoothly animate containing combinator to correct size?
	 *   - absolute v. relative positioning;  overflow must be visible (positioned outside content box)
	 * if there is already a combinator: apply immediately vs. add to the list of 'ready' combinators:
	 *   - (Eager vs Lazy  ~~  depth-first vs breadth-first)
	 *   - now   (|input|)---(|elem.child|)...
	 * otherwise: replace .continue with input
	 *   - now  (|input|)...
	 */
}

