import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin, Scale, Lock, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

interface FormData {
  nom: string;
  email: string;
  entreprise: string;
  sujet: string;
  message: string;
}

interface FormErrors {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

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

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: '100%',
    border: `1px solid ${hasError ? '#D93025' : '#E0E0E8'}`,
    backgroundColor: '#FFFFFF',
    borderRadius: '2px',
    padding: '12px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '15px',
    color: '#060608',
    outline: 'none',
    boxShadow: hasError ? '0 0 0 3px rgba(217,48,37,0.15)' : 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
  });

  const etapes = [
    {
      num: '1',
      title: 'Vous choisissez un créneau',
      desc: 'Premier échange libre et confidentiel',
    },
    {
      num: '2',
      title: "J'analyse votre demande",
      desc: 'Je prépare nos échanges en amont',
    },
    {
      num: '3',
      title: 'On avance ensemble',
      desc: 'Stratégie claire dès la première consultation',
    },
  ];

  return (
    <>
      {/* === A — HERO CONTACT === */}
      <section style={{ backgroundColor: '#0A0D1A', padding: 'clamp(100px, 12vw, 128px) 0 clamp(56px, 7vw, 80px)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
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
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(16px, 1.5vw, 18px)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.65,
            }}
          >
            Premier échange confidentiel, sans engagement.
          </motion.p>
        </div>
      </section>

      {/* === B — BLOC PRINCIPAL === */}
      <section style={{ backgroundColor: '#FFFFFF', padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
            {/* Gauche — Calendly placeholder + formulaire */}
            <div>
              {/* Calendly placeholder */}
              <ScrollReveal>
                <h2
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
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
                  {/* Calendly simulation */}
                  <div
                    style={{
                      backgroundColor: '#F5F5F7',
                      padding: '20px 24px',
                      borderBottom: '1px solid #E0E0E8',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#6B6C7A',
                      }}
                    >
                      Sélectionnez un type de consultation
                    </p>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    {[
                      {
                        title: 'Appel découverte',
                        duration: '30 min',
                        price: 'Gratuit',
                        desc: 'Pour évaluer si je peux vous aider et quel accompagnement est adapté.',
                        highlight: false,
                      },
                      {
                        title: 'Consultation approfondie',
                        duration: '1 heure',
                        price: 'Sur devis',
                        desc: 'Analyse détaillée de votre situation juridique et recommandations stratégiques.',
                        highlight: true,
                      },
                    ].map((opt) => (
                      <div
                        key={opt.title}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 cursor-pointer transition-all duration-200"
                        style={{
                          border: `1.5px solid ${opt.highlight ? '#002FA7' : '#E0E0E8'}`,
                          borderRadius: '4px',
                          backgroundColor: opt.highlight ? '#F5F8FF' : '#FFFFFF',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#002FA7'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = opt.highlight ? '#002FA7' : '#E0E0E8'; }}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '15px',
                                fontWeight: 600,
                                color: '#060608',
                              }}
                            >
                              {opt.title}
                            </span>
                            {opt.highlight && (
                              <span
                                style={{
                                  backgroundColor: '#E8EDFF',
                                  color: '#002FA7',
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  padding: '2px 8px',
                                  borderRadius: '3px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                }}
                              >
                                Recommandé
                              </span>
                            )}
                          </div>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '14px',
                              color: '#6B6C7A',
                              lineHeight: 1.55,
                            }}
                          >
                            {opt.desc}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '14px',
                              fontWeight: 600,
                              color: '#060608',
                            }}
                          >
                            {opt.price}
                          </p>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '13px',
                              color: '#6B6C7A',
                            }}
                          >
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
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '14px',
                          color: '#6B6C7A',
                          marginBottom: '12px',
                        }}
                      >
                        Intégration Calendly — Sélectionnez un créneau dans votre espace
                      </p>
                      <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 transition-all hover:scale-[1.01]"
                        style={{
                          backgroundColor: '#002FA7',
                          color: '#FFFFFF',
                          borderRadius: '2px',
                          padding: '12px 24px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          textDecoration: 'none',
                          transition: 'background-color 200ms ease',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0038CC'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#002FA7'; }}
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
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
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
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#060608',
                          marginBottom: '6px',
                        }}
                      >
                        Message envoyé avec succès
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '14px',
                          color: '#6B6C7A',
                        }}
                      >
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
                        <label
                          htmlFor="nom"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#060608',
                            display: 'block',
                            marginBottom: '6px',
                          }}
                        >
                          Votre nom <span style={{ color: '#D93025' }}>*</span>
                        </label>
                        <input
                          id="nom"
                          name="nom"
                          type="text"
                          placeholder="Jean Dupont"
                          value={form.nom}
                          onChange={handleChange}
                          style={inputStyle(!!errors.nom)}
                          onFocus={(e) => {
                            if (!errors.nom) {
                              e.target.style.borderColor = '#002FA7';
                              e.target.style.boxShadow = '0 0 0 3px rgba(0,47,167,0.15)';
                            }
                          }}
                          onBlur={(e) => {
                            if (!errors.nom) {
                              e.target.style.borderColor = form.nom ? '#002FA7' : '#E0E0E8';
                              e.target.style.boxShadow = 'none';
                            }
                          }}
                        />
                        {errors.nom && (
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '12px',
                              color: '#D93025',
                              marginTop: '4px',
                            }}
                          >
                            {errors.nom}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#060608',
                            display: 'block',
                            marginBottom: '6px',
                          }}
                        >
                          Votre email <span style={{ color: '#D93025' }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jean@entreprise.fr"
                          value={form.email}
                          onChange={handleChange}
                          style={inputStyle(!!errors.email)}
                          onFocus={(e) => {
                            if (!errors.email) {
                              e.target.style.borderColor = '#002FA7';
                              e.target.style.boxShadow = '0 0 0 3px rgba(0,47,167,0.15)';
                            }
                          }}
                          onBlur={(e) => {
                            if (!errors.email) {
                              e.target.style.borderColor = form.email ? '#002FA7' : '#E0E0E8';
                              e.target.style.boxShadow = 'none';
                            }
                          }}
                        />
                        {errors.email && (
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '12px',
                              color: '#D93025',
                              marginTop: '4px',
                            }}
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="entreprise"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#060608',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
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
                        style={inputStyle()}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#002FA7';
                          e.target.style.boxShadow = '0 0 0 3px rgba(0,47,167,0.15)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = form.entreprise ? '#002FA7' : '#E0E0E8';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sujet"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#060608',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Sujet <span style={{ color: '#D93025' }}>*</span>
                      </label>
                      <input
                        id="sujet"
                        name="sujet"
                        type="text"
                        placeholder="Objet de votre demande"
                        value={form.sujet}
                        onChange={handleChange}
                        style={inputStyle(!!errors.sujet)}
                        onFocus={(e) => {
                          if (!errors.sujet) {
                            e.target.style.borderColor = '#002FA7';
                            e.target.style.boxShadow = '0 0 0 3px rgba(0,47,167,0.15)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.sujet) {
                            e.target.style.borderColor = form.sujet ? '#002FA7' : '#E0E0E8';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      />
                      {errors.sujet && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '12px',
                            color: '#D93025',
                            marginTop: '4px',
                          }}
                        >
                          {errors.sujet}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#060608',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        Votre message <span style={{ color: '#D93025' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Décrivez brièvement votre situation..."
                        value={form.message}
                        onChange={handleChange}
                        style={{ ...inputStyle(!!errors.message), resize: 'vertical' }}
                        onFocus={(e) => {
                          if (!errors.message) {
                            e.target.style.borderColor = '#002FA7';
                            e.target.style.boxShadow = '0 0 0 3px rgba(0,47,167,0.15)';
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.message) {
                            e.target.style.borderColor = form.message ? '#002FA7' : '#E0E0E8';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      />
                      {errors.message && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '12px',
                            color: '#D93025',
                            marginTop: '4px',
                          }}
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.005]"
                        style={{
                          backgroundColor: '#002FA7',
                          color: '#FFFFFF',
                          borderRadius: '2px',
                          padding: '14px 32px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 200ms ease',
                          minHeight: '44px',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0038CC'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#002FA7'; }}
                      >
                        Envoyer mon message
                        <ArrowRight size={14} />
                      </button>
                      <p
                        className="text-center mt-3"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '13px',
                          color: '#6B6C7A',
                        }}
                      >
                        Réponse garantie sous 24h ouvrées
                      </p>
                    </div>
                  </form>
                </ScrollReveal>
              )}
            </div>

            {/* Droite — Infos contact + étapes */}
            <div className="flex flex-col gap-10">
              {/* Autres façons de me contacter */}
              <ScrollReveal delay={0.05}>
                <div
                  style={{
                    border: '1px solid #E0E0E8',
                    borderRadius: '4px',
                    padding: '28px',
                    boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#060608',
                      marginBottom: '20px',
                    }}
                  >
                    Autres façons de me contacter
                  </h3>
                  <div className="flex flex-col gap-5">
                    <a
                      href="mailto:contact@lefebvre-avocats.fr"
                      className="flex items-center gap-3 group"
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: '#E8EDFF',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Mail size={16} style={{ color: '#002FA7' }} />
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '13px',
                            color: '#6B6C7A',
                          }}
                        >
                          Email
                        </p>
                        <p
                          className="group-hover:underline"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '15px',
                            fontWeight: 500,
                            color: '#002FA7',
                            textDecorationColor: '#002FA7',
                          }}
                        >
                          contact@lefebvre-avocats.fr
                        </p>
                      </div>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: '#E8EDFF',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Linkedin size={16} style={{ color: '#002FA7' }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B6C7A' }}>
                          LinkedIn
                        </p>
                        <p
                          className="group-hover:underline"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '15px',
                            fontWeight: 500,
                            color: '#002FA7',
                          }}
                        >
                          Sophie Lefebvre
                        </p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: '#E8EDFF',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <MapPin size={16} style={{ color: '#002FA7' }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B6C7A' }}>
                          Adresse
                        </p>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '15px',
                            fontWeight: 400,
                            color: '#060608',
                          }}
                        >
                          Paris 8e, Île-de-France
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* À quoi s'attendre */}
              <ScrollReveal delay={0.1}>
                <div>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#060608',
                      marginBottom: '20px',
                    }}
                  >
                    À quoi s'attendre
                  </h3>
                  <div className="flex flex-col gap-6">
                    {etapes.map((e) => (
                      <div key={e.num} className="flex gap-4 items-start">
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#002FA7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '13px',
                              fontWeight: 600,
                              color: '#FFFFFF',
                            }}
                          >
                            {e.num}
                          </span>
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '15px',
                              fontWeight: 600,
                              color: '#060608',
                              lineHeight: 1.4,
                              marginBottom: '2px',
                            }}
                          >
                            {e.title}
                          </p>
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: '14px',
                              color: '#6B6C7A',
                            }}
                          >
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
        </div>
      </section>

      {/* === D — BANDEAU RÉASSURANCE === */}
      <section style={{ backgroundColor: '#E8EDFF', padding: '24px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            {[
              { Icon: Scale, label: 'Barreau de Paris' },
              { Icon: Lock, label: 'Secret professionnel absolu' },
              { Icon: Clock, label: 'Réponse sous 24h ouvrées' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2">
                <Icon size={16} style={{ color: '#002FA7', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#002FA7',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky spacer */}
      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  );
}
