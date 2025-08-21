import { jwtDecode } from "jwt-decode"
export interface DecodedToken {
    exp: number;
    iat: number;
    userId: string;
    role: string;
}
export const verifyToken = (token: string): DecodedToken => jwtDecode(token)