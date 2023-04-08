import { z } from "zod";

import { createTRPCRouter, protectedProdecure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  create: protectedProdecure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const listing = await ctx.prisma.listing.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
      return listing;
    }),
});
