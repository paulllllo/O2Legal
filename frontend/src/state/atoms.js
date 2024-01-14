import { atom } from "recoil";

export const cartState = atom({
    key: 'cartState',
    default: []
});

export const notifState = atom({
    key: 'notifState',
    default: ''
});