import { NextResponse } from "next/server";
import dbConnect from "@/app/db/dbConnect";
import Blog from "@/app/db/models/Blog";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // 👈 FIXED: must await params

    console.log("📥 Incoming slug param:", slug);
    await dbConnect();
    console.log("✅ DB connected");

    const normalizedSlug = decodeURIComponent(slug.trim().toLowerCase());
    console.log("🔍 Searching blog with slug:", normalizedSlug);

    const blog = await Blog.findOne({ slug: normalizedSlug });

    if (!blog) {
      console.warn("❌ No blog found for slug:", normalizedSlug);
      return NextResponse.json(
        { success: false, message: `Blog not found for slug: ${normalizedSlug}` },
        { status: 404 }
      );
    }

    console.log("✅ Blog found:", blog.title);
    return NextResponse.json({ success: true, blog });
  } catch (error: unknown) {
    console.error("❌ GET /blogs/[slug] error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
