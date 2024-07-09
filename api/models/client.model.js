import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    plot: {
      type: Number,
      required: true,
    },
    block: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model('Client', clientSchema);

export default Client;