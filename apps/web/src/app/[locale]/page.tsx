'use client';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Settings');

  return (
    <>
      <div className="">{t('settings')}</div>
    </>
  );
}
