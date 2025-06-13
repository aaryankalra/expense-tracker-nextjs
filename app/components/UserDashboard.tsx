"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import AddTransaction from "./dashboard/AddTransaction";
import { Transaction } from "../types/Transaction";
import TransactionList from "./dashboard/TransactionList";
import CountUp from "react-countup";

const UserDashboard = () => {
  const { user } = useUser();

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  // const [balanceValue, setBalanceValue] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = income - expenses;

  const balanceValue = balance >= 0;

  // Using a server function on client component we use this syntax
  const fetchUserBalance = async () => {
    if (!user) {
      return;
    }

    const { default: getUserBalance } = await import(
      "@/app/utils/getUserBalance"
    );

    const res = await getUserBalance(user?.id);

    const { default: getTransactions } = await import(
      "@/app/utils/getTransactions"
    );

    const tx = await getTransactions(user?.id);

    if (!res?.error) {
      setIncome(res.income ?? 0);
      setExpenses(res.expense ?? 0);
    }

    if (!("error" in tx)) {
      setTransactions(tx);
    }
  };

  const handleTransactionDelete = (transactionId: string) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((tx) => tx.id !== transactionId)
    );

    fetchUserBalance();
  };

  useEffect(() => {
    fetchUserBalance();
  }, [user]);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="text-3xl text-black font-bold">
            Welcome, {user?.firstName}.
          </h1>
          <div className="flex items-center justify-center gap-6">
            <div>
              <div
                className={` p-4 rounded-xl flex items-center justify-center ${
                  balanceValue ? "bg-purple-800" : "bg-red-600"
                }`}
              >
                <CountUp
                  end={balance}
                  duration={2.5}
                  prefix="₹"
                  separator=","
                  className="text-center text-white font-bold"
                />
              </div>
              <div className="text-center">
                <h1
                  className={`text-md font-bold ${
                    balanceValue ? "text-purple-800" : "text-red-600"
                  }`}
                >
                  Balance
                </h1>
              </div>
            </div>
            <div>
              <div className="bg-green-600 p-4 rounded-xl flex items-center justify-center">
                <CountUp
                  end={income}
                  duration={2.5}
                  prefix="₹"
                  separator=","
                  className="text-center text-white font-bold"
                />
              </div>
              <div className="text-center">
                <h1 className="text-md text-green-600 font-bold">Income</h1>
              </div>
            </div>
            <div>
              <div className="bg-red-600 p-4 rounded-xl">
                <span className="text-center text-white font-bold flex items-center justify-center">
                  <CountUp
                    end={expenses}
                    duration={2.5}
                    prefix="₹"
                    separator=","
                    className="text-center text-white font-bold"
                  />
                </span>
              </div>
              <div className="text-center">
                <h1 className="text-md text-red-600 font-bold">Expense</h1>
              </div>
            </div>
          </div>
          <div>
            {!balanceValue && (
              <h1 className="text-red-600 text-md font-bold">
                Warning: Your balance is low.
              </h1>
            )}
          </div>
          <div className="flex items-center justify-center">
            <TransactionList
              transactions={transactions}
              onTransactionDelete={handleTransactionDelete}
            />
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center">
          {/* Passing the fetchUserBalance function as a prop */}
          <AddTransaction onTransactionAdd={fetchUserBalance} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
