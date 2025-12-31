(function () {
  'use strict';

  function nodeContainsExactText(node, targetText) {
    if (!node) return false;
    const candidates = node.querySelectorAll('.b4qJse, .JKHhuf, .XRvNP, .HISHce, .a8DSAf, .AmH9I, .mNKakd');
    for (const c of candidates) {
      if (c && c.textContent && c.textContent.trim() === targetText) return true;
    }
    if (node.textContent && node.textContent.trim() === targetText) return true;
    return false;
  }

  function hideSummarizeCards() {
    const TARGET = 'Summarize this email';
    const outerNodes = document.querySelectorAll('div.DC5CAd');
    outerNodes.forEach(node => {
      try {
        if (nodeContainsExactText(node, TARGET)) {
          node.style.display = 'none';
          node.setAttribute('data-kopi-hidden', 'true');
        }
      } catch (e) {
        console.error('hideSummarizeCards error', e);
      }
    });
  }

  hideSummarizeCards();

  const observer = new MutationObserver((mutations) => {
    let shouldRun = false;
    for (const m of mutations) {
      if (m.addedNodes && m.addedNodes.length) { shouldRun = true; break; }
      if (m.type === 'childList' || m.type === 'subtree') { shouldRun = true; break; }
    }
    if (shouldRun) {
      hideSummarizeCards();
    } 
  });

  const root = document.body || document.documentElement;
  if (root) {
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }

  const fallbackInterval = setInterval(hideSummarizeCards, 2000);

  setTimeout(() => clearInterval(fallbackInterval), 2 * 60 * 1000);

})();
