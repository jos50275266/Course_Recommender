import cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// set in cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    // if window
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

// get from cookie such as stored token

// will be useful when we need to make request to server with auth token
export const getCookie = (key) => {
  if (process.browser) {
    //   ("token")
    return cookie.get(key);
  }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage during signin
// next = callback
export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

// access user info from localstorage isAuth()
export const isAuth = () => {
  if (process.browser) {
    //   localstorage에만 의존하지 않기 cookie도 항상 확인
    const cookieChecked = getCookie("token");

    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const maintainerAfterRefresh = async () => {
  if (process.browser) {
    try {
      const tokenDecoded = await jwt.verify(cookie.get("token"), JWT_SECRET);
      console.log("tokenDecoded", tokenDecoded);
      if (tokenDecoded) {
        return localStorage.getItem("user") ? true : false;
      }
    } catch (err) {
      return false;
    }
  }

  return false;
};

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};
