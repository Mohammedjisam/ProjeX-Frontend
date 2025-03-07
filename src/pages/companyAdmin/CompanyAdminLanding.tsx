import type React from "react"
import { ArrowRight, Check, ChevronDown, ChevronUp, Plus, User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

interface TestimonialProps {
  name: string
  username: string
  text: string
  avatar: string
}

interface PricingTierProps {
  name: string
  price: number
  popular?: boolean
  features: string[]
}

const CompanyAdminLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const testimonials: TestimonialProps[] = [
    {
      name: "Alex Rivera",
      username: "@jamesferguson00",
      text: "On the lookout for innovative tools, I found your tool instantly grabbed my attention.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Casey Jordan",
      username: "@casey",
      text: "We're able to integrate this app into our workflow.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Jordan Paisle",
      username: "@eastdesign",
      text: "This keeps track of project management and improves communication across the board.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    {
      name: "Josh Smith",
      username: "@jsmith",
      text: "Our team's productivity has skyrocketed since we started using this tool.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      name: "Taylor Kim",
      username: "@taylorkim",
      text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      name: "Sam Dawson",
      username: "@dawsontechapps",
      text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      name: "Morgan Lee",
      username: "@morganlee72",
      text: "This app has completely transformed how I manage my projects and deadlines.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      name: "Riley Smith",
      username: "@rileysmith1",
      text: "The customizability and integration capabilities of this app are top-notch.",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      name: "Casey Harper",
      username: "@casey10",
      text: "Its user-friendly interface and robust features support our diverse needs.",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    },
  ]

  const pricingTiers: PricingTierProps[] = [
    {
      name: "Basic",
      price: 15,
      features: [
        "Up to 1 branch",
        "Unlimited tasks and projects",
        "Meeting with upto 3 persons",
        "Chat between employees",
        "Basic support",
      ],
    },
    {
      name: "Pro",
      price: 20,
      popular: true,
      features: [
        "Up to 3 branch",
        "Unlimited tasks and projects",
        "Meeting with upto 5 persons",
        "Chat between employees",
        "Expert support",
      ],
    },
    {
      name: "Business",
      price: 30,
      features: [
        "Up to 5 branch",
        "Unlimited tasks and projects",
        "Meeting with upto 10 persons",
        "Chat between employees",
        "Expert support",
      ],
    },
  ]

  const partnerLogos = ["Acme Corp", "Quantum", "Echo Valley", "Celestial", "PULSE", "DEX"]

  const handleSignupClick = () => {
    navigate("/companyadmin/signup");
  };

  const handleLoginClick = () => {
    navigate("/companyadmin/login");
  };

  return (
    <div className="font-sans bg-background text-foreground">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-0"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">ProjeX</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About us
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Contact us
              </a>
            </nav>
            <div className="flex space-x-3">
            <button 
                className="glass-morphism px-5 py-2 rounded-md hover:bg-white/10 transition-all"
                onClick={handleLoginClick} 
              >
                Login
              </button>
              <button 
                className="bg-primary text-primary-foreground px-5 py-2 rounded-md hover:bg-primary/90 transition-all"
                onClick={handleSignupClick} 
              >
                Signup
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              Empower Your Team Anytime Anywhere
            </h1>
            <p className="text-lg mb-10 max-w-md text-foreground/80">
              Empower your team with our intuitive remote collaboration platform. Work together, communicate
              effectively, and achieve more.
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-md hover:bg-primary/90 transition-all font-medium flex items-center group">
              Get started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl"></div>
            <img
              src="/5172217.jpg"
              alt="Team collaboration"
              className="w-full max-w-md mx-auto relative z-10 rounded-lg shadow-2xl"
            />
          </div>
        </div>

        <div className="py-10 relative z-10">
          <div className="container mx-auto px-4">
            <div className="glass-morphism rounded-xl py-8">
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                {partnerLogos.map((logo, index) => (
                  <div key={index} className="text-foreground/60 font-medium text-lg">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            A more effective way to track progress
          </h2>
          <div className="flex justify-center mb-20">
            <div className="w-full max-w-4xl glass-morphism rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/3199750.jpg"
                alt="Dashboard preview"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="stat-card hover:scale-105 hover:shadow-xl">
              <div className="mb-6 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Integration ecosystem</h3>
              <p className="text-foreground/70">Track team progress and motivate them everyday.</p>
            </div>
            <div className="stat-card hover:scale-105 hover:shadow-xl">
              <div className="mb-6 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure data encryption</h3>
              <p className="text-foreground/70">Ensure your users' safety with top-tier encryption.</p>
            </div>
            <div className="stat-card hover:scale-105 hover:shadow-xl">
              <div className="mb-6 p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customizable notifications</h3>
              <p className="text-foreground/70">Get alerts on tasks and deadlines that matter most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section 2 */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <p className="text-primary font-medium mb-3 text-lg">Everything you need</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Streamlined for easy <br />
              <span className="text-primary">management</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="glass-morphism p-8 rounded-xl hover:scale-105 transition-all duration-300">
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src="/5216292.jpg"
                  alt="Real time communication"
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Real time communication</h3>
              <p className="text-foreground/70">Enhance your productivity by collaborating with your team.</p>
            </div>
            <div className="glass-morphism p-8 rounded-xl hover:scale-105 transition-all duration-300">
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src="/9583794.jpg"
                  alt="Goal setting and tracking"
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Goal setting and tracking</h3>
              <p className="text-foreground/70">
                Define and track team goals, breaking down objectives into achievable tasks to keep your team targets in
                sight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            Choose your plan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-8px] ${
                  tier.popular 
                    ? "glass-morphism border-primary relative" 
                    : "glass-morphism"
                }`}
              >
                {tier.popular && (
                  <div className="bg-primary text-center py-2 text-sm font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-primary">${tier.price}</span>
                    <span className="text-foreground/60">/monthly</span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-md font-medium mb-8 transition-colors ${
                      tier.popular 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    }`}
                  >
                    Sign up now
                  </button>
                  <ul className="space-y-4">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={`h-5 w-5 mr-3 ${tier.popular ? "text-primary" : "text-foreground/60"}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <p className="text-primary font-medium mb-3 text-lg">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              What our users say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.slice(0, 9).map((testimonial, index) => (
              <div key={index} className="glass-morphism p-6 rounded-xl hover:scale-105 transition-all duration-300">
                <p className="text-foreground/80 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-primary/30"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/60">{testimonial.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="glass-morphism max-w-4xl mx-auto py-16 px-8 rounded-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              Sign up now
            </h2>
            <p className="text-foreground/80 mb-10 max-w-2xl mx-auto text-lg">
              Celebrate the joy of accomplishment with an app designed to track team progress and motivate their efforts.
            </p>
            <button className="bg-primary text-primary-foreground px-10 py-4 rounded-md hover:bg-primary/90 transition-all font-medium inline-flex items-center group text-lg">
              Get started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-12 md:mb-0">
              <div className="text-2xl font-bold mb-6 text-primary">ProjeX</div>
              <div className="flex space-x-5 mb-6">
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      Examples
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-sm text-foreground/60">
            <p>© 2023 ProjeX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CompanyAdminLandingPage
