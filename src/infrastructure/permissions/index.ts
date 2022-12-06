import { Authorization } from "../Authorization";
import jwt from 'jsonwebtoken';

export const getContext = ((req: any) => {
  const jwtoken = Authorization.getTokenFromHeaders(req);
  if (!jwtoken) return { jwt: jwtoken };
  let token = null;
  try {
    token = jwt.verify(jwtoken, `${process.env.SERVER_SECRET}`);
  } catch (error) {}
  return {
    jwt: jwtoken,
    token
  }
});

export const isAuthenticated = (ctx: any) => {
  if (!ctx.token){
    ctx.isAuthenticatedError = true;
    return false;
  }
  return true;
}