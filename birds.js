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

