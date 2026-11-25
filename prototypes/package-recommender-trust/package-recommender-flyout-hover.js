document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('reco-toggle');
  const flyout = document.getElementById('recommendations');
  const search = document.getElementById('package-search');
  const menu = document.getElementById('results');
  let closeTimer;

  function openFlyout() {
    if (menu.hidden || trigger.hidden) return;
    clearTimeout(closeTimer);
    flyout.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    trigger.querySelector('.reco-toggle-icon').textContent = '‹';
  }
  function closeFlyout() {
    flyout.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.querySelector('.reco-toggle-icon').textContent = '›';
  }
  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (!trigger.matches(':hover') && !flyout.matches(':hover') &&
          !trigger.contains(document.activeElement) && !flyout.contains(document.activeElement)) {
        closeFlyout();
      }
    }, 180);
  }

  trigger.addEventListener('pointerenter', openFlyout);
  trigger.addEventListener('pointerleave', scheduleClose);
  flyout.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  flyout.addEventListener('pointerleave', scheduleClose);
  trigger.addEventListener('focus', openFlyout);
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      openFlyout();
      flyout.querySelector('a, [tabindex="0"]')?.focus();
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !flyout.hidden) {
      closeFlyout();
      trigger.focus();
    }
  });
  trigger.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    openFlyout();
  }, true);
  search.addEventListener('input', () => {
    if (!search.value.trim()) closeFlyout();
  });
});
