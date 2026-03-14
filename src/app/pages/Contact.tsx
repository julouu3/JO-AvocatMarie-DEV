import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Scale, Lock, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { consultationOptions, etapes } from '@/data/contact';
import { useMobile } from '@/hooks/useMobile';
import type { FormData, FormErrors } from '@/types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSubmitted(true);
  };

  const inputCls = (field: keyof FormErrors) =>
    `input-field${errors[field] ? ' has-error' : form[field] ? ' has-value' : ''}`;

  return (
    <>
      {/* === A — HERO CONTACT (parallax) === */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0D1A' }}
      >
        {/* Background parallax layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroBgY,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(0,47,167,0.15) 0%, transparent 70%)',
          }}
        />

        <motion.div
          className="relative z-10"
          style={{
            y: heroContentY,
            opacity: heroContentOpacity,
            padding: 'clamp(100px, 12vw, 128px) 0 clamp(56px, 7vw, 80px)',
          }}
        >
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading"
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Parlons de votre dossier.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-body"
              style={{
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.65,
              }}
            >
              Premier échange confidentiel, sans engagement.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* === B — BLOC PRINCIPAL === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          {/* Étapes — au-dessus du formulaire */}
          <ScrollReveal delay={0.05}>
            <div className="max-w-[820px] mx-auto mb-12 lg:mb-16">
              <h3 className="font-body" style={{ fontSize: '16px', fontWeight: 600, color: '#060608', marginBottom: '20px' }}>
                À quoi s'attendre
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {etapes.map((e) => (
                  <div key={e.num} className="flex gap-4 items-start">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#002FA7',
                        borderRadius: '50%',
                      }}
                    >
                      <span className="font-body" style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                        {e.num}
                      </span>
                    </div>
                    <div>
                      <p className="font-body" style={{ fontSize: '15px', fontWeight: 600, color: '#060608', lineHeight: 1.4, marginBottom: '2px' }}>
                        {e.title}
                      </p>
                      <p className="font-body" style={{ fontSize: '14px', color: '#6B6C7A' }}>
                        {e.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Formulaire centré */}
          <div className="max-w-[820px] mx-auto">
            <div>
              {/* Calendly placeholder */}
              <ScrollReveal>
                <h2
                  className="font-body"
                  style={{
                    fontSize: 'clamp(18px, 1.8vw, 22px)',
                    fontWeight: 600,
                    color: '#060608',
                    marginBottom: '20px',
                  }}
                >
                  Choisissez un créneau
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <div
                  style={{
                    border: '1px solid #E0E0E8',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
                    marginBottom: '48px',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#F5F5F7',
                      padding: '20px 24px',
                      borderBottom: '1px solid #E0E0E8',
                    }}
                  >
                    <p className="font-body" style={{ fontSize: '13px', fontWeight: 500, color: '#6B6C7A' }}>
                      Sélectionnez un type de consultation
                    </p>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    {consultationOptions.map((opt) => (
                      <div
                        key={opt.title}
                        className="consultation-option flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 cursor-pointer"
                        style={{
                          border: `1.5px solid ${opt.highlight ? '#002FA7' : '#E0E0E8'}`,
                          borderRadius: '4px',
                          backgroundColor: opt.highlight ? '#F5F8FF' : '#FFFFFF',
                        }}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-body" style={{ fontSize: '15px', fontWeight: 600, color: '#060608' }}>
                              {opt.title}
                            </span>
                            {opt.highlight && (
                              <span
                                className="eyebrow"
                                style={{
                                  backgroundColor: '#E8EDFF',
                                  padding: '2px 8px',
                                  borderRadius: '3px',
                                  fontSize: '11px',
                                }}
                              >
                                Recommandé
                              </span>
                            )}
                          </div>
                          <p className="font-body" style={{ fontSize: '14px', color: '#6B6C7A', lineHeight: 1.55 }}>
                            {opt.desc}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-body" style={{ fontSize: '14px', fontWeight: 600, color: '#060608' }}>
                            {opt.price}
                          </p>
                          <p className="font-body" style={{ fontSize: '13px', color: '#6B6C7A' }}>
                            {opt.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div
                      className="text-center p-4"
                      style={{
                        backgroundColor: '#F5F5F7',
                        borderRadius: '4px',
                        border: '1px solid #E0E0E8',
                      }}
                    >
                      <p className="font-body" style={{ fontSize: '14px', color: '#6B6C7A', marginBottom: '12px' }}>
                        Intégration Calendly — Sélectionnez un créneau dans votre espace
                      </p>
                      <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary gap-2"
                        style={{ padding: '12px 24px' }}
                      >
                        Voir les créneaux disponibles
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

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
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
                      <button
                        type="submit"
                        className="btn-primary w-full gap-2"
                        style={{ padding: '14px 32px', border: 'none', cursor: 'pointer', minHeight: '44px' }}
                      >
                        Envoyer mon message
                        <ArrowRight size={14} />
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
