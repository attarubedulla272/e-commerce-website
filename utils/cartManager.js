const fs = require('fs').promises;
const path = require('path');

const CART_FILE_PATH = path.join(__dirname, '../data/cart.json');

// Ensure data directory exists
async function ensureDataDirectory() {
    const dataDir = path.dirname(CART_FILE_PATH);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Initialize cart file if it doesn't exist
async function initializeCartFile() {
    try {
        await fs.access(CART_FILE_PATH);
    } catch {
        await fs.writeFile(CART_FILE_PATH, JSON.stringify({ items: [] }));
    }
}

// Read cart data from file
async function readCartData() {
    await ensureDataDirectory();
    await initializeCartFile();
    
    try {
        const data = await fs.readFile(CART_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading cart file:', error);
        return { items: [] };
    }
}

// Write cart data to file
async function writeCartData(cartData) {
    await ensureDataDirectory();
    await fs.writeFile(CART_FILE_PATH, JSON.stringify(cartData, null, 2));
}

// Add item to wishlist/cart
async function addToWishlist(userId, productId, productData) {
    const cartData = await readCartData();
    
    // Check if item already exists for this user
    const existingItemIndex = cartData.items.findIndex(item => 
        item.userId === userId && item.productId === productId
    );
    
    if (existingItemIndex !== -1) {
        // Update existing item
        cartData.items[existingItemIndex] = {
            ...cartData.items[existingItemIndex],
            ...productData,
            addedAt: new Date().toISOString()
        };
    } else {
        // Add new item
        cartData.items.push({
            userId,
            productId,
            ...productData,
            addedAt: new Date().toISOString()
        });
    }
    
    await writeCartData(cartData);
    return cartData.items;
}

// Remove item from wishlist/cart
async function removeFromWishlist(userId, productId) {
    const cartData = await readCartData();
    
    cartData.items = cartData.items.filter(item => 
        !(item.userId === userId && item.productId === productId)
    );
    
    await writeCartData(cartData);
    return cartData.items;
}

// Get user's wishlist/cart
async function getUserWishlist(userId) {
    try {
        if (!userId) {
            console.error('No userId provided to getUserWishlist');
            return [];
        }
        
    const cartData = await readCartData();
    return cartData.items.filter(item => item.userId === userId);
    } catch (error) {
        console.error('Error getting user wishlist:', error);
        return [];
    }
}

// Clear user's wishlist/cart
async function clearUserWishlist(userId) {
    const cartData = await readCartData();
    cartData.items = cartData.items.filter(item => item.userId !== userId);
    await writeCartData(cartData);
    return cartData.items;
}

// Get user's wishlist count
async function getUserWishlistCount(userId) {
    try {
        if (!userId) {
            console.error('No userId provided to getUserWishlistCount');
            return 0;
        }
        
    const wishlistItems = await getUserWishlist(userId);
    return wishlistItems.length;
    } catch (error) {
        console.error('Error getting user wishlist count:', error);
        return 0;
    }
}

// Get all cart data (for admin purposes)
async function getAllCartData() {
    return await readCartData();
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist,
    clearUserWishlist,
    getUserWishlistCount,
    getAllCartData
}; 