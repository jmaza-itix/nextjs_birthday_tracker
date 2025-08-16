-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Birthday" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Birthday" ("createdAt", "day", "id", "month", "name", "year") SELECT "createdAt", "day", "id", "month", "name", "year" FROM "Birthday";
DROP TABLE "Birthday";
ALTER TABLE "new_Birthday" RENAME TO "Birthday";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
