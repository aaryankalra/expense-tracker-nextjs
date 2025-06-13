"use client";

import React, { useRef } from "react";
import addTransaction from "@/app/utils/addTransaction.js";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

// Interface for accepting props
interface AddTransactionProps {
  onTransactionAdd?: () => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({
  onTransactionAdd,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Getting userID (ClerkID) because I couldn't get it in the addTransaction.js file due to server components not being allowed to use hooks. Therefore, we will get the user ID in the client component, and pass it into our addTransaction.js file from here.
  const { userId } = useAuth();

  const formAction = async (formData: FormData) => {
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    // Appending the userID in the form data along with other data to pass to the addTransaction.js
    formData.append("userId", userId);

    const result = await addTransaction(formData);
    if (result.error) {
      toast.error(`${result.error}`);
    } else {
      toast.success("Transaction added successfully.");
      formRef.current?.reset();

      // Calling the onTransactionAdd (getUserBalance.js) function when a new transaction is added.
      if (onTransactionAdd) {
        onTransactionAdd();
      }
    }
  };

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="text-gray-800 shadow-2xl px-6 py-2 rounded-xl w-2/3"
      >
        <h1 className="text-2xl font-bold text-purple-800 pt-3 text-center">
          Add Transaction
        </h1>
        <div className="my-5 text-md">
          <label htmlFor="text" className="block text-black font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            autoFocus
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder="Enter Text"
            required
          />
        </div>
        <div className="my-5 text-md">
          <label htmlFor="amount" className="block text-black font-medium">
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            autoFocus
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder="Enter Amount"
            required
          />
        </div>
        <div className="my-5 text-md">
          <label htmlFor="desc" className="block text-black font-medium">
            Description
          </label>
          <input
            id="desc"
            name="desc"
            type="text"
            autoFocus
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder="Enter Description (Optional)"
          />
        </div>
        <div className="my-5 text-md flex items-center gap-2">
          <label htmlFor="type-income" className="text-black font-medium">
            Income
          </label>
          <input
            id="type-income"
            name="type"
            type="radio"
            value="income"
            autoFocus
            required
            className="rounded-sm focus:outline bg-green-500"
          />
          <label
            htmlFor="type-expense"
            className="ml-6 text-black font-medium flex"
          >
            Expense
          </label>
          <input
            id="type-expense"
            name="type"
            type="radio"
            value="expense"
            autoFocus
            required
            className="rounded-sm focus:outline-none bg-red-500"
          />
        </div>
        <div className="my-5">
          <button className="rounded-xl block text-center text-white bg-purple-800 p-3 duration-300  hover:bg-purple-900 transition-all w-full">
            Add Transaction
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTransaction;

// Had to pass the onTransactionAdd (fetchUserBalance) prop to update the total expenses and income of the user on the homepage when a new transaction is added rather than reloading the page to see the changes.
