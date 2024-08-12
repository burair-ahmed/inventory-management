// models/client.model.js
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  // Remove unique constraint here
    plot: { type: Number, required: true },
    block: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    amountDue: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    notified: { type: Boolean, default: false }, // Default notified to false
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByAdmin: { type: String, required: true},
    email: { type: String, required: false },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
