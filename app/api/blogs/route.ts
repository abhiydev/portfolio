import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Blog from "@/app/db/models/Blog";

// ✅ GET: Fetch all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("GET /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new blog
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, desc, imageURL, slug } = body;

    if (!title || !desc || !slug) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Slug already exists" },
        { status: 409 }
      );
    }

    const blog = await Blog.create({
      title,
      desc,
      imageURL,
      slug,
      author: "Abhishek Chedwal",
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("POST /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update blog by ID (?id=)
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const updates = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing blog ID" },
        { status: 400 }
      );
    }

    const updated = await Blog.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (error) {
    console.error("PUT /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Delete blog by ID (?id=)
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing blog ID" },
        { status: 400 }
      );
    }

    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("DELETE /blogs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
