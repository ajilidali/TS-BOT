import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
    cmdPrefix: {type: String},
    messages: {
        playing: {type: String, required: true},
        paused: {type: String, required: true},
        stopped: {type: String, required: true},
        // expand list of custom messages for each event
    }

})

export default mongoose.model('Server', schema); // this will look in servers collection, plural.
