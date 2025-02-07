import React from 'react';

type Challenge = {
  id: number;
  title: string;
  description: string;
};

const challenges: Challenge[] = [
  { id: 1, title: "Moins de cafés", description: "Réduis tes cafés à 3 par semaine pour économiser" },
  { id: 2, title: "Test du week-end sans achats", description: "Essaie de passer un week-end sans achats impulsifs" },
];

const ChallengesSection: React.FC = () => {
  return (
    <div className="p-4 bg-purple-50 rounded shadow my-4">
      <h2 className="text-xl font-bold">Défis</h2>
      <ul className="mt-2">
        {challenges.map((challenge) => (
          <li key={challenge.id} className="border p-2 rounded mb-2">
            <h3 className="font-semibold">{challenge.title}</h3>
            <p className="text-sm text-gray-700">{challenge.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesSection;