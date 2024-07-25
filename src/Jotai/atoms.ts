import { atom } from "jotai";
import { Item } from "../type/ItemType";

export const itemListAtom = atom<Item[]>([]);
