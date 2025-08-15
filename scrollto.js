// Scroll to an anchor on this page without clogging "back" history
function scrollToAnchor(selectedAnchor) {
	// Scroll to the anchor
	document.querySelector(selectedAnchor).scrollIntoView();
	// Replace previous history with this page
	history.replaceState(null, "", selectedAnchor);
}

// Go through and replace all links to anchors on this page with onclick events
function replaceAnchorLinks() {
	// Get this page's URL without any anchors
	var leading = window.location.href.replace(/\#.*$/, "")
	// For each anchor element
	document.querySelectorAll("a").forEach(oldAnchor => {
		// If it links to another anchor on this page
		if (oldAnchor.href.startsWith(leading + "#")) {
			// Find out where it links to
			var name = oldAnchor.href.match(/\#.*$/)
			// Make a deep clone of it
			var newAnchor = oldAnchor.cloneNode(true);
			// Add an onlick event to scroll to the anchor
			newAnchor.onclick = () => scrollToAnchor(name);
			// Remove the old link
			newAnchor.removeAttribute("href");
			// Replace the original with the clone
			oldAnchor.parentNode.replaceChild(newAnchor, oldAnchor);
		}
	});
}