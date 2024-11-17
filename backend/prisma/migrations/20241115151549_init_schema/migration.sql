-- CreateTable
CREATE TABLE "Contant" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,

    CONSTRAINT "Contant_pkey" PRIMARY KEY ("id")
);
