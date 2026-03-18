import React from "react";
import "./styles.css";

function TransactionTable({ transactions, balance, onAddClick }) {
  return (
    <div className="table-container">
      <table className="transaction-table">
        
        {/* TOP HEADER ROW */}
        <thead>
          <tr className="top-header">
            <th className="heading">Office Transactions</th>
            <th colSpan="3"></th>
            <th className="add-cell">
              <button className="add-button" onClick={onAddClick}>
                + Add Transaction
              </button>
            </th>
          </tr>

          {/* COLUMN HEADER */}
          <tr className="column-header">
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {transactions.length === 0 ? (
            <>
              <tr className="empty-row">
                <td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>
              </tr>
              <tr className="empty-row">
                <td>-</td><td>-</td><td>-</td><td>-</td><td>-</td>
              </tr>
            </>
          ) : (
            transactions.map((t) => (
              <tr key={t._id}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td className="desc">{t.description}</td>
                <td className="credit">
                  {t.type === "credit" ? t.amount : ""}
                </td>
                <td className="debit">
                  {t.type === "debit" ? t.amount : ""}
                </td>
                <td className="balance-cell">{t.runningBalance}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
    </div>
  );
}

export default TransactionTable;