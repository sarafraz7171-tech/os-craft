(() => {
  const toast = document.getElementById('toast');
  let toastTimer;
  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1700);
  }

  async function copyText(value) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement('textarea');
        area.value = value;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        if (!ok) throw new Error('copy failed');
      }
      notify('کپی شد!');
    } catch {
      notify('کپی انجام نشد؛ متن را دستی انتخاب کن.');
    }
  }

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => copyText(button.dataset.copy || ''));
  });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.textContent = opened ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }

  const search = document.getElementById('commandSearch');
  const groups = [...document.querySelectorAll('.command-group')];
  const categoryButtons = [...document.querySelectorAll('.category-button')];
  const resultCount = document.getElementById('resultCount');
  let selected = 'all';

  function filterCommands() {
    const term = (search?.value || '').trim().toLocaleLowerCase();
    let visibleCommands = 0;
    let visibleGroups = 0;

    groups.forEach(group => {
      const categoryMatch = selected === 'all' || group.dataset.category === selected;
      let groupHasMatch = false;
      group.querySelectorAll('.command-card').forEach(card => {
        const haystack = (card.innerText + ' ' + (card.dataset.search || '')).toLocaleLowerCase();
        const match = !term || haystack.includes(term);
        card.classList.toggle('is-hidden', !match);
        if (match) {
          groupHasMatch = true;
          visibleCommands++;
        }
      });
      const isEmptyCategory = group.classList.contains('empty-category');
      const emptyMatches = isEmptyCategory && (!term || group.innerText.toLocaleLowerCase().includes(term));
      const show = categoryMatch && (groupHasMatch || emptyMatches);
      group.classList.toggle('is-hidden', !show);
      if (show) visibleGroups++;
    });

    if (resultCount) {
      resultCount.textContent = term
        ? `${visibleCommands} دستور و ${visibleGroups} بخش مطابق جست‌وجو`
        : selected === 'all' ? `${visibleCommands} دستور شناخته‌شده در راهنما` : `${visibleCommands} دستور در این دسته`;
    }
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(item => item.classList.remove('selected'));
      button.classList.add('selected');
      selected = button.dataset.filter || 'all';
      filterCommands();
    });
  });
  search?.addEventListener('input', filterCommands);
  filterCommands();
})();