const testUsers = [
    {
        id: 1,
        login: "torvalds",
        name: "Linus Torvalds",
        avatar_url: "https://avatars.githubusercontent.com/u/1024588?v=4",
        bio: "Linux creator",
        followers: 200000,
        following: 0,
        public_repos: 50
    },
    {
        id: 2,
        login: "gvanrossum",
        name: "Guido van Rossum",
        avatar_url: "https://avatars.githubusercontent.com/u/6490553?v=4",
        bio: "Python creator",
        followers: 50000,
        following: 50,
        public_repos: 30
    }
];

// Repositories de test

const testRepos = [
    {
        name: "linux",
        description: "Linux kernel",
        language: "C",
        stargazers_count: 15000,
        forks_count: 2000,
        html_url: "https://github.com/torvalds/linux"
    },
    {
        name: "cpython",
        description: "Python interpreter",
        language: "C",
        stargazers_count: 50000,
        forks_count: 23000,
        html_url: "https://github.com/python/cpython"
    }
];

const state = {
    currentUser: null,      // Utilisateur actuellement affiché
    bookmarks: [],          // Favoris sauvegardés
    isViewingBookmarks: false  // Affiche favoris ou résultats?
};

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

const userProfile = document.getElementById('profile-card');
const reposList = document.getElementById('bookmarks-grid'); 

const welcomeState = document.getElementById('panel-welcome');
const loadingState = document.getElementById('panel-loading');
const panelError = document.getElementById('panel-error');

const bookmarksList = document.getElementById('bookmarks-grid');
const bookmarkCount = document.getElementById('bookmark-count');

const panelResult = document.getElementById('panel-results');




    /*   <div class="profile-card" id="profile-card">
        <img class="profile-avatar" id="profile-avatar" src="" alt="avatar" />
        <div class="profile-info">
          <div class="profile-name" id="profile-name">—</div>
          <div class="profile-login" id="profile-login">@—</div>
          <div class="profile-bio" id="profile-bio"></div>
          <div class="profile-stats">
            <div class="stat-badge"><img src="images/folow1.png" alt="" width="40px" height="40">Followers : <span class="stat-value" id="profile-followers">0</span></div>
            <div class="stat-badge"><img src="images/follow.png" alt="" width="35px" height="35px"> Following : <span class="stat-value" id="profile-following">0</span></div>
            <div class="stat-badge"><img src="images/package.png" alt="" width="30px" height="30px"> Repos : <span class="stat-value" id="profile-repos">0</span></div>
          </div>
          <div class="profile-actions">
            <a class="btn-gh" id="profile-link" href="#" target="_blank" rel="noopener">🔗 Voir sur GitHub</a>
            <button class="btn-fav" id="btn-bookmark">⭐ Ajouter au4x favoris</button>
          </div>
        </div>
      </div> */
function displayUserProfile(user) {

    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const profileLogin = document.getElementById('profile-login');

    const profileBio = document.getElementById('profile-bio');


    const profileFollowers = document.getElementById('profile-followers');
    const profileFollowing = document.getElementById('profile-following');
    const profileRepos = document.getElementById('profile-repos');




    // Mettre à jour les éléments du profil
    profileAvatar.src = user.avatar_url;
    profileName.textContent = user.name;
    profileLogin.textContent = user.profileLogin;
    profileBio.textContent = user.bio;
    profileFollowers.textContent = user.followers;
    profileFollowing.textContent = user.following;
    profileRepos.textContent = user.profileRepos;

    // Afficher la carte profil
    panelResult.classList.remove('panel');
    
    // Masquer l'écran d'accueil


  
}

































