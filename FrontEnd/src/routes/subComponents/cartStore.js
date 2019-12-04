import {  writable } from "svelte/store";

export const treeData = writable({
	id: '',
	name: '',
	cost: 0,
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