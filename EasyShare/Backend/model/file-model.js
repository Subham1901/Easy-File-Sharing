import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  filename: String,
  filesize: String,
  createdAt: String,
});

export default mongoose.model("File", fileSchema);
