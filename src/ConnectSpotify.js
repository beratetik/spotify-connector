import { generateRandomString } from './helper';

class ConnectSpotify {
    /**
   * Make Spotify API Authorization
   * @param {string} clientID - Spotify Developer Client ID.
   * @param {string} clientSecret - Spotify Developer Client Secret.
   * @param {string} redirectURI - Redirect URI that was allowed on Spotify Developer Console.
   * @param {(null|string[])} [authorizationScopes=null] Authorization Scopes - Scopes list to access specific API endpoints on behalf of a Spotify user.
   */
    constructor({ clientID, clientSecret, redirectURI, authorizationScopes = null }) {
        this.baseURL = "https://accounts.spotify.com/authorize?response_type=token&client_id=";
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.redirectURI = redirectURI;
        this.authorizationScopes = authorizationScopes ? [...authorizationScopes] : authorizationScopes;
        this.state = generateRandomString(16);
    }

    /**
     * @function connect - Redirects to Spotify Authentication page
     */
    connect() {
        const URIClientID = encodeURIComponent(this.clientID),
            URIAuthorizationScopes = this.authorizationScopes ? `&scope=${encodeURIComponent(this.authorizationScopes)}` : "",
            URIRedirectURI = encodeURIComponent(this.redirect_uri),
            URIState = encodeURIComponent(this.state);

        const URL = `${this.baseURL}?response_type=token&client_id=${URIClientID}${URIAuthorizationScopes}&redirect_uri=${URIRedirectURI}&state=${URIState}`;
        window.location = URL;
    }
}

module.exports = ConnectSpotify;