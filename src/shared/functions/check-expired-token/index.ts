import {jwtDecode} from 'jwt-decode';


const checkExpiredToken = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    if (decodedToken.exp! > currentTime) {
      return true;
    } 

    return false;

  } catch (error) {
    return false;
  }
}

export default checkExpiredToken;