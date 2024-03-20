//THIRD PARTY MODULES
import React from 'react';
import Image from 'next/image';
import classcat from 'classcat';
import Link from 'next-intl/link';
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';
//RELATIVE MODULES
import { BUTTON_LIST, contentClasses, sectionClasses } from './download-app-section-common';

const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components: [SiteContentComponent.DOWNLOAD_APP_CTA],
  });
  if (data.status) return data.data;
};

const DownloadAppSection = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;

  return (
    <section
      id="download-app"
      className={classcat(sectionClasses)}
      {...(data[0].mediaUrl
        ? {
            style: {
              backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN_HOST + data[0].mediaUrl})`,
            },
          }
        : {})}
    >
      <div className={classcat(contentClasses)}>
        <div className="grid max-w-3xl gap-4 md:gap-8">
          <Show when={data[0].title?.trim()}>
            <h2 className="text-36 text-white md:text-48">{data[0].title?.trim()}</h2>
          </Show>
          <Show when={data[0].subtitle?.trim()}>
            <h3 className="text-14 text-blu-50 md:text-20">{data[0].subtitle?.trim()}</h3>
          </Show>

          <div className="grid auto-cols-max grid-flow-col justify-center gap-2 md:justify-start">
            {BUTTON_LIST.map(({ label, href, src }) => (
              <Link key={label} href={href} className="relative inline-block h-10 w-34.25">
                <span className="sr-only">{label}</span>
                <Image
                  fill
                  src={src}
                  alt={label}
                  unoptimized
                  quality={100}
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
