'use client';

import { memo } from 'react';
import MainLayout from '@/layouts/MainLayout';
import PageHero from '@/components/ui/PageHero';
import ContactSection from '@/components/pages/contact/ContactSection';

const ContactPage = memo(() => {
  return (
    <MainLayout>

        <PageHero 
          i18nKey={{
            title: 'contact.hero.hero',
            description: 'contact.hero.description'
          }}
          variant="simple"
        />    
        <ContactSection />

    </MainLayout>
  );
});

ContactPage.displayName = 'ContactPage';

export default ContactPage; 