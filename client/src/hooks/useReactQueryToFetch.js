import { useQuery } from "react-query"

export const useReactQueryToFetch = (key, fetchFunc) => {
    const { isLoading, data, isError, error } = useQuery(key, fetchFunc);
    return { isLoading, data, isError, error }
}