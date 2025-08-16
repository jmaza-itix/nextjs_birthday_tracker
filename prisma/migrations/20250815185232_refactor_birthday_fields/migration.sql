/*
  Warnings:

  - You are about to drop the column `date` on the `Birthday` table. All the data in the column will be lost.
  - Added the required column `day` to the `Birthday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Birthday` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Birthday" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Birthday" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Birthday";
DROP TABLE "Birthday";
ALTER TABLE "new_Birthday" RENAME TO "Birthday";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
