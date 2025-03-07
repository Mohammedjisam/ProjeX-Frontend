// src/components/companyAdmin/TenantSwitcher.tsx
import React from 'react';
import { useTenant } from '../../context/TenantContext';
import { Button } from '../../components/ui/button';

const TenantSwitcher: React.FC = () => {
  const { tenant, setTenant } = useTenant();

  const tenants = [
    { tenantId: '1', name: 'TechCorp', logo: '/images/techcorp-logo.png' },
    { tenantId: '2', name: 'InnovateLabs', logo: '/images/innovatelabs-logo.png' },
  ];

  const handleSwitch = (newTenant: { tenantId: string; name: string; logo: string }) => {
    setTenant(newTenant);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md">
      <span className="font-semibold">Switch Tenant:</span>
      {tenants.map((t) => (
        <Button
          key={t.tenantId}
          onClick={() => handleSwitch(t)}
          variant={tenant?.tenantId === t.tenantId ? 'default' : 'outline'}
        >
          {t.name}
        </Button>
      ))}
    </div>
  );
};

export default TenantSwitcher;