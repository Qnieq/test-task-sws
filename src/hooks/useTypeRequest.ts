import { useTypedSelector } from "./useTypedSelector"

export const useTypeRequest = () => {
    const { typeRequest } = useTypedSelector(state => state)
    return { typeRequest }
}