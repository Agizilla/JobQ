import React from 'react';

export const TechStack: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Proposed Technology Stack</h2>
      <p className="mb-6 text-gray-600">Rationale: Cost-effective, scalable, and optimized for South African network conditions.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Backend / DB */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-2xl">🗄️</div>
          <h3 className="text-lg font-bold mb-2">Database: Supabase (PostgreSQL)</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong>Why:</strong> It's PostgreSQL wrapped with easy APIs.</li>
            <li><strong>Geo-Spatial:</strong> Native PostGIS support is critical for "Jobs near me" functionality.</li>
            <li><strong>Cost:</strong> Generous free tier, scales cheaply.</li>
            <li><strong>Real-time:</strong> Employers see applicants appear instantly.</li>
          </ul>
        </div>

        {/* Frontend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">⚛️</div>
          <h3 className="text-lg font-bold mb-2">Frontend: React + Tailwind CSS</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong>Why:</strong> Component reusability between Web Portal and Mobile Web.</li>
            <li><strong>Performance:</strong> Single Page Application (SPA) loads once, then feels like a native app.</li>
            <li><strong>Tailwind:</strong> Tiny CSS bundle size (crucial for slow 3G/Edge data). Easy to style for high contrast.</li>
          </ul>
        </div>

        {/* Backend Logic */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-2xl">⚡</div>
          <h3 className="text-lg font-bold mb-2">Backend Logic: Edge Functions</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong>Why:</strong> Serverless TypeScript functions.</li>
            <li><strong>USSD Handling:</strong> Perfect for handling the Grapevine stateless HTTP callbacks quickly.</li>
            <li><strong>Maintenance:</strong> No server to manage or patch.</li>
          </ul>
        </div>

      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-bold text-blue-900 mb-2">Why this stack for JobQ?</h4>
        <p className="text-sm text-blue-800">
          The target market (unskilled/semi-skilled labor) uses devices with limited processing power and expensive data. 
          React + Tailwind ensures the mobile web app is incredibly lightweight. Supabase handles the heavy lifting of calculating 
          "nearest distance" on the server side, sending only the results to the phone.
        </p>
      </div>
    </div>
  );
};