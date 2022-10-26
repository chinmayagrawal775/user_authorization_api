import mongoose from "mongoose";

const connectdb = async (DATABASE_URL) => {
    try {
        const OPTIONS = {
            dbName: 'auth_db'
        }
        await mongoose.connect(DATABASE_URL, OPTIONS)
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log(error)
    }
}

export default connectdb