import { selector } from "recoil";
import { cartState } from "./atoms";

export const cartLengthState = selector({
    key: 'cartLengthState',
    get: ({get}) => {
        const cs = get(cartState);

        return cs.length;
    }
})