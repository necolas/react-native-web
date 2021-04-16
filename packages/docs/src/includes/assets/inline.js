/**
 * Navigation display
 */
function setupNavigationDrawer() {
  const navigation = document.getElementById('navigation');
  const closebtn = document.getElementById('close-nav');
  const showbtn = document.getElementById('show-nav');
  let navopen = false;

  if (closebtn == null || showbtn == null || navigation == null) {
    return;
  }

  // SHOW
  function showNavigation() {
    navigation.classList.remove('opacity-0');
    navigation.style.right = 'auto';
    showbtn.classList.add('hidden');
    closebtn.classList.remove('hidden');
    navopen = true;
  }
  showbtn.addEventListener('click', showNavigation);
  // CLOSE
  function closeNavigation() {
    navigation.classList.add('opacity-0');
    closebtn.classList.add('hidden');
    navigation.style.right = null;
    showbtn.classList.remove('hidden');
    navopen = false;
  }
  document.addEventListener('click', (e) => {
    if (navopen && !navigation.contains(e.target) && !showbtn.contains(e.target)) {
      closeNavigation();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (navopen && e.key === 'Escape') {
      closeNavigation();
    }
  });
}

/**
 * Preserve nav scroll position across page loads
 */
function setupNavigationScroll() {
  const scroller = document.getElementById('navigation-scroller');
  const navScrollPositionKey = 'navScrollPosition';

  if (scroller == null) {
    return;
  }

  window.addEventListener('unload', function () {
    const navScrollPosition = scroller.scrollTop;
    localStorage.setItem(navScrollPositionKey, navScrollPosition);
  });
  const previousScrollPosition = localStorage.getItem(navScrollPositionKey);
  if (previousScrollPosition != null) {
    scroller.scrollTop = previousScrollPosition;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setupNavigationDrawer();
  setupNavigationScroll();
});
