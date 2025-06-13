import React from "react";
import { Transaction } from "@/app/types/Transaction";
import TransactionComponent from "./TransactionComponent";
import { AnimatePresence } from "framer-motion";

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionDelete: (transactionId: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onTransactionDelete,
}) => {
  if (transactions.length === 0) {
    return (
      <div>
        <h1 className="text-xl text-purple-800 font-bold text-center">
          No Transactions To Show
        </h1>
        <p className="text-black text-md">
          Add transactions and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xl text-purple-800 font-bold text-center">
          Transaction History
        </h1>
        <ul className="list">
          <div className="mt-6 max-h-80 overflow-y-auto bg-gray-50">
            <AnimatePresence>
              {transactions &&
                transactions.map((transaction: Transaction) => (
                  <TransactionComponent
                    key={transaction.id}
                    transaction={transaction}
                    onTransactionDelete={onTransactionDelete}
                  />
                ))}
            </AnimatePresence>
          </div>
        </ul>
      </div>
    </>
  );
};

export default TransactionList;
