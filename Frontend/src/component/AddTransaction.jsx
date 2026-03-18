import React, { useState } from "react";
import "./styles.css";

function AddTransaction({ onClose, onSuccess }) {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!amount || !description) {
      return setError("All fields are required");
    }

    try {
      const res = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          amount: Number(amount),
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* HEADER */}
        <div className="modal-header">
          <h2>New Transaction</h2>
          <span className="close-icon" onClick={onClose}>×</span>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label>Transaction Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn cancel" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn save" onClick={handleSubmit}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;