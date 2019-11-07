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