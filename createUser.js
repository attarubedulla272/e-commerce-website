const mongoose = require('mongoose');
const User = require('./models/user.js');

async function createUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/ShopHub');
        console.log('✅ Connected to MongoDB');

        // Check if user already exists
        const existingUser = await User.findOne({ username: 'ubedulla' });
        if (existingUser) {
            console.log('❌ User "ubedulla" already exists');
            return;
        }

        // Create new user
        const newUser = new User({ 
            email: 'ubedulla@example.com',
            username: 'ubedulla'
        });

        // Register user with password
        const registeredUser = await User.register(newUser, 'ubedulla');
        console.log('✅ User created successfully:', registeredUser.username);
        console.log('User ID:', registeredUser._id);

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error creating user:', error);
    }
}

createUser(); 