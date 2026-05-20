import React from 'react';
import Hero from '../components/team/Hero';
import Team from '../components/team/Team';

function TeamPage() {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 overflow-x-hidden min-h-screen">
      <Hero />
      <Team />
    </div>
  );
}

export default TeamPage;