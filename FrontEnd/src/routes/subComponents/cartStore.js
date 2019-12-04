import {  writable } from "svelte/store";

export const treeData = writable({
    treeName: '',
    treePrice: 0,
    treeID: ''
});

export const cartData = writable({
    data: [],
    quantity: 0
});

export const api = {
    setArbol: (treeData) => {
        localStorage.setItem('arboles', JSON.stringify(treeData));
    },
    getArbol: () => {
        return localStorage.getItem('arboles');
    }
};