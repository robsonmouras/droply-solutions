  // Utilidades simples para cookies/localStorage
      const storage = {
        set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
        get: (k, d = null) => {
          const v = localStorage.getItem(k);
          try { return v ? JSON.parse(v) : d; } catch { return d; }
        },
        del: (k) => localStorage.removeItem(k)
      };

      // Ano no footer e data de atualização dinâmica (opcional)
      document.getElementById('year').textContent = new Date().getFullYear();

      // Se quiser automatizar a data de atualização para hoje, descomente a linha abaixo:
      // document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('pt-BR');

      // Theme toggle (dark <-> light)
      const themeBtn = document.getElementById('themeToggle');
      const root = document.documentElement;
      const savedTheme = storage.get('theme');
      if (savedTheme === 'light') {
        root.classList.remove('dark');
      }
      themeBtn.addEventListener('click', () => {
        root.classList.toggle('dark');
        storage.set('theme', root.classList.contains('dark') ? 'dark' : 'light');
      });

      // Back-to-top visibility
      const toTop = document.getElementById('toTop');
      const onScroll = () => {
        if (window.scrollY > 300) toTop.classList.remove('hidden');
        else toTop.classList.add('hidden');
      };
      window.addEventListener('scroll', onScroll);
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      // Preferências de cookies
      const ckAnalytics = document.getElementById('ck-analytics');
      const ckMarketing = document.getElementById('ck-marketing');
      const saveCookiesBtn = document.getElementById('saveCookies');
      const clearCookiesBtn = document.getElementById('clearCookies');
      const cookieStatus = document.getElementById('cookieStatus');
      const cookieBanner = document.getElementById('cookieBanner');
      const acceptAllBtn = document.getElementById('acceptAll');
      const openPrefsBtn = document.getElementById('openPrefs');

      const applyCookiePrefsUI = () => {
        const prefs = storage.get('cookie_prefs');
        if (prefs) {
          ckAnalytics.checked = !!prefs.analytics;
          ckMarketing.checked = !!prefs.marketing;
          cookieStatus.textContent = 'Preferências carregadas.';
          cookieBanner.classList.add('hidden');
        } else {
          cookieBanner.classList.remove('hidden');
        }
      };

      saveCookiesBtn.addEventListener('click', () => {
        const prefs = { analytics: ckAnalytics.checked, marketing: ckMarketing.checked, ts: Date.now() };
        storage.set('cookie_prefs', prefs);
        cookieStatus.textContent = 'Preferências salvas.';
        cookieBanner.classList.add('hidden');
      });

      clearCookiesBtn.addEventListener('click', () => {
        storage.del('cookie_prefs');
        ckAnalytics.checked = false;
        ckMarketing.checked = false;
        cookieStatus.textContent = 'Preferências limpas.';
        cookieBanner.classList.remove('hidden');
      });

      acceptAllBtn.addEventListener('click', () => {
        const prefs = { analytics: true, marketing: true, ts: Date.now() };
        storage.set('cookie_prefs', prefs);
        cookieBanner.classList.add('hidden');
      });

      openPrefsBtn.addEventListener('click', () => {
        document.getElementById('cookies').scrollIntoView({ behavior: 'smooth' });
      });

      applyCookiePrefsUI();

      // Copiar e-mail
      const copyEmailBtn = document.getElementById('copyEmail');
      copyEmailBtn.addEventListener('click', async () => {
        const email = 'privacidade@droply.solutions';
        try {
          await navigator.clipboard.writeText(email);
          copyEmailBtn.textContent = 'Copiado!';
          setTimeout(() => (copyEmailBtn.textContent = email), 1500);
        } catch (e) {}
      });