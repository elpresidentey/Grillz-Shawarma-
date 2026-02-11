import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Lagos Shawarma & Grills
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Full features loading soon... Updated!
        </p>
      </div>
    </div>
  );
}

export default App;
