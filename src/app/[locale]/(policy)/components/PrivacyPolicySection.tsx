'use client';
//THIRD PARTY MODULES
import { useState } from 'react';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import PrivacyHead from './PrivacyHead';
import PrivacyPolicyCard from './PrivacyPolicyCard';

export type PolicySectionProps = {
  data?: RouterOutputs['legalTerm']['findLegalTermByType'];
  items?: RouterOutputs['legalTerm']['findLegalSectionByType'];
};

const PolicySection = ({ data, items }: PolicySectionProps) => {
  const [open, setOpen] = useState<number | undefined>(0);

  return (
    <>
      <PrivacyHead data={data} />
      <div className="space-y-10">
        {items?.map((item, index) => (
          <PrivacyPolicyCard
            index={index}
            key={index}
            open={open === index}
            setOpen={setOpen}
            title={item.title || ''}
            content={item.content || ''}
          />
        ))}
      </div>
    </>
  );
};

export default PolicySection;
