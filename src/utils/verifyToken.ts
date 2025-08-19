import { jwtDecode } from "jwt-decode"
export interface DecodedToken {
    exp: number;
    iat: number;
    id: string;
    role: string;
}
export const verifyToken = (token: string): DecodedToken => jwtDecode(token)