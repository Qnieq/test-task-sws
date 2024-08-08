import { RowsContext } from "@/provider/RowsProvider"
import { useContext } from "react"

export const useRows = () => {
    const context = useContext(RowsContext)

    if (!context) {
        throw new Error(
            'You can use "useRows" hook only within a <RowsProvider> component.'
        );
    }

    return context
}