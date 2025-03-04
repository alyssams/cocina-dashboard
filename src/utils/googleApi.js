import { gapi } from 'gapi-script';

const CLIENT_ID = '460386706129-mnnii2nbmgvvv6dhnvs4nfogbndf9ps2.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBwex_BdK-e9akt7hF0uA6jC_HOUqYyn04';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks.readonly';

export const initGoogleApi = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client', async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            'https://tasks.googleapis.com/$discovery/rest?version=v1',
          ],
          scope: SCOPES,
        });

        console.log('✅ Google API initialized');
        resolve();
      } catch (error) {
        console.error('❌ Google API Initialization Error:', error);
        reject(error);
      }
    });
  });
};

export const checkScopes = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  if (authInstance) {
    const user = authInstance.currentUser.get();
    console.log('✅ Granted Scopes:', user.getGrantedScopes());
  } else {
    console.error("❌ Auth instance not available to check scopes.");
  }
};
