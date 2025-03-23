interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export default JwtPayload;
