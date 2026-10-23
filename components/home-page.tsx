"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/animated-number";
import { buildTelUrl, buildWhatsAppUrl } from "@/lib/contact";
import {
  business,
  faqs,
  galleryItems,
  navItems,
  processSteps,
  services,
  testimonials,
  trustStats,
  whyChooseUs,
} from "@/lib/site-config";

type BookingFormState = {
  name: string;
  phone: string;
  service: string;
  details: string;
};

const defaultForm: BookingFormState = {
  name: "",
  phone: "",
  service: services[0],
  details: "",
};

export function HomePage() {
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormState, string>>>({});
  const [formState, setFormState] = useState(defaultForm);
  const { scrollY } = useScroll();
  const heroLift = useTransform(scrollY, [0, 450], [0, reduceMotion ? 0 : -45]);

  const bookingMessage = useMemo(
    () =>
      `Hello ${business.name}, I want to book ${formState.service}. Name: ${formState.name}. Phone: ${formState.phone}. Details: ${formState.details || "N/A"}`,
    [formState],
  );

  const validate = () => {
    const nextErrors: Partial<Record<keyof BookingFormState, string>> = {};
    if (!formState.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formState.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!formState.service.trim()) nextErrors.service = "Please select a service.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    window.open(buildWhatsAppUrl(business.phoneNormalized, bookingMessage), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
          <a href="#top" className="text-lg font-semibold tracking-tight text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            {business.name}
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                {item.label}
              </a>
            ))}
            <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
              WhatsApp
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </nav>
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-zinc-200 bg-white md:hidden"
            >
              <div className="space-y-2 px-4 py-4">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="block rounded-md px-2 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="top" className="bg-white text-zinc-800">
        <section className="relative overflow-hidden">
          <motion.div
            style={{ y: heroLift }}
            className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-200 via-teal-200 to-white blur-3xl"
          />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Premium Cleaning Services in the UAE</p>
              <h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                Spotless spaces, refined service, and effortless booking.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
                GE Cleaning Services delivers careful, detail-first cleaning for homes and offices across the UAE with fast support on WhatsApp.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href={buildWhatsAppUrl(business.phoneNormalized, "Hello, I would like to book a cleaning service.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                  Book on WhatsApp
                </a>
                <a href="#services" className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900">
                  Explore services
                </a>
              </div>
            </motion.div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, x: 20 }} animate={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-emerald-50 p-8 shadow-sm">
              <p className="text-sm font-semibold text-zinc-700">Quick contact</p>
              <p className="mt-3 text-2xl font-semibold text-zinc-900">{business.phoneDisplay}</p>
              <div className="mt-6 space-y-3 text-sm text-zinc-600">
                <p>Market: {business.market}</p>
                <p>Instagram: @grandemiratescleaning</p>
                <p>Location info: {business.mapLabel}</p>
              </div>
              <div className="mt-8 flex gap-3">
                <a href={buildTelUrl(business.phoneNormalized)} className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-white">Call now</a>
                <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-white">Instagram</a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-zinc-900">Services</h2>
          <p className="mt-3 text-zinc-600">Choose from our most requested residential and commercial cleaning solutions.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.article
                key={service}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-base font-semibold text-zinc-900">{service}</h3>
                <p className="mt-2 text-sm text-zinc-600">Structured checklists and practical on-site care for this service.</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="why-us" className="bg-zinc-50 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold text-zinc-900">Why choose GE Cleaning Services</h2>
              <ul className="mt-6 space-y-3">
                {whyChooseUs.map((item) => (
                  <li key={item} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-700">{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {trustStats.map((item) => (
                <article key={item.label} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <AnimatedNumber value={item.value} suffix={item.suffix} shouldReduceMotion={!!reduceMotion} />
                  <p className="mt-3 text-sm font-semibold text-zinc-900">{item.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{item.footnote}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-zinc-900">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-zinc-200 p-6">
                <p className="text-sm font-semibold text-emerald-700">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-zinc-600">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-zinc-50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-zinc-900">Before & after inspired visuals</h2>
            <p className="mt-3 text-zinc-600">Placeholder visuals are used intentionally until licensed project photos are provided.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((item, index) => (
                <article key={item} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="h-40 rounded-xl bg-gradient-to-br from-zinc-200 via-white to-emerald-100" aria-hidden="true" />
                  <p className="mt-3 text-sm text-zinc-700">{item}</p>
                  <p className="text-xs text-zinc-500">Concept {index + 1}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-zinc-900">Testimonials</h2>
          <p className="mt-3 text-zinc-600">Sample content below is editable and should be replaced with verified client feedback.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-zinc-700">“{testimonial.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-zinc-900">{testimonial.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-zinc-50 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-zinc-900">Frequently asked questions</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-zinc-900">{faq.question}</summary>
                  <p className="mt-3 text-zinc-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-semibold text-zinc-900">Book your cleaning</h2>
              <p className="mt-3 text-zinc-600">Send your details and we will open WhatsApp with a ready-to-send message.</p>
              <div className="mt-6 space-y-3 text-zinc-700">
                <p><strong>Call:</strong> <a href={buildTelUrl(business.phoneNormalized)} className="underline">{business.phoneDisplay}</a></p>
                <p><strong>WhatsApp:</strong> <a href={business.whatsapp} className="underline">+{business.phoneNormalized}</a></p>
                <p><strong>Instagram:</strong> <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="underline">@grandemiratescleaning</a></p>
                <p><strong>Location:</strong> {business.mapLabel}</p>
                {business.mapLink ? (
                  <Link href={business.mapLink} target="_blank" rel="noopener noreferrer" className="underline">
                    Open map
                  </Link>
                ) : null}
              </div>
            </div>
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-700">
                  Full name
                  <input
                    value={formState.name}
                    onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                    name="name"
                    autoComplete="name"
                  />
                  {errors.name ? <span className="mt-1 block text-sm text-red-600">{errors.name}</span> : null}
                </label>

                <label className="block text-sm font-medium text-zinc-700">
                  Phone number
                  <input
                    value={formState.phone}
                    onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                    name="phone"
                    autoComplete="tel"
                  />
                  {errors.phone ? <span className="mt-1 block text-sm text-red-600">{errors.phone}</span> : null}
                </label>

                <label className="block text-sm font-medium text-zinc-700">
                  Service
                  <select
                    value={formState.service}
                    onChange={(event) => setFormState((prev) => ({ ...prev, service: event.target.value }))}
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                    name="service"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-zinc-700">
                  Details
                  <textarea
                    value={formState.details}
                    onChange={(event) => setFormState((prev) => ({ ...prev, details: event.target.value }))}
                    className="mt-1 min-h-28 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
                    name="details"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="submit" className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                  Continue on WhatsApp
                </button>
                <a
                  href={`mailto:?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(bookingMessage)}`}
                  className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 hover:bg-white"
                >
                  Email fallback
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
          <div>
            <p className="text-lg font-semibold text-zinc-900">{business.name}</p>
            <p className="mt-2 text-sm text-zinc-600">Premium residential and commercial cleaning in the UAE.</p>
            <p className="mt-4 text-sm text-zinc-700">Phone/WhatsApp: {business.phoneDisplay}</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-900">Service links</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {services.slice(0, 5).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-900">Connect</p>
            <div className="mt-3 space-y-2 text-sm text-zinc-600">
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-zinc-900">Instagram</a>
              <a href={buildTelUrl(business.phoneNormalized)} className="block hover:text-zinc-900">Call</a>
              <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="block hover:text-zinc-900">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
