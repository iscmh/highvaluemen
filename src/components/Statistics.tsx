import React from 'react';
import { Users, DollarSign, Mail, Scissors } from 'lucide-react';
import { StatCard } from './StatCard';

export const Statistics = () => {
  const stats = [
    {
      title: 'Newsletter Subscribers',
      value: '0',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Ad Revenue',
      value: '$0.00',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Newsletter Partnerships',
      value: '$0.00',
      icon: Mail,
      color: 'bg-purple-500',
    },
    {
      title: 'Clipping Earnings',
      value: '$0.00',
      icon: Scissors,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">HighValueMen Dashboard Overview</h2>
        <p className="mt-1 text-gray-500">Statistics update every day at 9 AM EST</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};
