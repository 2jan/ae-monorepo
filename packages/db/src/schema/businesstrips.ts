import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { timestamps } from "./common";
//import { requestStatus } from "../types/request";

const requestStatusNames = [
  "draft",
  "toApprove",
  "cancelled",
  "approved",
  "rejected",
  "toCompleting",
  "completed",
  "inProgress",
] as const;

type RequestStatus = (typeof requestStatusNames)[number];

export const requestStatusEnum = pgEnum("request_statuses", requestStatusNames);

export const userTable = table("user", {
  id: t.serial().primaryKey(),
  email: t.varchar({ length: 128 }).notNull().unique(),
  ...timestamps,
});

export const userRelations = relations(userTable, ({ many }) => ({
  requests: many(requestTable),
}));

export const cityTable = table("city", {
  id: t.serial().primaryKey(),
  name: t.varchar({ length: 128 }).notNull(),
  voivodeship: t.smallint().notNull(),
  ...timestamps,
});

export const cityRelations = relations(cityTable, ({ many }) => ({
//   requestsTo: many(requestTable),
  requestsFrom: many(requestTable),
}));

export const requestTable = table("request", {
  id: t.serial().primaryKey(),
  beneficiaryId: t
    .integer()
    .references((): AnyPgColumn => userTable.id)
    .notNull(),
  cityFromId: t
    .integer()
    .references((): AnyPgColumn => cityTable.id)
    .notNull(),
  cityToId: t
    .integer()
    .references((): AnyPgColumn => cityTable.id)
    .notNull(),
  dateFrom: t.date(),
  dateTo: t.date(),
  status: requestStatusEnum().default("draft"),
});

export const requestRelations = relations(requestTable, ({ one }) => ({
	beneficiary: one(userTable, {
		fields: [requestTable.beneficiaryId],
		references: [userTable.id],
	}),
    cityFrom: one(cityTable, {
        fields: [requestTable.cityFromId],
        references: [cityTable.id],
    }),
    // cityTo: one(cityTable, {
    //     fields: [requestTable.cityToId],
    //     references: [cityTable.id],
    // }),
}));
