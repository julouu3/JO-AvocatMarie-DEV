import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Scale, Lock, Clock, CheckCircle2, ArrowRight, Phone, Video } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { consultationOptions, etapes } from '@/data/contact';
import { useMobile } from '@/hooks/useMobile';
import type { FormData, FormErrors } from '@/types';

const CONTACT_IMG = '/images/Contact.jpg';

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    nom: '',
    email: '',
    entreprise: '',
    sujet: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(1); // default to recommended

  // Parallax hero
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', isMobile ? '0%' : '18%']);
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', isMobile ? '0%' : '10%']);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nom.trim()) e.nom = 'Ce champ est requis.';
    if (!form.email.trim()) e.email = 'Ce champ est requis.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide.';
    if (!form.sujet.trim()) e.sujet = 'Ce champ est requis.';
    if (!form.message.trim()) e.message = 'Ce champ est requis.';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        nom: form.nom,
        email: form.email,
        entreprise: form.entreprise,
        sujet: form.sujet,
        message: form.message,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error('Erreur réseau');
      setSubmitted(true);
    } catch {
      setSendError('Une erreur est survenue. Veuillez réessayer ou envoyer un email directement.');
    } finally {
      setSending(false);
    }
  };

  const inputCls = (field: keyof FormErrors) =>
    `input-field${errors[field] ? ' has-error' : form[field] ? ' has-value' : ''}`;

  return (
    <>
      {/* === A — HERO CONTACT (full-width photo, text overlaid bottom-left) === */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0D1A' }}
      >
        {/* Photo — full-width with parallax */}
        <motion.div
          className="relative"
          style={{ y: heroBgY }}
        >
          <ImageWithFallback
            src={CONTACT_IMG}
            alt="Cabinet Marie Odin"
            className="w-full object-cover"
            style={{
              height: 'clamp(500px, 70vh, 780px)',
              objectPosition: 'center center',
            }}
          />
          {/* Bottom gradient for text readability */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to top, rgba(10,13,26,0.85) 0%, rgba(10,13,26,0.35) 35%, transparent 60%),
                linear-gradient(to top, rgba(10,13,26,0.5) 0%, transparent 20%)
              `,
            }}
          />
        </motion.div>

        {/* Title + subtitle — overlaid at bottom-left */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10 max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20"
          style={{
            paddingBottom: 'clamp(32px, 4vw, 56px)',
            y: heroContentY,
            opacity: heroContentOpacity,
          }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-heading"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(40px, 7vw, 88px)',
                fontWeight: 400,
                lineHeight: 1.05,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}
            >
              Contact
            </motion.h1>
          </div>
          <motion.p
            className="font-body"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.75)',
              marginTop: '8px',
              letterSpacing: '0.02em',
            }}
          >
            Premier échange confidentiel, sans engagement.
          </motion.p>
        </motion.div>
      </section>

      {/* === B — BLOC PRINCIPAL === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          {/* Two-column layout: Créneau (left) + Étapes (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch gap-10 lg:gap-16 mb-16">
            {/* Left — Consultation options */}
            <div className="lg:col-span-7 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      width: '32px',
                      height: '1.5px',
                      backgroundColor: '#002FA7',
                      transformOrigin: 'left',
                      flexShrink: 0,
                    }}
                  />
                  <h2
                    className="font-heading"
                    style={{
                      fontSize: 'clamp(22px, 2.5vw, 30px)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      color: '#060608',
                      lineHeight: 1.3,
                    }}
                  >
                    Choisissez un créneau
                  </h2>
                </div>
              </ScrollReveal>

              {(() => {
                const icons = [Phone, Video];
                return (
                  <div className="flex flex-col gap-4">
                    {consultationOptions.map((opt, i) => {
                      const isSelected = selectedConsultation === i;
                      const Icon = icons[i];
                      return (
                        <ScrollReveal key={opt.title} delay={i * 0.08}>
                          <motion.div
                            onClick={() => setSelectedConsultation(i)}
                            className="cursor-pointer"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              padding: '24px',
                              borderRadius: '4px',
                              border: isSelected ? '1.5px solid #002FA7' : '1.5px solid #E8E8EE',
                              backgroundColor: isSelected ? '#FAFBFF' : '#FFFFFF',
                              boxShadow: isSelected
                                ? '0 4px 20px rgba(0,47,167,0.08)'
                                : '0 1px 4px rgba(0,0,0,0.03)',
                              transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Top accent line for selected */}
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '2px',
                                backgroundColor: '#002FA7',
                                transform: isSelected ? 'scaleX(1)' : 'scaleX(0)',
                                transformOrigin: 'left',
                                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              }}
                            />

                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '50%',
                                  backgroundColor: isSelected ? '#002FA7' : '#F0F2F8',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  transition: 'background-color 0.3s ease',
                                }}
                              >
                                <Icon size={18} style={{ color: isSelected ? '#FFFFFF' : '#002FA7', transition: 'color 0.3s ease' }} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3 mb-1">
                                  <div className="flex items-center gap-3">
                                    <span className="font-body" style={{ fontSize: '16px', fontWeight: 600, color: '#060608' }}>
                                      {opt.title}
                                    </span>
                                    {opt.highlight && (
                                      <span
                                        className="font-body hidden sm:inline-block"
                                        style={{
                                          fontSize: '10px',
                                          fontWeight: 600,
                                          color: '#002FA7',
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.1em',
                                          backgroundColor: '#E8EDFF',
                                          padding: '3px 10px',
                                          borderRadius: '2px',
                                        }}
                                      >
                                        Recommandé
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <span className="font-heading" style={{ fontSize: '18px', fontWeight: 500, color: isSelected ? '#002FA7' : '#060608', transition: 'color 0.3s ease' }}>
                                      {opt.price}
                                    </span>
                                  </div>
                                </div>
                                <p className="font-body" style={{ fontSize: '14px', color: '#8A8A98', lineHeight: 1.5 }}>
                                  {opt.desc}
                                </p>
                                <div
                                  className="flex items-center gap-4 mt-3"
                                  style={{ paddingTop: '10px', borderTop: '1px solid #F0F0F5' }}
                                >
                                  <span className="font-body" style={{ fontSize: '12px', color: '#8A8A98' }}>
                                    ⏱ {opt.duration}
                                  </span>
                                  {/* Radio indicator */}
                                  <div className="ml-auto" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div
                                      style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        border: isSelected ? '2px solid #002FA7' : '2px solid #D0D0D8',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'border-color 0.3s ease',
                                      }}
                                    >
                                      <motion.div
                                        animate={{ scale: isSelected ? 1 : 0 }}
                                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                          width: '8px',
                                          height: '8px',
                                          borderRadius: '50%',
                                          backgroundColor: '#002FA7',
                                        }}
                                      />
                                    </div>
                                    <span className="font-body" style={{ fontSize: '12px', color: isSelected ? '#002FA7' : '#8A8A98', fontWeight: isSelected ? 500 : 400, transition: 'color 0.3s ease' }}>
                                      {isSelected ? 'Sélectionné' : 'Sélectionner'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </ScrollReveal>
                      );
                    })}

                    <ScrollReveal delay={0.2}>
                      <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary gap-2 w-full sm:w-auto"
                        style={{ padding: '14px 32px', marginTop: '8px', display: 'inline-flex' }}
                      >
                        Voir les créneaux disponibles
                        <ArrowRight size={14} />
                      </a>
                    </ScrollReveal>
                  </div>
                );
              })()}
            </div>

            {/* Right — Étapes */}
            <div className="lg:col-span-5 flex flex-col">
              <ScrollReveal delay={0.1} className="flex-1 flex flex-col">
                <div
                  className="flex-1 flex flex-col"
                  style={{
                    backgroundColor: '#F8F9FC',
                    borderRadius: '4px',
                    padding: 'clamp(32px, 3vw, 44px)',
                    border: '1px solid #EBEBF0',
                  }}
                >
                  <h3
                    className="font-body"
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#002FA7',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '32px',
                    }}
                  >
                    À quoi s'attendre
                  </h3>
                  <div className="flex flex-col flex-1 justify-between">
                    {etapes.map((e, i) => (
                      <div key={e.num} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <span
                            className="font-heading"
                            style={{
                              fontSize: '24px',
                              fontWeight: 400,
                              color: '#002FA7',
                              lineHeight: 1,
                            }}
                          >
                            {e.num}
                          </span>
                          {i < etapes.length - 1 && (
                            <div
                              style={{
                                width: '1px',
                                flex: 1,
                                minHeight: '20px',
                                backgroundColor: '#D8D8E0',
                                marginTop: '10px',
                              }}
                            />
                          )}
                        </div>
                        <div style={{ paddingTop: '2px', paddingBottom: i < etapes.length - 1 ? '0' : '0' }}>
                          <p className="font-body" style={{ fontSize: '14px', fontWeight: 600, color: '#060608', lineHeight: 1.4, marginBottom: '4px' }}>
                            {e.title}
                          </p>
                          <p className="font-body" style={{ fontSize: '13px', color: '#8A8A98', lineHeight: 1.5 }}>
                            {e.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Formulaire centré */}
          <div className="max-w-[820px] mx-auto">
            <div>

              {/* Formulaire */}
              <ScrollReveal delay={0.1}>
                <h3
                  className="font-body"
                  style={{
                    fontSize: 'clamp(15px, 1.5vw, 18px)',
                    fontWeight: 600,
                    color: '#060608',
                    marginBottom: '20px',
                  }}
                >
                  Ou envoyez-moi un message
                </h3>
              </ScrollReveal>

              {submitted ? (
                <ScrollReveal>
                  <div
                    className="flex items-start gap-4 p-6"
                    style={{
                      backgroundColor: '#E8EDFF',
                      border: '1px solid #002FA7',
                      borderRadius: '4px',
                    }}
                  >
                    <CheckCircle2 size={24} style={{ color: '#002FA7', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p className="font-body" style={{ fontSize: '16px', fontWeight: 600, color: '#060608', marginBottom: '6px' }}>
                        Message envoyé avec succès
                      </p>
                      <p className="font-body" style={{ fontSize: '14px', color: '#6B6C7A' }}>
                        Je vous répondrai dans les 24h ouvrées. À très bientôt.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ) : (
                <ScrollReveal delay={0.12}>
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                    name="contact"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                  >
                    {/* Netlify hidden fields */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>Ne pas remplir : <input name="bot-field" /></label>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="nom" className="font-body block mb-1.5" style={{ fontSize: '13px', fontWeight: 500, color: '#060608' }}>
                          Votre nom <span style={{ color: '#D93025' }}>*</span>
                        </label>
                        <input
                          id="nom"
                          name="nom"
                          type="text"
                          placeholder="Jean Dupont"
                          value={form.nom}
                          onChange={handleChange}
                          className={inputCls('nom')}
                        />
                        {errors.nom && (
                          <p role="alert" className="font-body" style={{ fontSize: '12px', color: '#D93025', marginTop: '4px' }}>
                            {errors.nom}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="font-body block mb-1.5" style={{ fontSize: '13px', fontWeight: 500, color: '#060608' }}>
                          Votre email <span style={{ color: '#D93025' }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jean@entreprise.fr"
                          value={form.email}
                          onChange={handleChange}
                          className={inputCls('email')}
                        />
                        {errors.email && (
                          <p role="alert" className="font-body" style={{ fontSize: '12px', color: '#D93025', marginTop: '4px' }}>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="entreprise" className="font-body block mb-1.5" style={{ fontSize: '13px', fontWeight: 500, color: '#060608' }}>
                        Votre entreprise{' '}
                        <span style={{ color: '#6B6C7A', fontWeight: 400 }}>(optionnel)</span>
                      </label>
                      <input
                        id="entreprise"
                        name="entreprise"
                        type="text"
                        placeholder="Nom de votre société"
                        value={form.entreprise}
                        onChange={handleChange}
                        className={`input-field${form.entreprise ? ' has-value' : ''}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="sujet" className="font-body block mb-1.5" style={{ fontSize: '13px', fontWeight: 500, color: '#060608' }}>
                        Sujet <span style={{ color: '#D93025' }}>*</span>
                      </label>
                      <input
                        id="sujet"
                        name="sujet"
                        type="text"
                        placeholder="Objet de votre demande"
                        value={form.sujet}
                        onChange={handleChange}
                        className={inputCls('sujet')}
                      />
                      {errors.sujet && (
                        <p role="alert" className="font-body" style={{ fontSize: '12px', color: '#D93025', marginTop: '4px' }}>
                          {errors.sujet}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="message" className="font-body block mb-1.5" style={{ fontSize: '13px', fontWeight: 500, color: '#060608' }}>
                        Votre message <span style={{ color: '#D93025' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Décrivez brièvement votre situation..."
                        value={form.message}
                        onChange={handleChange}
                        className={inputCls('message')}
                        style={{ resize: 'vertical' }}
                      />
                      {errors.message && (
                        <p role="alert" className="font-body" style={{ fontSize: '12px', color: '#D93025', marginTop: '4px' }}>
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div>
                      {sendError && (
                        <p className="font-body" style={{ fontSize: '13px', color: '#D93025', marginBottom: '8px' }}>
                          {sendError}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-primary w-full gap-2"
                        style={{
                          padding: '14px 32px',
                          border: 'none',
                          cursor: sending ? 'wait' : 'pointer',
                          minHeight: '44px',
                          opacity: sending ? 0.7 : 1,
                        }}
                      >
                        {sending ? 'Envoi en cours...' : 'Envoyer mon message'}
                        {!sending && <ArrowRight size={14} />}
                      </button>
                      <p className="font-body text-center mt-3" style={{ fontSize: '13px', color: '#6B6C7A' }}>
                        Réponse garantie sous 24h ouvrées
                      </p>
                    </div>
                  </form>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === D — BANDEAU RÉASSURANCE === */}
      <section
        style={{ backgroundColor: '#E8EDFF', padding: '24px 0' }}
      >
        <div
          className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            {[
              { Icon: Scale, label: 'Barreau de Paris' },
              { Icon: Lock, label: 'Secret professionnel absolu' },
              { Icon: Clock, label: 'Réponse sous 24h ouvrées' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2">
                <Icon size={16} style={{ color: '#002FA7', flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: '#002FA7' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
