import { atom } from "recoil";

export const setUserRoles = atom({
  key: "setuserrole",
  default: {
    value: null,
  },
});

export const isAuthenticate = atom({
  key: "isauthenticate",
  default: {
    value: false,
  },
});
