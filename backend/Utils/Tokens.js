
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/*
create access token
*/

const AccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
      expiresIn: "30m",
    });
  };
  
  /*
  create a refresh token
  */
  
  const RefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });
  };
  
  export {
    AccessToken,
    RefreshToken
  }