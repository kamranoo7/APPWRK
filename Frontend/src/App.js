import React, { useEffect, useState } from "react";
import TransactionTable from "./component/Transactiontable";
import AddTransaction from "./component/AddTransaction";
import "./component/styles.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch("http://localhost:5000/transactions");
    const data = await res.json();
    setTransactions(data.transactions);
    setBalance(data.balance);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <TransactionTable
        transactions={transactions}
        balance={balance}
        onAddClick={() => setShowModal(true)}
      />

      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          onSuccess={fetchTransactions}
        />
      )}
    </div>
  );
}

export default App;