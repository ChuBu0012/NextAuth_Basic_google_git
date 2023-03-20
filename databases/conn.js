import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL)
        if (connection.readyState === 1) return Promise.resolve(true)
    } catch (err) {
        return Promise.reject("เชื่อมฐานข้อมูลไม่สำเร็จ")
    }
}
export default connectMongoDB