//THIRD PARTY MODULES
import React from 'react';
import Image from 'next/image';
import classcat from 'classcat';
import Link from 'next-intl/link';
//RELATIVE MODULES
import { BUTTON_LIST, contentClasses, sectionClasses } from './download-app-section-common';

const DownloadAppSectionFallback = () => {
  return (
    <section id="download-app" className={classcat(sectionClasses)}>
      <div className={classcat(contentClasses)}>
        <div className="grid max-w-3xl gap-4 md:gap-8">
          <h2 className="text-36 text-white md:text-48">Download our app</h2>
          <h3 className="text-14 text-blu-50 md:text-20">
            Lorem ipsum dolor sit amet consectetur. Vestibulum vel fames ultricies mattis euismod.
            Vel amet massa massa aliquam dui neque nisl. Varius tellus egestas mattis nunc dolor
            porttitor nulla nunc faucibus. Amet nunc felis faucibus id id.
          </h3>

          <div className="grid auto-cols-max grid-flow-col justify-center gap-2 md:justify-start">
            {BUTTON_LIST.map(({ label, href, src }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                className="relative inline-block h-10 w-34.25"
              >
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

export default DownloadAppSectionFallback;
