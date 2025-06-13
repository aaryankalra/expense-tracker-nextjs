"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// This function to take data from the addTransaction form we will so we can use it later.

async function addTransaction(formData) {
  // Get data from the form through 'formData'
  const titleValue = formData.get("title");
  const amountValue = formData.get("amount");
  const descValue = formData.get("desc");
  const typeValue = formData.get("type");

  // As we are not allowed to use hooks in server component, we will get the userID from the form itself. In the client component, we had already passed the userID through the form. So, here wer are just using it.
  const userIdValue = formData.get("userId");

  // Checking if any of the required values are null
  // No need to check for empty string as form already has a 'required' field
  if (!titleValue || !amountValue || !typeValue) {
    return { error: "Title, amount or type is missing." };
  }

  // Parse data into compatible data type
  const title = titleValue.toString();
  const amount = parseInt(amountValue);
  const desc = descValue?.toString();
  const type = typeValue.toString();
  const userId = userIdValue;

  if (!userId) {
    return { error: "User not found." };
  }

  try {
    // Adding data to the transaction table along with the userID (Clerk ID)
    const transactionData = await prisma.transaction.create({
      data: {
        title,
        amount,
        desc,
        type,
        userId,
      },
    });

    // Attempting to increment the totalIncome and totalExpense field of the user as well along with adding the transactio but didn't work. May hae to find a solution.
    // if (type === "expense") {
    //   await prisma.user.update({
    //     where: { userId: userId },
    //     data: {
    //       totalExpense: {
    //         increment: amount,
    //       },
    //     },
    //   });
    // } else if (type === "income") {
    //   await prisma.user.update({
    //     where: { clerkId: userId },
    //     data: {
    //       totalIncome: {
    //         increment: amount,
    //       },
    //     },
    //   });
    // }

    revalidatePath("/");

    return { data: transactionData };
  } catch (error) {
    // return { error: "Failed to add transaction." };
    return { error: error };
  }
}

export default addTransaction;
