const baseUrl = 'https://api.github.com';

document.addEventListener('DOMContentLoaded', () => {

  function formEvent(event) {
    event.preventDefault();

    const searchValue = document.getElementById('search').value;
    const searchEndpointURL = `${baseUrl}/search/users?q=${searchValue}`;

    fetch(searchEndpointURL)
      .then(res => res.json())
      .then(data => {
        const dataDisplay = document.getElementById('github-container');
        // Clear the previous results
        dataDisplay.innerHTML = '';

        data.items.forEach(user => {
          const username = user.login;
          const avatarUrl = user.avatar_url;
          const profileUrl = user.html_url;

          const userElement = document.createElement('div');
          userElement.innerHTML = `
            <h3>${username}</h3>
            <img src="${avatarUrl}" alt="${username}'s avatar">
            <a href="${profileUrl}" target="_blank">Profile</a>
          `;

          userElement.addEventListener('click', () => {
            clickUserEvent(username);
          });

          dataDisplay.appendChild(userElement);
        });
      });
  }

  function clickUserEvent(username) {
    const userReposEndpointURL = `${baseUrl}/users/${username}/repos`;

    fetch(userReposEndpointURL)
      .then(res => res.json())
      .then(data => {
        const dataDisplay = document.getElementById('github-container');
        // Clear the previous results
        dataDisplay.innerHTML = '';

        data.forEach(repo => {
          const repoName = repo.name;
          const repoUrl = repo.html_url;

          const repoElement = document.createElement('div');
          repoElement.innerHTML = `
            <h3>${repoName}</h3>
            <a href="${repoUrl}" target="_blank">Repository</a>
          `;

          dataDisplay.appendChild(repoElement);
        });
      });
  }

  const form = document.getElementById('github-form');
  form.addEventListener('submit', formEvent);
})


