const GH_ACCESS_TOKEN_KEY = 'ghAccessToken';

window.onload = async (event) => {

    let ghAccessToken = await getGhAccessToken();

    if(ghAccessToken) {
        document.getElementById("login").style.display = "none";
        document.getElementById("main").style.display = "block";
        showRepos();
    } else {
        var loginBtn = document.getElementById('loginBtn');
        loginBtn.href = 'https://github.com/login/oauth/authorize?scope=user:email,read:org&client_id=' + ENV.GITHUB.CLIENT_ID;
        document.getElementById("login").style.display = "block";
        document.getElementById("main").style.display = "none";
    }
    
};

const getGhAccessToken = async () => {

    if(localStorage.getItem(GH_ACCESS_TOKEN_KEY)) {
        return localStorage.getItem(GH_ACCESS_TOKEN_KEY);
    }

    var url = new URL(location.href);
    var code = url.searchParams.get("code");
    window.history.replaceState({}, document.title, window.location.pathname);

    if(code == null) {
        return;
    }

    let ghAccessToken = await fetch('/.netlify/functions/github-client?code=' + code).then(function (response) {
        return response.json();
    }).catch(function (err) {
        console.warn('Could not get ghAccessToken.', err);
    });

    localStorage.setItem(GH_ACCESS_TOKEN_KEY, ghAccessToken.msg.access_token);

    return localStorage.getItem(GH_ACCESS_TOKEN_KEY);
}

const showRepos = async () => {
    fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(GH_ACCESS_TOKEN_KEY) }
    }).then(function(response) {
        return response.json();
    }).then(function(data){
        data.forEach(function (repo, index) {
            showReview(repo);
        });
    });
};

const showReview = async repo => {
    fetch('https://api.github.com/repos/' + repo.full_name + '/pulls?state=all', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem(GH_ACCESS_TOKEN_KEY) }
    }).then(function(response) {
        return response.json();
    }).then(function(data){
        data.forEach(function (pr, index) {
            document.getElementById('pr-list').innerHTML += `
                <li class="Box-row">
                    <div class="text-small text-gray-light">
                        <svg class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
                        <span class="author"><a href="${repo.owner.html_url}" class="url fn" rel="author" target="_blank">${repo.owner.login}</a></span>
                        <span class="path-divider">/</span>
                        <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
                    </div>
                    <a href="${pr.html_url}" target="_blank"> #${pr.number}: ${pr.title} (${pr.state})</a>
                    <div class="text-small text-gray-light">
                        <span><strong>Created at</strong>: ${new Date(pr.created_at).toString()}</span>
                        <span><strong>Updated at</strong>: ${new Date(pr.updated_at).toString()}</span>
                        <span><strong>Closed at</strong>: ${pr.closed_at ? new Date(pr.closed_at).toString() : '-'}</span>
                        <span><strong>Merged at</strong>: ${pr.merged_at ? new Date(pr.merged_at).toString() : '-'}</span>
                    <div>
                </li>
            `;
        });
    });
};