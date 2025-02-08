import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { slideSegment } from "./schema";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workshops").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workshops")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .unique();
  },
});

export const setSlideSegments = mutation({
  args: {
    workshopId: v.id("workshops"),
    slideSegments: v.array(slideSegment),
  },
  handler: async (ctx, args) => {
    const { workshopId, slideSegments } = args;

    const patch: { [key: string]: any } = {};
    if (slideSegments !== undefined) patch.slideSegments = slideSegments;

    return await ctx.db.patch(workshopId, patch);
  },
});
