import React, { useState } from 'react';
import { Layout, LayoutDashboard, Wallet } from 'lucide-react';
import { Statistics } from './components/Statistics';
import { Balance } from './components/Balance';

function App() {
  const [activeTab, setActiveTab] = useState<'statistics' | 'balance'>('statistics');

  const navigation = [
    { name: 'Statistics', icon: LayoutDashboard, tab: 'statistics' },
    { name: 'Balance', icon: Wallet, tab: 'balance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm h-screen fixed">
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <Layout className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Client Dashboard</span>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.tab as 'statistics' | 'balance')}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === item.tab
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-8">
            {activeTab === 'statistics' && <Statistics />}
            {activeTab === 'balance' && <Balance />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;