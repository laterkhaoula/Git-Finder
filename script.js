

 const state = {
      currentUser: null,
      bookmarks: JSON.parse(localStorage.getItem('devhunt_bookmarks')) || [],
      isViewingBookmarks: false,
    };

    // ─────────────────────────────────────────────
    //  UTILITAIRES DOM
    // ─────────────────────────────────────────────
    function showPanel(id) {
      const panels = ['panel-welcome', 'panel-loading', 'panel-error', 'panel-results', 'panel-bookmarks'];
      panels.forEach(p => {
        document.getElementById(p).classList.remove('active');
      });
      document.getElementById(id).classList.add('active');
    }

    function saveBookmarks() {
      localStorage.setItem('devhunt_bookmarks', JSON.stringify(state.bookmarks));
    }

    function updateBookmarkCount() {
      document.getElementById('bookmark-count').textContent = state.bookmarks.length;
    }

    // ─────────────────────────────────
    //  API GITHUB
    // ─────────────────────────────────
    async function fetchUser(username) {
      showPanel('panel-loading');

     try {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${token}`
    }
  });

        if (response.status === 404) {
          showPanel('panel-error');
          document.getElementById('error-message').textContent = `Utilisateur "${username}" non trouvé.`;
          return;
        }

        if (!response.ok) {
          showPanel('panel-error');
          document.getElementById('error-message').textContent = 'Erreur réseau. Réessayez plus tard.';
          return;
        }

        const user = await response.json();
        state.currentUser = user;
        displayUser(user);

      } catch (error) {
        showPanel('panel-error');
        document.getElementById('error-message').textContent = 'Impossible de contacter GitHub. Vérifiez votre connexion.';
      }
    }

    // ─────────────────────────────────────────────
    //  AFFICHER UN PROFIL
    // ─────────────────────────────────────────────
    function displayUser(user) {
      document.getElementById('profile-avatar').src = user.avatar_url;
      document.getElementById('profile-avatar').alt = user.login;
      document.getElementById('profile-name').textContent = user.name || user.login;
      document.getElementById('profile-login').textContent = `@${user.login}`;
      document.getElementById('profile-bio').textContent = user.bio || '';
      document.getElementById('profile-followers').textContent = user.followers;
      document.getElementById('profile-following').textContent = user.following;
      document.getElementById('profile-repos').textContent = user.public_repos;
      document.getElementById('profile-link').href = user.html_url;

      // Mettre à jour le bouton favori
      updateFavButton();

      showPanel('panel-results');
    }

    function updateFavButton() {
      if (!state.currentUser) return;
      const btn = document.getElementById('btn-bookmark');
      const isSaved = state.bookmarks.some(b => b.id === state.currentUser.id);

      if (isSaved) {
        btn.textContent = ' Dans les favoris';
        btn.classList.add('saved');
      } else {
        btn.textContent = ' Ajouter aux favoris';
        btn.classList.remove('saved');
      }
    }

    // ─────────────────────────────────────────────
    //  FAVORIS
    // ─────────────────────────────────────────────
    function toggleBookmark() {
      if (!state.currentUser) return;

      const user = state.currentUser;
      const index = state.bookmarks.findIndex(b => b.id === user.id);

      if (index === -1) {
        // Ajouter
        state.bookmarks.push({
          id: user.id,
          login: user.login,
          name: user.name || user.login,
          avatar_url: user.avatar_url,
        });
      } else {
        // Retirer
        state.bookmarks.splice(index, 1);
      }

      saveBookmarks();
      updateBookmarkCount();
      updateFavButton();

      if (state.isViewingBookmarks) {
        renderBookmarks();
      }
    }

    function removeBookmark(id, event) {
      event.stopPropagation(); // Ne pas déclencher le chargement du profil
      state.bookmarks = state.bookmarks.filter(b => b.id !== id);
      saveBookmarks();
      updateBookmarkCount();
      updateFavButton();
      renderBookmarks();
    }

    function renderBookmarks() {
      const grid = document.getElementById('bookmarks-grid');

      if (state.bookmarks.length === 0) {
        grid.innerHTML = `<div class="empty-bookmarks">⭐<p>Aucun favori pour l'instant.<br>Cherchez un développeur et ajoutez-le !</p></div>`;
        return;
      }

      grid.innerHTML = state.bookmarks.map(b => `
        <div class="bookmark-card" onclick="loadBookmark('${b.login}')">
          <img class="bookmark-avatar" src="${b.avatar_url}" alt="${b.login}" />
          <div class="bookmark-info">
            <div class="bookmark-name">${b.name}</div>
            <div class="bookmark-login">@${b.login}</div>
          </div>
          <button class="btn-remove" onclick="removeBookmark(${b.id}, event)" title="Supprimer">✕</button>
        </div>
      `).join('');
    }

    function loadBookmark(login) {
      state.isViewingBookmarks = false;
      document.getElementById('bookmark-toggle-btn').classList.remove('active');
      document.getElementById('search-input').value = login;
      fetchUser(login);
    }

    // ─────────────────────────────────────────────
    //  TOGGLE VUE FAVORIS
    // ─────────────────────────────────────────────
    function toggleBookmarksView() {
      state.isViewingBookmarks = !state.isViewingBookmarks;
      const btn = document.getElementById('bookmark-toggle-btn');

      if (state.isViewingBookmarks) {
        btn.classList.add('active');
        renderBookmarks();
        showPanel('panel-bookmarks');
      } else {
        btn.classList.remove('active');
        if (state.currentUser) {
          showPanel('panel-results');
        } else {
          showPanel('panel-welcome');
        }
      }
    }

    // ─────────────────────────────────────────────
    //  ÉVÉNEMENTS
    // ─────────────────────────────────────────────
    document.getElementById('search-btn').addEventListener('click', () => {
      const username = document.getElementById('search-input').value.trim();
      if (!username) return;

      state.isViewingBookmarks = false;
      document.getElementById('bookmark-toggle-btn').classList.remove('active');
      fetchUser(username);
    });

    document.getElementById('search-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        document.getElementById('search-btn').click();
      }
    });

    document.getElementById('btn-bookmark').addEventListener('click', toggleBookmark);

    document.getElementById('bookmark-toggle-btn').addEventListener('click', toggleBookmarksView);

    // ─────────────────────────────────────────────
    //  INITIALISATION
    // ─────────────────────────────────────────────
    updateBookmarkCount(); 