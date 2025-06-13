"use server";

import prisma from "@/lib/prisma";

async function getUserBalance(userId) {
  if (!userId) {
    return { error: "User not found." };
  }

  try {
    const income = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: "income" },
    });

    const expense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: "expense" },
    });

    return {
      income: income._sum.amount || 0,
      expense: expense._sum.amount || 0,
    };
  } catch (error) {
    return { error: "Internal Server Error" };
  }
}

export default getUserBalance;
