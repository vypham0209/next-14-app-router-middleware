//THIRD PARTY MODULES
import { LegalTermType } from '@prisma/client';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import PrivacyPolicySection from '../components/PrivacyPolicySection';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
import promiseAllSettled from '_@shared/utils/promiseAllSettled';

export default async function DataProcessingAgreement() {
  const [data, items] = await promiseAllSettled([
    apiServer.legalTerm.findLegalTermByType.query(LegalTermType.DataProcessingAgreement),
    apiServer.legalTerm.findLegalSectionByType.query(LegalTermType.DataProcessingAgreement),
  ]);

  return (
    <Show when={!!data}>
      <PrivacyPolicySection data={data} items={items} />
    </Show>
  );
}
