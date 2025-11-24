// content.js
(function () {
  'use strict';

  // Return true if node contains a descendant element whose trimmed textContent === targetText
  function nodeContainsExactText(node, targetText) {
    if (!node) return false;
    // look for common inner text containers seen in the example
    const candidates = node.querySelectorAll('.b4qJse, .JKHhuf, .XRvNP, .HISHce, .a8DSAf, .AmH9I, .mNKakd');
    for (const c of candidates) {
      if (c && c.textContent && c.textContent.trim() === targetText) return true;
    }
    // fallback: check direct textContent of node (trimmed)
    if (node.textContent && node.textContent.trim() === targetText) return true;
    return false;
  }

  // Hide outer container(s) that match pattern
  function hideSummarizeCards() {
    const TARGET = 'Summarize this email';
    // select outermost container by the class you provided
    const outerNodes = document.querySelectorAll('div.DC5CAd');
    outerNodes.forEach(node => {
      try {
        if (nodeContainsExactText(node, TARGET)) {
          // hide visually and from layout
          node.style.display = 'none';
          // also mark it for easier debugging
          node.setAttribute('data-kopi-hidden', 'true');
        }
      } catch (e) {
        // ignore DOM exceptions
        console.error('hideSummarizeCards error', e);
      }
    });
  }

  // Run initially
  hideSummarizeCards();

  // MutationObserver for dynamic content (Gmail loads content dynamically)
  const observer = new MutationObserver((mutations) => {
    let shouldRun = false;
    for (const m of mutations) {
      // If nodes were added or subtree changed, re-run hide routine
      if (m.addedNodes && m.addedNodes.length) { shouldRun = true; break; }
      if (m.type === 'childList' || m.type === 'subtree') { shouldRun = true; break; }
    }
    if (shouldRun) hideSummarizeCards();
  });

  // Observe body for changes; Gmail injects and updates nodes deeply
  const root = document.body || document.documentElement;
  if (root) {
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }

  // Fallback: occasionally re-run in case observer misses something
  const fallbackInterval = setInterval(hideSummarizeCards, 2000);

  // Optional: stop fallback after a while to reduce overhead (e.g., 2 minutes)
  setTimeout(() => clearInterval(fallbackInterval), 2 * 60 * 1000);

})();
