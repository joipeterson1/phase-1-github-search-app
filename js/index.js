const baseUrl = 'https://api.github.com';

document.addEventListener('DOMContentLoaded', () => {

  function formEvent(event) {
    event.preventDefault()
    const search = document.getElementById('search')
    const searchValue = search.value
    const searchEndpointURL = `${baseUrl}/search/users?q=${searchValue}`;

    fetch(searchEndpointURL)
      .then(res => res.json())
      .then(data => {
        const dataDisplay = document.getElementById('github-container');
        // Clear the previous results
        dataDisplay.innerHTML = ''
        const filteredArray = data.items.filter(user => (user.login === searchValue))

        filteredArray.forEach(user => {
            const userElement = document.createElement('div')

            const usernameContainer = document.createElement('h3')
            usernameContainer.innerHTML = user.login

            const avatarContainer = document.createElement('img')
            avatarContainer.src = user.avatar_url

            const profileContainer = document.createElement('a')
            profileContainer.setAttribute('href',`${user.html_url}`)
            profileContainer.innerHTML = user.html_url
  
            userElement.appendChild(usernameContainer)
            userElement.appendChild(avatarContainer)
            userElement.appendChild(profileContainer)
  
            usernameContainer.addEventListener('click', () => { clickUserEvent() })
  
            dataDisplay.appendChild(userElement);
          })
      });
  }

  function clickUserEvent() {
    const user = document.querySelector('h3')
    const userReposEndpointURL = `${baseUrl}/users/${user.innerText}/repos`;

    fetch(userReposEndpointURL)
      .then(res => res.json())
      .then(data => {
        const dataDisplay = document.getElementById('github-container');
        // Clear the previous results
        dataDisplay.innerHTML = ''

        data.forEach(repo => {
          const repoElement = document.createElement('div');

          const repoNameContainer = document.createElement('h3')
          repoNameContainer.innerHTML = repo.name

          const repoUrlContainer = document.createElement('a')
          repoUrlContainer.setAttribute = ('href', `${repo.html_url}`)
          repoNameContainer.innerHTML = repo.html_url

          repoElement.appendChild(repoNameContainer)
          repoElement.appendChild(repoUrlContainer)

          dataDisplay.appendChild(repoElement);
        })
      })
  }

  const form = document.getElementById('github-form');
  form.addEventListener('submit', formEvent);
})


