"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Printer,
  Package,
  Truck,
  Award,
  Clock,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  Globe,
} from "lucide-react"

export default function LabelPrintingWebsite() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl hover:scale-110 transition-transform duration-300">
              <Printer className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              LabelVaults
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/products"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/pricing"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 hover:scale-105 animate-pulse-subtle"
              asChild
            >
              <a href="#contact">Get Quote</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-gradient-shift"></div>
        <div className="container mx-auto px-6 text-center relative">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300 px-4 py-2 animate-fade-in-up">
            <Award className="h-4 w-4 mr-2 animate-bounce-subtle" />
            Industry Leader Since 2010
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up animation-delay-200">
            Premium Label
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-text">
              Printing Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Transform your brand with high-quality custom labels. Professional printing, lightning-fast delivery, and
            unmatched attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              View Portfolio
            </Button>
          </div>
          <div className="relative max-w-5xl mx-auto animate-fade-in-up animation-delay-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl animate-pulse-glow"></div>
            <img
              src="/placeholder.svg?height=500&width=800&text=Professional+Label+Samples"
              alt="Professional label printing samples"
              className="relative mx-auto rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group animate-fade-in-up">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2 counter-animation">10,000+</h3>
              <p className="text-slate-600 font-medium">Happy Clients</p>
            </div>
            <div className="text-center group animate-fade-in-up animation-delay-200">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2 counter-animation">24hrs</h3>
              <p className="text-slate-600 font-medium">Average Turnaround</p>
            </div>
            <div className="text-center group animate-fade-in-up animation-delay-400">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2 counter-animation">50+</h3>
              <p className="text-slate-600 font-medium">Countries Served</p>
            </div>
            <div className="text-center group animate-fade-in-up animation-delay-600">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2 counter-animation">99.9%</h3>
              <p className="text-slate-600 font-medium">Quality Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Industry Leaders Choose Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Cutting-edge technology meets decades of expertise to deliver exceptional results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group animate-fade-in-up hover:scale-105 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Rush orders completed in as little as 4 hours. Standard delivery within 24-48 hours guaranteed.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group animate-fade-in-up animation-delay-200 hover:scale-105 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Premium Materials</h3>
              <p className="text-slate-600 leading-relaxed">
                Military-grade adhesives, waterproof substrates, and fade-resistant inks for maximum durability.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group animate-fade-in-up animation-delay-400 hover:scale-105 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Design Excellence</h3>
              <p className="text-slate-600 leading-relaxed">
                Award-winning design team and free consultation to bring your vision to life perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in-up">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 animate-bounce-subtle">
              Complete Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Professional Label Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From concept to delivery, we handle every aspect of your label printing needs with precision and care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden animate-fade-in-up hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Product Labels</CardTitle>
                <CardDescription className="text-slate-600">
                  Premium labels for retail, food, cosmetics, and consumer goods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-slate-700 animate-slide-in">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    FDA-compliant materials
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-100">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Waterproof & chemical resistant
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-200">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Custom shapes & finishes
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden animate-fade-in-up animation-delay-200 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Shipping Labels</CardTitle>
                <CardDescription className="text-slate-600">
                  Industrial-strength labels for logistics and distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-slate-700 animate-slide-in">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Thermal transfer compatible
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-100">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Barcode & QR code ready
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-200">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Weather & abrasion resistant
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden animate-fade-in-up animation-delay-400 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Custom Labels</CardTitle>
                <CardDescription className="text-slate-600">
                  Bespoke designs for branding, events, and special applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-slate-700 animate-slide-in">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Foil stamping & embossing
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-100">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Die-cut custom shapes
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-200">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Luxury finishes available
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden animate-fade-in-up animation-delay-600 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Security Labels</CardTitle>
                <CardDescription className="text-slate-600">
                  Tamper-evident solutions for asset protection and authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-slate-700 animate-slide-in">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Void-if-removed technology
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-100">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Holographic security features
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-200">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Sequential numbering
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden animate-fade-in-up animation-delay-800 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Industrial Labels</CardTitle>
                <CardDescription className="text-slate-600">
                  Heavy-duty solutions for extreme environments and conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-slate-700 animate-slide-in">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Chemical & solvent resistant
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-100">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    High temperature rated
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-200">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    UV stable for outdoor use
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden animate-fade-in-up animation-delay-1000 hover:scale-105 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                  <Printer className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Roll Labels</CardTitle>
                <CardDescription className="text-slate-600">
                  Continuous rolls for automated dispensing and high-volume applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-slate-700 animate-slide-in">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Multiple core sizes available
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-100">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Perforated options
                  </li>
                  <li className="flex items-center text-slate-700 animate-slide-in animation-delay-200">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Bulk quantity discounts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/3 to-transparent animate-gradient-shift"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 animate-bounce-subtle">
                Industry Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Trusted by Global
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text animate-gradient-text">
                  Industry Leaders
                </span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                For over a decade, we've been the go-to partner for Fortune 500 companies and innovative startups alike.
                Our commitment to excellence and cutting-edge technology sets us apart.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 animate-slide-in">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">State-of-the-Art Technology</h3>
                    <p className="text-slate-300">
                      Latest HP Indigo and Heidelberg presses with precision color matching
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 animate-slide-in animation-delay-200">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">Award-Winning Design Team</h3>
                    <p className="text-slate-300">Certified designers with expertise in brand identity and packaging</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 animate-slide-in animation-delay-400">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">100% Satisfaction Guarantee</h3>
                    <p className="text-slate-300">We stand behind every order with our comprehensive quality promise</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-up animation-delay-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl animate-pulse-glow"></div>
              <img
                src="/placeholder.svg?height=600&width=700&text=Modern+Printing+Facility"
                alt="Modern label printing facility"
                className="relative rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 animate-bounce-subtle">
              Get Started Today
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Transform Your Brand?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get a personalized quote and expert consultation. Our team is ready to bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="shadow-2xl border-0 bg-white animate-fade-in-up hover:scale-105 transition-transform duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900">Send Us Your Project Details</CardTitle>
                <CardDescription className="text-slate-600">
                  Our experts will respond within 2 hours with a detailed quote
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="animate-slide-in">
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">First Name</label>
                    <Input
                      placeholder="John"
                      className="border-slate-200 focus:border-blue-500 rounded-lg transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="animate-slide-in animation-delay-100">
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Last Name</label>
                    <Input
                      placeholder="Doe"
                      className="border-slate-200 focus:border-blue-500 rounded-lg transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </div>
                <div className="animate-slide-in animation-delay-200">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    className="border-slate-200 focus:border-blue-500 rounded-lg transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="animate-slide-in animation-delay-300">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Company Name</label>
                  <Input
                    placeholder="Your Company Name"
                    className="border-slate-200 focus:border-blue-500 rounded-lg transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="animate-slide-in animation-delay-400">
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Project Requirements</label>
                  <Textarea
                    placeholder="Tell us about your label needs: type, quantity, timeline, special requirements..."
                    rows={5}
                    className="border-slate-200 focus:border-blue-500 rounded-lg resize-none transition-all duration-300 focus:scale-105"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-slide-in animation-delay-500"
                >
                  Get My Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-8 animate-fade-in-up animation-delay-400">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:rotate-12">
                      <Phone className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us Direct</h3>
                      <p className="text-slate-600 text-lg">(555) 123-4567</p>
                      <p className="text-sm text-slate-500">Mon-Fri 8AM-6PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:rotate-12">
                      <Mail className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Email Support</h3>
                      <p className="text-slate-600 text-lg">hello@LabelVaults.com</p>
                      <p className="text-sm text-slate-500">Response within 2 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:rotate-12">
                      <MapPin className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">Visit Our Facility</h3>
                      <p className="text-slate-600">
                        123 Innovation Drive
                        <br />
                        Tech City, TC 12345
                      </p>
                      <p className="text-sm text-slate-500">Tours available by appointment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white hover:scale-105 transition-transform duration-300 animate-pulse-glow">
                <h3 className="font-bold text-xl mb-4">Rush Orders Available</h3>
                <p className="text-blue-100 mb-4">
                  Need labels urgently? We offer same-day and next-day delivery options.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    4-hour rush service available
                  </p>
                  <p className="flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Express shipping nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl hover:scale-110 transition-transform duration-300">
                  <Printer className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">LabelVaults</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Professional label printing services trusted by industry leaders worldwide. Quality, speed, and
                innovation in every order.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-12">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-12">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:rotate-12">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <h3 className="font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Product Labels
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Shipping Labels
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Custom Labels
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Security Labels
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Industrial Labels
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  About Us
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Quality Promise
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Sustainability
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Careers
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Press
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Help Center
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Design Guidelines
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  File Specifications
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Shipping Info
                </li>
                <li className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300">
                  Returns
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up animation-delay-800">
            <p className="text-slate-400 mb-4 md:mb-0">
              &copy; 2024 LabelVaults. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <div className="flex items-center space-x-4 text-slate-400">
              <span>Certified by:</span>
              <Badge
                variant="outline"
                className="border-slate-600 text-slate-400 hover:scale-110 transition-transform duration-300"
              >
                ISO 9001
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-600 text-slate-400 hover:scale-110 transition-transform duration-300"
              >
                FSC
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes gradientText {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradientText 4s ease infinite;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 3s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .counter-animation {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
