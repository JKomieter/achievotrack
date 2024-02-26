const { collection, addDoc, getDocs, doc, updateDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");

module.exports.addItem = async (req, res) => {
    try {
        const { title, description, images, sellerName, sellerEmail, sellerPhone, category, sellerId, price } = req.body;
        const itemsCollection = collection(db, 'market');
        await addDoc(itemsCollection, {
            title, 
            description, 
            images, 
            sellerName, 
            sellerEmail, 
            sellerPhone, 
            category, 
            sellerId,
            price
        })

        res.status(200).json({message: "Item added successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}


module.exports.getItems = async (req, res) => {
    try {
        // userId will be used for more personalized feed
        const marketCollection = collection(db, 'market');
        const data = await getDocs(marketCollection);
        const items = data.docs.map((i) => {
            return {
                id: i.id,
                ...i.data()
            }
        })
        console.log(items)
        res.status(200).json(items)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.addItemToCart = async (req, res) => {
    try {
        const { item, userId } = req.body;
        const usersCollection = collection(db, 'users');
        const userDoc = doc(usersCollection, userId);
        const cartCollection = collection(userDoc, 'cart');
        await addDoc(cartCollection, {
            ...item,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const usersCollection = collection(db, 'users');
        const userDoc = doc(usersCollection, userId);
        const cartCollection = collection(userDoc, 'cart');
        const data = await getDocs(cartCollection);
        const cart = [];
        for (const d of data.docs) {
            cart.push({ id: d.id, ...d.data() })
        }
        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}