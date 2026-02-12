import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lagos Shawarma & Grills</h1>
        <p>🍔 Your Favorite Food Ordering App</p>
        <p>Menu • Cart • Checkout • Delivery</p>
        <div style={{ marginTop: '20px' }}>
          <h2>Features:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>✅ Complete Menu System</li>
            <li>✅ Shopping Cart</li>
            <li>✅ Multi-step Checkout</li>
            <li>✅ Order History</li>
            <li>✅ Product Search</li>
            <li>✅ Responsive Design</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
