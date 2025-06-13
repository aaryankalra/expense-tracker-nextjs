import { Transaction } from "@/app/types/Transaction";
import { MdDeleteOutline } from "react-icons/md";
import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const TransactionComponent = ({
  transaction,
  onTransactionDelete,
}: {
  transaction: Transaction;
  onTransactionDelete: (transactionId: string) => void;
}) => {
  const handleDelete = async (transactionId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirm) return;

    const { default: deleteTransaction } = await import(
      "@/app/utils/deleteTransaction"
    );

    const result = await deleteTransaction(transaction.id);

    if (!result.error) {
      onTransactionDelete(transactionId);
      toast.success("Transaction deleted successfully.");
    } else {
      toast.error("Failed to delete transaction.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      >
        <div
          className={`w-[307] max-w-[307]  shadow-sm text-black bg-white border-b-8 rounded-md mb-5 p-3 ${
            transaction.type === "expense"
              ? "border-red-600"
              : "border-green-600"
          }`}
        >
          <p className="text-xl font-bold text-center mb-2">
            {transaction.title}
          </p>
          <div>
            <p>
              <span className="font-bold mr-2">Amount:</span>₹
              {transaction.amount}
            </p>
            <p>
              {" "}
              <span className="font-bold mr-2">Description:</span>
              {transaction.desc}
            </p>
            <p>
              {" "}
              <span className="font-bold mr-2">Date:</span>
              {new Date(transaction.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            className="mt-4 bg-red-500 text-white text-xl rounded-full p-1 cursor-pointer"
            onClick={() => handleDelete(transaction.id)}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default TransactionComponent;
