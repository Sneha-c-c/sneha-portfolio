export const NAV_HEIGHT = 64;
const HEADING_GAP = 24;

export function getHashId(href: string): string | null {
  if (href.startsWith("#")) return href.slice(1);
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  return href.slice(hashIndex + 1) || null;
}

export function scrollToHash(href: string) {
  const id = getHashId(href);
  if (!id) return;

  const element = document.getElementById(id);
  if (!element) return;

  // Land the section's content (not its padded edge) just below the fixed navbar.
  const paddingTop = parseFloat(window.getComputedStyle(element).paddingTop) || 0;
  const top =
    element.getBoundingClientRect().top +
    window.scrollY +
    paddingTop -
    NAV_HEIGHT -
    HEADING_GAP;

  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  window.history.pushState(null, "", `#${id}`);
}

export function handleHashNavigation(
  event: { preventDefault: () => void },
  href: string,
) {
  const id = getHashId(href);
  if (!id) return false;

  event.preventDefault();

  const isHomeHash = href === `#${id}` || href === `/#${id}`;
  if (!isHomeHash) return false;

  if (window.location.pathname !== "/") {
    window.location.assign(`/#${id}`);
    return true;
  }

  scrollToHash(`#${id}`);
  return true;
}
