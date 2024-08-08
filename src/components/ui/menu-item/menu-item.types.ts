import { Dispatch, SetStateAction } from "react";

export interface IMenuItemProps {
    setActiveItem: Dispatch<SetStateAction<number>>
    activeItem: number
    index: number
    title: string
}