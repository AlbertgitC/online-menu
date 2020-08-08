import { Auth } from 'aws-amplify';

export async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
};

// export function isAuthenticated() {
//     try {
//         const user = await Auth.currentAuthenticatedUser();
//         console.log("yes auth");
//         return true;
//     } catch (error) {
//         console.log("no auth");
//         return false;
//     }
// };