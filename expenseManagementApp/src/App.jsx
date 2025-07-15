import React, { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };

    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="max-w-md mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">💰 Expense Tracker</h2>

      <h3 className="text-xl font-semibold mb-2 text-center">
        Balance: ${income + expense}
      </h3>

      <div className="flex justify-between mb-6">
        <p className="text-green-600 font-medium">Income: ${income}</p>
        <p className="text-red-600 font-medium">Expense: ${Math.abs(expense)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Amount (+income, -expense)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">History</h3>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center p-3 rounded border-l-4 ${
              t.amount > 0 ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
            }`}
          >
            <span className="font-medium">{t.text}</span>
            <span className="flex items-center">
              ${t.amount}
              <button
                onClick={() => handleDelete(t.id)}
                className="ml-3 text-sm text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;