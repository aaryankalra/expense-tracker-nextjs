"use server";

import prisma from "@/lib/prisma";

async function deleteTransaction(transactionId) {
  if (!transactionId) {
    return { error: "Transaction not found." };
  }

  try {
    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    return { message: "Transaction deleted." };
  } catch (error) {
    return { error: "Database Error" };
  }
}

export default deleteTransaction;
