const { collection, addDoc, getDocs, doc, updateDoc, query, where } = require("firebase/firestore");
const { db } = require("../config/firebase");

module.exports.addItem = async (req, res) => {
    try {
        const { title, description, images, sellerName, sellerEmail, sellerPhone, category, sellerId, price } = req.body;
        const itemsCollection = collection(db, 'market');
        const keywords = title.toLowerCase().split(' ');
        await addDoc(itemsCollection, {
            title,
            description,
            images,
            sellerName,
            sellerEmail,
            sellerPhone,
            category: category.toLowerCase(),
            sellerId,
            price,
            keywords
        })

        res.status(200).json({ message: "Item added successfully" })
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
        res.status(200).json(items || [])
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

module.exports.searchItem = async (req, res) => {
    try {
        const { searchQuery } = req.query;
        const queryWords = searchQuery.toLowerCase().split(' ');
        const marketCollection = collection(db, 'market');
        const result = []
        const set = new Set();
        for (const q of queryWords) {
            const data = await getDocs(query(marketCollection, where('keywords', 'array-contains', q)));
            const items = data.docs.map((i) => {
                if (!set.has(i.id)) {
                    return {
                        id: i.id,
                        ...i.data()
                    }
                }
                set.add(i.id);
            })
            result.push(...items);
        }

        res.status(200).json(result || [])
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getRelatedItems = async (req, res) => {
    try {
        const { category, keywords, id } = req.body;
        console.log(category, keywords, id)
        const marketCollection = collection(db, 'market');
        const result = [];
        const set = new Set();
        for (const q of keywords) {
            const searchByKeywords = query(marketCollection, where('keywords', 'array-contains', q.toLowerCase()));
            const searchByCategory = query(marketCollection, where('category', '==', category.toLowerCase()));

            const [keywordsSnapshot, categorySnapshot] = await Promise.all([
                getDocs(searchByKeywords),
                getDocs(searchByCategory),
            ]);

            const keywordsResults = keywordsSnapshot.docs.map((i) => {
                if (!set.has(i.id) && i.id !== id) {
                    set.add(i.id);
                    return {
                        id: i.id,
                        ...i.data()
                    }
                }
            }).filter(Boolean);

            const categoryResults = categorySnapshot.docs.map((i) => {
                if (!set.has(i.id) && i.id !== id) {
                    set.add(i.id);
                    return {
                        id: i.id,
                        ...i.data()
                    }
                }
            }).filter(Boolean);

            result.push(...keywordsResults, ...categoryResults);
        }
        console.log(result)
        res.status(200).json(result || [])
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}