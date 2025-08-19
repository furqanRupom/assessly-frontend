import { useAppSelector } from "../hooks/hooks";
import { useCurrentUserToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

export function useUser() {
    const token = useAppSelector(useCurrentUserToken);

    if (token) {
        return verifyToken(token);
    }
    return null;
}
