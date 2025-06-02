'use client';

import { memo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const ContactSection = memo(() => {
  const { t } = useLanguage();
  
  // State cho form liên hệ
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactError, setContactError] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // State cho form đăng ký newsletter
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Xử lý thay đổi trong form liên hệ
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    setContactError('');
  };

  // Xử lý thay đổi trong form newsletter
  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  // Xác thực email
  const validateEmail = (email: string): boolean => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Xử lý gửi form liên hệ
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra các trường
    if (!contactForm.name.trim()) {
      setContactError(t('contact.form.errors.name_required'));
      return;
    }
    
    if (!contactForm.email.trim()) {
      setContactError(t('contact.form.errors.email_required'));
      return;
    }
    
    if (!validateEmail(contactForm.email)) {
      setContactError(t('contact.form.errors.email_invalid'));
      return;
    }
    
    if (!contactForm.subject.trim()) {
      setContactError(t('contact.form.errors.subject_required'));
      return;
    }
    
    if (!contactForm.message.trim()) {
      setContactError(t('contact.form.errors.message_required'));
      return;
    }

    setIsContactSubmitting(true);

    try {
      // Giả lập gửi form, thay thế bằng API call thực tế sau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Thành công
      setContactSuccess(true);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset thông báo thành công sau 5 giây
      setTimeout(() => {
        setContactSuccess(false);
      }, 5000);
    } catch {
      setContactError(t('contact.form.errors.submit_failed'));
    } finally {
      setIsContactSubmitting(false);
    }
  };

  // Xử lý gửi form newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(t('contact.newsletter.errors.email_required'));
      return;
    }

    if (!validateEmail(email)) {
      setError(t('contact.newsletter.errors.email_invalid'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Giả lập gửi form, thay thế bằng API call thực tế sau
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Thành công
      setSuccess(true);
      setEmail('');

      // Reset thông báo thành công sau 5 giây
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch {
      setError(t('contact.newsletter.errors.submit_failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="container py-[10rem]">
        <h1 className="text-[3rem] mb-[3rem]">{t('contact.hero.title')}</h1>
        
        {/* Contact Form and Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Form liên hệ */}
          <form className="col-span-2 px-[1rem]" onSubmit={handleContactSubmit}>
            {contactSuccess && (
              <div className="bg-green-50 dark:bg-primary border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 rounded-md p-3 mb-4">
                {t('contact.form.success_message')}
              </div>
            )}
            
            {contactError && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 rounded-md p-3 mb-4">
                {contactError}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-6">
                <input
                  className="w-full px-8 py-4 rounded-full bg-white text-black focus:outline-none p-6 text-[18px] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)] placeholder:text-[18px] placeholder:text-black"
                  placeholder={t('contact.form.name')}
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-full bg-white text-black focus:outline-none p-6 text-[18px] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)] placeholder:text-[18px] placeholder:text-black"
                  placeholder={t('contact.form.email')}
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                />
              </div>
              <input
                className="w-full px-8 py-4 rounded-full bg-white text-black focus:outline-none p-6 text-[18px] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)] placeholder:text-[18px] placeholder:text-black"
                placeholder={t('contact.form.subject')}
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactChange}
              />
              <textarea
                className="w-full px-8 py-4 rounded-[2rem] bg-white text-black focus:outline-none p-6 text-[18px] shadow-[2px_2px_10px_rgba(0,_0,_0,_0.1)] placeholder:text-[18px] placeholder:text-black h-[17rem]"
                placeholder={t('contact.form.message')}
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
              ></textarea>
              <button 
                type="submit" 
                disabled={isContactSubmitting}
                className={`bg-primary text-white px-10 py-4 rounded-full flex items-center justify-center ${
                  isContactSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isContactSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('contact.form.submitting')}
                  </>
                ) : (
                  t('contact.form.submit')
                )}
              </button>
            </div>
          </form>
          
          {/* Form đăng ký newsletter */}
          <div className="text-white rounded-[3rem] px-12 py-[5rem] bg-primary">
            <form onSubmit={handleNewsletterSubmit}>
              <h2 className="font-bold text-white text-[2rem]">
                {t('contact.newsletter.title')}
              </h2>
              <p className="mb-12 text-white text-justify">
                {t('contact.newsletter.description')}
              </p>
              
              {success && (
                <div className="bg-green-700 text-white rounded-md p-3 mb-4">
                  {t('contact.newsletter.success_message')}
                </div>
              )}
              
              {error && (
                <div className="bg-red-700 text-white rounded-md p-3 mb-4">
                  {error}
                </div>
              )}
              
              <div>
                <input 
                  className="w-full p-2 text-black rounded-full mb-4 px-8 py-4"
                  placeholder={t('contact.newsletter.email_placeholder')}
                  type="email"
                  value={email}
                  onChange={handleNewsletterChange}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gray-800 text-white px-8 py-4 rounded-full flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('contact.newsletter.submitting')}
                    </>
                  ) : (
                    t('contact.newsletter.subscribe')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Contact Information Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-[8rem]"
        >
          <div className="p-6 rounded-[2.5rem] shadow-lg px-[3rem] py-[6rem] hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <FaPhoneAlt className="text-primary text-[3rem]" />
            </div>
            <p className="text-[1.1rem] font-bold text-foreground text-center">
              {t('footer.contact_info.phone')}
            </p>
            <p className='text-[1.1rem] text-center'>
              {t('contact.info.phone')}
            </p>
          </div>
          <div className="p-6 rounded-[2.5rem] shadow-lg px-[3rem] py-[6rem] hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-primary text-[3rem]" />
            </div>
            <p className="text-[1.1rem] font-bold text-foreground text-center">
              {t('footer.contact_info.email')}
            </p>
            <p className='text-[1.1rem] text-center'>
              {t('contact.info.email')}
            </p>
          </div>
          <div className="p-6 rounded-[2.5rem] shadow-lg px-[3rem] py-[6rem] hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              <FaMapMarkerAlt className="text-primary text-[3rem]" />
            </div>
            <p className="text-[1.1rem] font-bold text-foreground text-center">
              {t('footer.address_info.building')},
            </p>
            <p className='text-[1.1rem] text-center'>
              {t('footer.address_info.street')},{t('footer.address_info.ward')},<br />
              {t('footer.address_info.district')}, {t('footer.address_info.city')}
            </p>
          </div>
        </motion.div>
        
        {/* Map Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mt-16 h-full w-full"
        >
          <div className="rounded-[2rem] overflow-hidden shadow-custom-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2025.4565479789883!2d106.70499730756588!3d10.78164289942857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4ec96fae79%3A0xda53c6fa6c52539a!2sLim%20Tower!5e0!3m2!1svi!2s!4v1741164233251!5m2!1svi!2s"
              className="w-full h-[500px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Lim Tower"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection; 