# Migration `20200808231713-initial`

This migration has been generated by wilson-pc at 8/8/2020, 7:17:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

CREATE TABLE "public"."User" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"email" text  NOT NULL ,
"name" text  NOT NULL ,
"role" "Role" NOT NULL DEFAULT E'USER',
PRIMARY KEY ("id"))

CREATE TABLE "public"."Profile" (
"id" SERIAL,
"bio" text  NOT NULL ,
"userId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Post" (
"id" SERIAL,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"title" text  NOT NULL ,
"published" boolean  NOT NULL DEFAULT false,
"authorId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Category" (
"id" SERIAL,
"name" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."_CategoryToPost" (
"A" integer  NOT NULL ,
"B" integer  NOT NULL )

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "Profile_userId" ON "public"."Profile"("userId")

CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "public"."_CategoryToPost"("A","B")

CREATE  INDEX "_CategoryToPost_B_index" ON "public"."_CategoryToPost"("B")

ALTER TABLE "public"."Profile" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToPost" ADD FOREIGN KEY ("A")REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToPost" ADD FOREIGN KEY ("B")REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200808231713-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,50 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+
+model User {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  email     String   @unique
+  name      String
+  role      Role     @default(USER)
+  posts     Post[]
+  profile   Profile?
+}
+ 
+model Profile {
+  id     Int    @default(autoincrement()) @id
+  bio    String
+  user   User   @relation(fields: [userId], references: [id])
+  userId Int
+}
+ 
+model Post {
+  id         Int        @default(autoincrement()) @id
+  createdAt  DateTime   @default(now())
+  title      String
+  published  Boolean    @default(false)
+  categories Category[] @relation(references: [id])
+  author     User       @relation(fields: [authorId], references: [id])
+  authorId   Int
+}
+ 
+model Category {
+  id    Int    @default(autoincrement()) @id
+  name  String
+  posts Post[] @relation(references: [id])
+}
+ 
+enum Role {
+  USER
+  ADMIN
+}
```

