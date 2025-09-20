"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Testimonials Component
const testimonial_data = [
  {
    name: `Liam Brown`,
    description: `Partnering with Everything AI was the best decision we made. Their insights into AI-driven marketing strategies boosted our campaign results beyond expectations.`,
    role: "Marketing Director"
  },
  {
    name: `Olivia Davis`,
    description: `From personalized AI solutions to exceptional customer service, Everything AI delivers on every front. They're not just a service provider; they're a true partner.`,
    role: "CTO"
  },
  {
    name: `Emma Wilson`,
    description: `The team at Everything AI is phenomenal. They took our vision and applied cutting-edge AI solutions to help us achieve a 30% increase in efficiency. Their support is unparalleled.`,
    role: "Operations Manager"
  },
  {
    name: `Ethan Smith`,
    description: `As a startup, adopting AI seemed daunting, but Everything AI made the transition seamless. Their team's expertise and dedication were evident in every step of the process.`,
    role: "Startup Founder"
  },
  {
    name: `Sophia Johnson`,
    description: `Everything AI completely transformed the way we handle data analysis. Their innovative solutions streamlined our processes, enabling faster and smarter decision-making. Highly recommend their services!`,
    role: "Data Scientist"
  },
  {
    name: `Noah Martinez`,
    description: `Everything AI's solutions empowered us to innovate at scale. Their expertise helped us unlock new opportunities and achieve significant cost savings.`,
    role: "Innovation Lead"
  },
];

const Testimonials = () => {
  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    setIsJSEnabled(true);
  }, []);

  // Title content that renders on both server and client
  const titleContent = (
    <>
      <div className="section-tag">Testimonials</div>
      <h2 className="section-title gradient-text">
        What Our Clients Say About Us
      </h2>
    </>
  );

  // Testimonial card content function
  const testimonialCard = (item: typeof testimonial_data[0], index: number, isInSlider = false) => (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-quote">
          <img 
            src="/assets/img/quote.png" 
            alt="Quote" 
            title="Quote - Everything AI Testimonial" 
            className="quote-icon"
          />
        </div>
        <div className="testimonial-rating">
          {[...Array(5)].map((_, i) => (
            <motion.span 
              key={i}
              className="testimonial-star"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              ★
            </motion.span>
          ))}
        </div>
      </div>
      <div className="testimonial-content">
        <p className="testimonial-text">{item.description}</p>
        <div className="testimonial-author">
          <div className="author-avatar">
            <div className="avatar-placeholder">
              {item.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="author-info">
            <h5 className="author-name">{item.name}</h5>
            <span className="author-role">{item.role}</span>
          </div>
        </div>
      </div>
      <div className="testimonial-decoration">
        <div className="decoration-dot"></div>
        <div className="decoration-dot"></div>
        <div className="decoration-dot"></div>
      </div>
    </div>
  );

  return (
    <section className="futuristic-testimonials section-padding">
      <div className="testimonial-bg-pattern"></div>
      <div className="testimonial-glow"></div>
      
      <div className="container position-relative z-index-1">
        <div className="section-header text-center">
          {/* Conditionally animated title */}
          {isJSEnabled ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {titleContent}
            </motion.div>
          ) : (
            titleContent
          )}
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            {/* Interactive Slider for JavaScript-enabled browsers */}
            {isJSEnabled ? (
              <motion.div 
                className="testimonial-slider-wrapper"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={2}
                  spaceBetween={30}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 8000 }}
                  loop={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    992: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1400: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                  }}
                  className="testimonial-slider"
                >
                  {testimonial_data.map((item, i) => (
                    <SwiperSlide key={i}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {testimonialCard(item, i, true)}
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            ) : (
              /* Static grid for no-JavaScript - EXACTLY 2 cards like original */
              <div className="testimonials-static-content">
                <div className="row">
                  {testimonial_data.slice(0, 2).map((item, i) => (
                    <div key={i} className="col-lg-6 col-md-6 mb-4">
                      {testimonialCard(item, i, false)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    // Mock API call - replace with your actual API endpoint
    try {
      const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    phone,
    message,
    smsConsent,
    marketingConsent,
  }),
});
    } catch (error) {
      setError(true);
      setResponseMessage("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact_area section-padding contact-section-bg">
      <div className="container">
        <div className="section-title text-center mb-5">
          <span className="fw-bold">Get in touch</span>
          <h2 className="display-4 fw-bold mt-2 text-white">
            Contact us for any kind <br />
            of inquiry
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12">
            {responseMessage && (
              <div
                className={`alert ${
                  error ? "alert-danger" : "alert-success"
                } text-center my-4`}
              >
                <p className="mb-0">{responseMessage}</p>
              </div>
            )}
            <div className="contact p-5 rounded-4 shadow-sm contact-form-bg">
              <form className="form" onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="form-group col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="name" className="form-label fw-bold text-white">Name</label>
                    <input
                      type="text"
                      id="name"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      value={name}
                      name="name"
                      className="form-control form-control-lg form-control-custom"
                      required
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="email" className="form-label fw-bold text-white">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      value={email}
                      name="email"
                      className="form-control form-control-lg form-control-custom"
                      required
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="phone" className="form-label fw-bold text-white">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                      value={phone}
                      name="phone"
                      className="form-control form-control-lg form-control-custom"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="message" className="form-label fw-bold text-white">Your Message</label>
                    <textarea
                      rows={5}
                      id="message"
                      name="message"
                      className="form-control form-control-lg textarea-custom"
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                      value={message}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group col-md-12">
                    <div className="d-flex align-items-start gap-3">
                      <input
                        type="checkbox"
                        id="smsConsent"
                        className="form-check-input mt-2 checkbox-custom"
                        checked={smsConsent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSmsConsent(e.target.checked)}
                      />
                      <label htmlFor="smsConsent" className="form-check-label text-white">
                        I Consent to Receive SMS Notifications, Alerts from
                        Everything AI, LLC. Message frequency varies. Messages &
                        data rates may apply. Text HELP to +1 (866) 357-5662 for
                        assistance. You can reply STOP to unsubscribe at any time.
                      </label>
                    </div>
                  </div>

                  <div className="form-group col-md-12">
                    <div className="d-flex align-items-start gap-3">
                      <input
                        type="checkbox"
                        id="marketingConsent"
                        className="form-check-input mt-2 checkbox-custom"
                        checked={marketingConsent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMarketingConsent(e.target.checked)}
                      />
                      <label htmlFor="marketingConsent" className="form-check-label text-white">
                        By checking this box I agree to receive occasional
                        marketing messages from Everything AI, LLC.
                      </label>
                    </div>
                  </div>
                  
                  <div className="col-md-12">
                    <p className="text-center text-white mb-3">
                      <strong>Please read SMS terms and privacy policy before giving your consent.</strong>
                    </p>
                    <div className="d-flex justify-content-center gap-4">
                      <a href="/terms#sms-terms" className="text-decoration-none text-primary">SMS Terms</a>
                      <span className="text-white">|</span>
                      <a href="/privacy-policy#sms-privacy-policy" className="text-decoration-none text-primary">SMS Privacy Policy</a>
                    </div>
                  </div>

                  <div className="col-md-12 text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5 py-3 btn-submit-custom"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Component
const Services = () => {
  const [isJSEnabled, setIsJSEnabled] = useState(false);

  useEffect(() => {
    setIsJSEnabled(true);
  }, []);

  const service_cards_data = [
    {
      image: "/assets/img/services/webdev.png",
      title: "Website Design & Development",
      description: "Custom website design and development services that create stunning, high-performance websites. We focus on user experience, mobile responsiveness, and conversion optimization.",
      link: "/services/website-design-development",
      alt: "Website Design & Development",
      delay: "200",
      featured: true
    },
    {
      image: "/assets/img/services/analytics.png",
      title: "Business Services",
      description: "Comprehensive business consulting services including strategic planning, funding solutions, and business optimization. We help entrepreneurs and companies streamline operations and scale effectively.",
      link: "/services/business-services",
      alt: "Business Services",
      delay: "300",
      featured: false
    },
    {
      image: "/assets/img/services/crm.webp",
      title: "Credit Repair & Legal Support",
      description: "Expert credit repair and legal support services backed by a 100% correct filing guarantee. We help restore your financial reputation and seek compensation for consumer rights violations.",
      link: "/services/legal-services",
      alt: "Legal Services",
      delay: "400",
      featured: false
    }
  ];

  const titleContent = (
    <h2 className="section-title gradient-text">
      Our Digital Marketing & AI Services for Business Growth
    </h2>
  );

  const serviceCardContent = (card: typeof service_cards_data[0], index: number) => (
    <div className={`service-card ${card.featured ? 'service-card-featured' : ''}`} data-aos="fade-up" data-aos-delay={card.delay}>
      <div className="service-card-image">
        <div className="service-card-image-glow"></div>
        <div className="service-card-image-overlay"></div>
        <img 
          src={card.image} 
          className="img-fluid" 
          alt={card.alt} 
          title={`${card.title} - Everything AI Service`}
          data-aos="zoom-in" 
          data-aos-delay="300"
        />
        <div className="service-card-badge">
          <span className="service-index">0{index + 1}</span>
        </div>
      </div>
      <div className="service-card-content">
        <h3 className="service-card-title" data-aos="fade-up" data-aos-delay="400">{card.title}</h3>
        <p className="service-card-description" data-aos="fade-up" data-aos-delay="500">
          {card.description}
        </p>
        <Link href={card.link} className="service-card-link" data-aos="fade-up" data-aos-delay="600">
          <span>Explore Service</span>
          <div className="service-link-icon">
            <i className="ti-arrow-top-right"></i>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="futuristic-services section-padding" data-aos="fade-up">
      <div className="services-bg-pattern"></div>
      <div className="services-glow"></div>
      
      <div className="container position-relative z-index-1">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-6 col-xs-12">
            <div className="section-title" data-aos="fade-right" data-aos-delay="200">
              <div className="section-tag" data-aos="fade-up" data-aos-delay="300">Our Services</div>
              
              {isJSEnabled ? (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {titleContent}
                </motion.div>
              ) : (
                titleContent
              )}
            </div>
          </div>
          <div className="col-lg-6 col-sm-6 col-xs-12">
            <div className="text-end" data-aos="fade-left" data-aos-delay="500">
              {isJSEnabled ? (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link href="/services" className="cta-button services-cta">
                    Explore All Services <i className="ti-arrow-top-right"></i>
                  </Link>
                </motion.div>
              ) : (
                <Link href="/services" className="cta-button services-cta">
                  Explore All Services <i className="ti-arrow-top-right"></i>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Modern asymmetric service cards layout */}
        <div className="service-cards-modern-container">
          <div className="row">
            {/* Featured service card - larger */}
            <div className="col-lg-6 col-md-12">
              {isJSEnabled ? (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {serviceCardContent(service_cards_data[0], 0)}
                </motion.div>
              ) : (
                serviceCardContent(service_cards_data[0], 0)
              )}
            </div>
            
            {/* Stacked smaller cards */}
            <div className="col-lg-6 col-md-12">
              <div className="service-cards-stack">
                {service_cards_data.slice(1).map((card, index) => (
                  <div key={index + 1} className="service-card-stack-item">
                    {isJSEnabled ? (
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                        viewport={{ once: true }}
                      >
                        {serviceCardContent(card, index + 1)}
                      </motion.div>
                    ) : (
                      serviceCardContent(card, index + 1)
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section 
      className="futuristic-hero hero-bg-image"
    >
      <div className="hero-overlay"></div>
      <div className="hero-bg-pattern"></div>
      <div className="hero-glow"></div>
      
      <div className="container position-relative z-10 hero-container">
        <div className="row align-items-center hero-row">
          <div className="col-lg-12 col-md-12 col-sm-12 hero-col">
            <div className="hero-content">
              
              
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="hero-title-line">
                  <span className="gradient-text">Digital Marketing</span>
                </span>
                <span className="hero-title-line">
                  <span className="gradient-text">& AI Solutions</span>
                </span>
                <span className="hero-title-line">
                  to Grow Your Business Online
                </span>
              </motion.h1>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Leading digital marketing agency specializing in AI solutions for business, SEO services near me, website development company services, and business automation tools. We help businesses increase online visibility, attract more customers, and achieve sustainable growth with expert strategies and innovative technology.
              </motion.p>
              
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="#contact" className="cta-button hero-cta primary">
                  <span>Get Started Today</span>
                  <div className="btn-icon">
                    <i className="ti-arrow-top-right"></i>
                  </div>
                </Link>
                <Link href="#services" className="cta-button hero-cta secondary">
                  <span>Explore Services</span>
                  <div className="btn-icon">
                    <i className="ti-arrow-down"></i>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
          
          <div className="col-lg-6 col-md-3 col-sm-12">
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="hero-graphic">
        <div className="floating-item item-1"></div>
        <div className="floating-item item-2"></div>
        <div className="floating-item item-3"></div>
        <div className="floating-item item-4"></div>
        <div className="floating-item item-5"></div>
        <div className="hero-dots"></div>
        <div className="hero-grid"></div>
      </div>
    </section>
  );
};

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="topbar">
        <div className="container mx-auto">
          <div className="topbar-wrapper">
            <div className="topbar-contact">
              <div className="contact-item">
                <span className="contact-icon">
                  <Image
                    src="/assets/img/phone.svg"
                    alt="Phone"
                    width={16}
                    height={16}
                  />
                </span>
                <a href="tel:+1(973)265-0273">+1 (973) 265-0273</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <Image
                    src="/assets/img/mail.svg"
                    alt="Email"
                    width={16}
                    height={16}
                  />
                </span>
                <a href="mailto:info@everythingainow.com">info@everythingainow.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>


    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer-section footer-section-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 mb-4 mb-lg-0">
            <div className="footer-widget">
              <div className="footer-logo mb-4">
                <Link href="/">
                  <Image
                    src="/assets/img/logo-top.png"
                    alt="Everything AI Logo"
                    title="Everything AI - AI Services and Solutions Logo"
                    width={200}
                    height={60}
                    className="img-fluid footer-logo-image"
                  />
                </Link>
              </div>
              <p className="footer-desc text-light mb-4">
                Empowering businesses with AI-powered solutions for automation, growth, and innovation.
              </p>
              <div className="footer-contact">
                <div className="contact-item d-flex align-items-center mb-2">
                  <span className="contact-icon me-2">
                    <Image
                      src="/assets/img/mail.svg"
                      alt="Email"
                      width={14}
                      height={14}
                    />
                  </span>
                  <Link
                    href="mailto:info@everythingainow.com"
                    className="text-light"
                  >
                    info@everythingainow.com
                  </Link>
                </div>
                <div className="contact-item d-flex align-items-center mb-2">
                  <span className="contact-icon me-2">
                    <Image
                      src="/assets/img/phone.svg"
                      alt="Phone"
                      width={14}
                      height={14}
                    />
                  </span>
                  <Link href="tel:+1(866)357-5662" className="text-light">
                    +1 (866) 357-5662
                  </Link>
                </div>
                <div className="contact-item d-flex align-items-center">
                  <span className="contact-icon me-2">
                    <Image
                      src="/assets/img/phone.svg"
                      alt="Phone"
                      width={14}
                      height={14}
                    />
                  </span>
                  <Link href="tel:+1(973)265-0273" className="text-light">
                    +1 (973) 265-0273
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 mb-4 mb-lg-0">
            <div className="footer-widget">
              <h4 className="widget-title position-relative mb-4">Company</h4>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <Link
                    href="/about"
                    className="text-light hover-effect"
                  >
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services"
                    className="text-light hover-effect"
                  >
                    Services
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/faqs"
                    className="text-light hover-effect"
                  >
                    FAQs
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/contact"
                    className="text-light hover-effect"
                  >
                    Contact Support
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/partner"
                    className="text-light hover-effect"
                  >
                    Become our Partner
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/referral"
                    className="text-light hover-effect"
                  >
                    Referral Program
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 mb-4 mb-lg-0">
            <div className="footer-widget">
              <h4 className="widget-title position-relative mb-4">Services</h4>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <Link
                    href="/services/digital-marketing"
                    className="text-light hover-effect"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services/website-design-development"
                    className="text-light hover-effect"
                  >
                    Website Design & Development
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services/reputation-management"
                    className="text-light hover-effect"
                  >
                    Reputation & Review Management
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services/crm-development"
                    className="text-light hover-effect"
                  >
                    Custom CRM Development
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="footer-widget">
              <h4 className="widget-title position-relative mb-4">Solutions</h4>
              <ul className="footer-links list-unstyled">
                <li className="mb-2">
                  <Link
                    href="/services/legal-services"
                    className="text-light hover-effect"
                  >
                    Credit Repair & Legal Support
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services/booking-appointments"
                    className="text-light hover-effect"
                  >
                    Calendar Bookings & Appointments
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services/business-services"
                    className="text-light hover-effect"
                  >
                    Business Services
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/services/ai-solutions"
                    className="text-light hover-effect"
                  >
                    AI Solutions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom border-top border-secondary pt-4 mt-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright-text text-light mb-0">
                © 2025 Everything AI. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-bottom-right d-flex align-items-center justify-content-md-end gap-4">
                <div className="social-links d-flex gap-3">
                  <a href="#" className="social-link" title="Follow us on Facebook" aria-label="Follow us on Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link" title="Follow us on Twitter" aria-label="Follow us on Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link" title="Follow us on Instagram" aria-label="Follow us on Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-link" title="Follow us on LinkedIn" aria-label="Follow us on LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <div className="footer-links d-flex gap-3">
                  <Link href="/terms" className="text-light">
                    Terms
                  </Link>
                  <Link href="/privacy" className="text-light">
                    Privacy
                  </Link>
                  <Link href="/admin" className="text-light">
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const StandaloneLandingPage = () => {
  return (
    <div id="home">
      <Header />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default StandaloneLandingPage;