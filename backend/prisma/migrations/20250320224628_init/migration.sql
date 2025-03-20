-- CreateTable
CREATE TABLE "Colmeia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "temperatura" DOUBLE PRECISION,
    "umidade" DOUBLE PRECISION,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Colmeia_pkey" PRIMARY KEY ("id")
);
