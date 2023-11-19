import { auth0 } from "../auth/auth0-plugin";

const getRoles = async () => {
  const resp = auth0;
  return auth0.idTokenClaims._rawValue["https://asmadebyalex.com/roles"];
};

export const adminGuard = async (to, from, next) => {
  const roles = await getRoles();
  if (roles.includes("SuperAdmin")) {
    // console.log("GRANTED");
    next();
  } else {
    // console.log("DENIED");
    next("/login");
  }
};
