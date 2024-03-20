//THIRD PARTY MODULES
import convertStringToArray from '_@landing/utils/convertStringToArray';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//TYPES MODULES

export type PrivacyHeadProps = {
  data?: RouterOutputs['legalTerm']['findLegalTermByType'];
  items?: RouterOutputs['legalTerm']['findLegalSectionByType'];
};

function PrivacyHead({ data }: PrivacyHeadProps) {
  return (
    <div className="space-y-6 py-10 md:py-16">
      <h3 className="text-36 text-blu-400 lg:text-64">{data?.title}</h3>
      <div className="mt-6 space-y-2.5">
        {convertStringToArray(data?.description || '').map((item) => (
          <p key={item} className="text-14 font-light text-blu-400">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PrivacyHead;
