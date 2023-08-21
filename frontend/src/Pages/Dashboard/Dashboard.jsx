import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
function Dashboard() {

  const [user] = useState({
    id: 1,
    name: 'Keshav',
    email: 'k@gmail.com',
  });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2023-08-21',
      amount: 100,
    },
    {
      id: 1,
      date: '2023-08-21',
      amount: -50,
    },
    
  ]);

  const initialBalance = 0;

  const [balance, setBalance] = useState(initialBalance);


  useEffect(() => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, initialBalance);

    setBalance(newBalance);
  }, [transactions, initialBalance]);
 const navigate = useNavigate(); 
  return (
    <div className="dashboard">
      <button className="logout-button" onClick={()=>navigate("/login")}>Logout</button>
      <header>
        <h1>Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
        <p>My Tokens: <span className='bold'>{balance.toFixed(0)}</span></p>
      </header>
      <div className="content">
      <button id="earnButton">Earn Tokens</button>
      <button id="redeemButton">Redeem Tokens</button>
      </div>
      <section className="transaction-history">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={transaction.amount < 0 ? 'negative' : 'positive'}
              >
                <td>{transaction.date}</td>
                <td>{transaction.amount.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;
