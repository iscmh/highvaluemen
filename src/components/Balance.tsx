import React, { useState } from 'react';
import { CreditCard, Wallet as WalletIcon } from 'lucide-react';

type PaymentMethod = 'bank' | 'paypal' | 'crypto';
type CryptoOption = 'SOL' | 'USDT' | 'LTC';
type Network = 'Solana' | 'Ethereum' | 'Litecoin';

interface CryptoConfig {
  name: CryptoOption;
  networks: Network[];
  placeholder: string;
}

const cryptoConfigs: CryptoConfig[] = [
  {
    name: 'SOL',
    networks: ['Solana'],
    placeholder: 'Enter Solana wallet address',
  },
  {
    name: 'USDT',
    networks: ['Ethereum'],
    placeholder: 'Enter ERC-20 wallet address',
  },
  {
    name: 'LTC',
    networks: ['Litecoin'],
    placeholder: 'Enter Litecoin wallet address',
  },
];

export const Balance = () => {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('bank');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption>('SOL');
  const [selectedNetwork, setSelectedNetwork] = useState<Network>('Solana');
  const [loading, setLoading] = useState(false);

  const handleCryptoChange = (crypto: CryptoOption) => {
    setSelectedCrypto(crypto);
    setSelectedNetwork(cryptoConfigs.find(c => c.name === crypto)?.networks[0] || 'Solana');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      method: activeMethod,
      details: Object.fromEntries(formData.entries()),
      timestamp: new Date().toISOString(),
    };

    if (activeMethod === 'crypto') {
      data.details = {
        ...data.details,
        cryptocurrency: selectedCrypto,
        network: selectedNetwork,
      };
    }

    try {
      await fetch('https://discord.com/api/webhooks/1305537920756879360/-h8ZUMpRyUczakCqpK21N1b47PFLAu98nQUb2jA5UjHOxTrYKPzeGREZQ9GwCjvVlYhu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: '🔔 New Payment Information Update',
          embeds: [{
            title: 'Payment Details Updated',
            description: `Method: ${activeMethod.toUpperCase()}`,
            fields: Object.entries(data.details).map(([key, value]) => ({
              name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
              value: value as string,
              inline: true,
            })),
            timestamp: data.timestamp,
          }],
        }),
      });

      alert('Payment information updated successfully!');
    } catch (error) {
      alert('Failed to update payment information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
        <p className="mt-1 text-gray-500">
          Configure your preferred payment method
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'bank', label: 'Bank Transfer', icon: CreditCard },
            { id: 'paypal', label: 'PayPal', icon: WalletIcon },
            { id: 'crypto', label: 'Crypto', icon: WalletIcon },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveMethod(id as PaymentMethod)}
              className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all ${
                activeMethod === id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeMethod === 'bank' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountHolder"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    SWIFT/BIC Code
                  </label>
                  <input
                    type="text"
                    name="swiftCode"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    IBAN
                  </label>
                  <input
                    type="text"
                    name="iban"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Address
                  </label>
                  <input
                    type="text"
                    name="bankAddress"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {activeMethod === 'paypal' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PayPal Email
              </label>
              <input
                type="email"
                name="paypalEmail"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}

          {activeMethod === 'crypto' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Cryptocurrency
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {cryptoConfigs.map((crypto) => (
                    <button
                      key={crypto.name}
                      type="button"
                      onClick={() => handleCryptoChange(crypto.name)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedCrypto === crypto.name
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {crypto.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Network
                </label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value as Network)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {cryptoConfigs
                    .find((c) => c.name === selectedCrypto)
                    ?.networks.map((network) => (
                      <option key={network} value={network}>
                        {network}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Wallet Address
                </label>
                <input
                  type="text"
                  name="walletAddress"
                  required
                  placeholder={
                    cryptoConfigs.find((c) => c.name === selectedCrypto)
                      ?.placeholder
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Payment Information'}
          </button>
        </form>
      </div>
    </div>
  );
};