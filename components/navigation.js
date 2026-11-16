/* Navigation behaviour (decision 72). Plain script, no framework: include it after the markup, or call
 * fdsNavigation.init(element) yourself. It finds every .fds-nav on the page.
 *
 *  - Collapse: when the links don't fit in the bar, it adds fds-nav--collapsed (the links go into a drawer
 *    behind the menu button). It measures the bar, so there is no breakpoint to keep in step with the links.
 *  - The drawer: the button sets aria-expanded; while the drawer is closed it is hidden and inert, so none
 *    of its links can be reached by keyboard; while it is open, Tab and Shift+Tab stay inside the navigation.
 *  - Closing: Escape, a click outside the drawer, or choosing a link closes it, and focus goes back to the
 *    menu button.
 *  - Links to a section of the page (href="#id") are real links; the script adds a smooth scroll to them,
 *    and a plain jump under prefers-reduced-motion. Give the sections a scroll-margin-top the height of
 *    the bar, since it is sticky.
 */
(function () {
  var OPEN = 'fds-nav--open';
  var COLLAPSED = 'fds-nav--collapsed';
  var READY = 'fds-nav--ready';
  var reduced = function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; };

  function init(nav) {
    if (nav.classList.contains(READY)) return nav.fdsNavigation;
    var toggle = nav.querySelector('.fds-nav__toggle');
    var menu = nav.querySelector('.fds-nav__menu');
    nav.classList.add(READY);
    // The minimal bar has no menu: nothing to collapse or open, only the smooth scroll below.
    var backdrop = null;

    function isOpen() { return nav.classList.contains(OPEN); }

    function sync() {
      var collapsed = nav.classList.contains(COLLAPSED);
      var open = collapsed && isOpen();
      if (toggle) toggle.setAttribute('aria-expanded', String(open));
      if (menu) menu.inert = collapsed && !open;
      if (backdrop) backdrop.hidden = !open;
    }

    function open() {
      if (!toggle || !nav.classList.contains(COLLAPSED)) return;
      nav.classList.add(OPEN);
      sync();
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      nav.classList.remove(OPEN);
      sync();
      if (returnFocus && toggle) toggle.focus({ preventScroll: true });
    }

    function measure() {
      if (!toggle || !menu) return;
      nav.classList.remove(COLLAPSED);
      var collapse = nav.scrollWidth > nav.clientWidth;
      // Collapsing is a change of layout, not something to animate: switch the drawer's transition off
      // for this one change, so a drawer that starts closed doesn't fade out on load.
      menu.style.transition = 'none';
      nav.classList.toggle(COLLAPSED, collapse);
      if (!collapse) nav.classList.remove(OPEN);
      sync();
      void menu.offsetWidth;
      menu.style.transition = '';
    }

    function focusable() {
      return Array.prototype.filter.call(
        nav.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetParent !== null || el === document.activeElement; }
      );
    }

    if (toggle && menu) {
      backdrop = document.createElement('div');
      backdrop.className = 'fds-nav__backdrop';
      backdrop.hidden = true;
      nav.appendChild(backdrop);
      backdrop.addEventListener('click', function () { close(true); });

      toggle.addEventListener('click', function () { if (isOpen()) close(true); else open(); });

      nav.addEventListener('keydown', function (event) {
        if (!isOpen()) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          close(true);
        } else if (event.key === 'Tab') {
          var items = focusable();
          var first = items[0];
          var last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      });

      // Escape also works when focus has been moved out of the navigation by a click.
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen() && !nav.contains(document.activeElement)) close(true);
      });

      if (window.ResizeObserver) new ResizeObserver(measure).observe(nav);
      else window.addEventListener('resize', measure);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      measure();
    }

    // A link to a section of this page: smooth scroll, the address updated, and the drawer closed.
    nav.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link || !nav.contains(link)) return;
      var id = link.getAttribute('href').slice(1);
      var target = id && document.getElementById(id);
      if (isOpen()) close(true);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
      if (window.history && history.pushState) history.pushState(null, '', '#' + id);
    });

    // A link to another page closes the drawer too, so a back-forward page restore doesn't show it open.
    window.addEventListener('pagehide', function () { close(false); });

    nav.fdsNavigation = { open: open, close: close, measure: measure };
    return nav.fdsNavigation;
  }

  function initAll() {
    Array.prototype.forEach.call(document.querySelectorAll('.fds-nav'), init);
  }

  window.fdsNavigation = { init: init, initAll: initAll };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
