import React from 'react';
import { Users, DollarSign, Mail, Scissors } from 'lucide-react';
import { StatCard } from './StatCard';

export const Statistics = () => {
  const stats = [
    {
      title: 'Newsletter Subscribers',
      value: '12,486',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Ad Revenue',
      value: '$28,429',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Newsletter Partnerships',
      value: '$15,762',
      icon: Mail,
      color: 'bg-purple-500',
    },
    {
      title: 'Clipping Earnings',
      value: '$9,284',
      icon: Scissors,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-1 text-gray-500">Track your performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};