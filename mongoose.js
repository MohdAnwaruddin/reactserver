const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

const connect = async () => {
    try{

        await mongoose.connect(uri)
        return mongoose;
    }
    catch (e) {
            console.error(e);
            throw e;
    }
    
}
export default connect

