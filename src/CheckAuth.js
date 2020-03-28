export const checkAuth = async () => {
    let isAuthenticated = false;

    await fetch('/.netlify/functions/gh-check-auth').then(function(response) {
      if (response.ok) {
        isAuthenticated = true;
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).catch(function(e){
        console.error(e);
    });
    
    console.log('isAuthenticated: ' + isAuthenticated);
    return isAuthenticated;
  }