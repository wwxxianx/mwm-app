import { useNavigate } from "react-router-dom";

export function useRevalidate(stack = 0) {
    const navigate = useNavigate();

    function revalidate() {
        navigate(stack, { state: { revalidate: true } });
    }

    return revalidate;
}