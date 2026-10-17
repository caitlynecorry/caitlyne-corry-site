import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Better Auth manages its own tables (user, session, account, verification)
// through the shared pg Pool; only the Journal tables are modelled here.

export const journalArticles = pgTable("journal_articles", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  category: text("category").notNull(),
  featuredImageUrl: text("featuredImageUrl"),
  featuredImageAlt: text("featuredImageAlt"),
  seoTitle: text("seoTitle"),
  metaDescription: text("metaDescription"),
  status: text("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const journalSettings = pgTable("journal_settings", {
  id: integer("id").primaryKey().default(1),
  substackUrl: text("substackUrl"),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
