import { create } from "zustand";

export interface ViewStore {
    id: string,
    title: string,
    description: string,
    images: string[],
    sellerId: string,
    sellerName: string,
    sellerEmail: string,
    sellerPhone: string,
    price: number,
    category: string,
    createdAt: Date
    setViewDetails: (
        id: string,
        title: string,
        description: string,
        images: string[],
        sellerId: string,
        sellerName: string,
        sellerEmail: string,
        sellerPhone: string,
        price: number,
        category: string,
        createdAt: Date
    ) => void
}


const viewDetailsStore = create<ViewStore>((set) => ({
    id: '',
    title: '',
    description: '',
    images: [],
    sellerId: '',
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    price: 0,
    category: '',
    createdAt: new Date(),
    setViewDetails: (id, title, description, images, sellerId, sellerName, sellerEmail, sellerPhone, price, category, createdAt) => set({id, title, description, images, sellerEmail, sellerName, sellerPhone, price, category, createdAt})
}))


export default viewDetailsStore;