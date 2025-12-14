import React from 'react';
import type{ UserRole } from '../../types';
import { ROLE_CONFIG } from '../../constants/auth';

interface DemoLoginButtonsProps {
  onDemoLogin: (role: UserRole) => void;
}

const DemoLoginButtons: React.FC<DemoLoginButtonsProps> = ({ onDemoLogin }) => {
  return (
    <div className="mt-8">
      <p className="text-sm text-blue-200 mb-3">ورود سریع با دمو:</p>
      <div className="grid grid-cols-2 gap-2">
        {ROLE_CONFIG.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onDemoLogin(role.id)}
            className={`px-3 py-2 ${role.demoColor} rounded-lg text-sm transition-colors text-white`}
          >
            {role.name} دمو
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoLoginButtons;