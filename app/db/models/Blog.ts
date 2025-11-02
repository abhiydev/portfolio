import mongoose, { Schema, Document, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  desc: string;
  imageURL?: string;
  slug: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    imageURL: { type: String },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
  },
  { timestamps: true, collection: "blogs" } // 👈 this line ensures correct collection
);

const Blog = models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
