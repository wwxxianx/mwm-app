import { useNavigate } from "react-router-dom";

export function useRevalidate() {
    const navigate = useNavigate();

    function revalidate(stack = 0) {
        navigate(stack, { state: { revalidate: true } });
    }

    return revalidate;
}
