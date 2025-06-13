"use server";

import prisma from "@/lib/prisma";

async function getTransactions(userId) {
  if (!userId) {
    return { error: "User not found." };
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return transactions;
  } catch (error) {
    return { error: "Failed to fetch transactions." };
  }
}

export default getTransactions;
