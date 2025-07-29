import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Printer,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Package,
  CreditCard,
  Truck,
  Settings,
  HelpCircle,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const faqs = [
    {
      category: "Orders",
      questions: [
        {
          q: "How do I place an order?",
          a: "You can place an order through our dashboard after creating an account. Simply select your label type, upload your design files, and specify your requirements.",
        },
        {
          q: "What file formats do you accept?",
          a: "We accept PDF, AI, EPS, PNG, and JPG files. For best results, we recommend vector files (AI, EPS) or high-resolution PDFs.",
        },
        {
          q: "Can I modify my order after placing it?",
          a: "Orders can be modified within 2 hours of placement if they haven't entered production. Contact our support team for assistance.",
        },
      ],
    },
    {
      category: "Pricing",
      questions: [
        {
          q: "How is pricing calculated?",
          a: "Pricing is based on label type, size, material, quantity, and any special finishes. Use our online calculator for instant quotes.",
        },
        {
          q: "Do you offer volume discounts?",
          a: "Yes! We offer tiered pricing with discounts starting at 1,000 units. Larger quantities receive better pricing.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept wallet payments (topped up via crypto or CashApp), credit cards, and wire transfers for large orders.",
        },
      ],
    },
    {
      category: "Shipping",
      questions: [
        {
          q: "What are your shipping options?",
          a: "We offer standard (3-5 days), rush (24-48 hours), and same-day shipping options depending on your location and order complexity.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 50 countries worldwide. International shipping times vary by destination.",
        },
        {
          q: "How can I track my order?",
          a: "You can track your order in real-time through your dashboard. You'll receive tracking information once your order ships.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Printer className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              LabelVaults
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium">
              About
            </Link>
            <Link
              href="/products"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Products
            </Link>
            <Link
              href="/pricing"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Pricing
            </Link>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6"
              asChild
            >
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/3 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Help &
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Support
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find answers to your questions or get in touch with our expert support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, guides, or FAQs..."
                className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Order Help</h3>
                <p className="text-sm text-slate-600">Placing orders, file requirements, modifications</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Billing & Payments</h3>
                <p className="text-sm text-slate-600">Wallet top-ups, pricing, invoices</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Shipping & Tracking</h3>
                <p className="text-sm text-slate-600">Delivery options, tracking, international shipping</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Account & Technical</h3>
                <p className="text-sm text-slate-600">Account settings, technical issues, dashboard help</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="faq" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-slate-600">Quick answers to common questions</p>
              </div>

              <div className="space-y-8">
                {faqs.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.questions.map((faq, faqIndex) => (
                          <div key={faqIndex} className="border-b border-slate-200 pb-4 last:border-b-0">
                            <h4 className="font-semibold text-slate-900 mb-2">{faq.q}</h4>
                            <p className="text-slate-600">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Help Guides</h2>
                <p className="text-xl text-slate-600">Step-by-step tutorials and best practices</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Getting Started Guide",
                    description: "Complete walkthrough for new customers",
                    time: "5 min read",
                    category: "Beginner",
                  },
                  {
                    title: "File Preparation Best Practices",
                    description: "How to prepare your design files for printing",
                    time: "8 min read",
                    category: "Design",
                  },
                  {
                    title: "Understanding Label Materials",
                    description: "Choose the right material for your application",
                    time: "6 min read",
                    category: "Materials",
                  },
                  {
                    title: "Wallet & Payment Guide",
                    description: "How to top up your wallet and manage payments",
                    time: "4 min read",
                    category: "Payments",
                  },
                  {
                    title: "Order Tracking & Management",
                    description: "Track your orders and manage your account",
                    time: "3 min read",
                    category: "Orders",
                  },
                  {
                    title: "Quality Standards & Specifications",
                    description: "Our quality standards and technical specifications",
                    time: "10 min read",
                    category: "Quality",
                  },
                ].map((guide, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="outline" className="text-xs">
                          {guide.category}
                        </Badge>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {guide.time}
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-slate-600 mb-4">{guide.description}</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Read Guide
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Contact Support</h2>
                <p className="text-xl text-slate-600">Get personalized help from our expert team</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Live Chat</h3>
                    <p className="text-slate-600 mb-6">Get instant help from our support team</p>
                    <div className="space-y-2 text-sm text-slate-500 mb-6">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Available 24/7
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Average response: 2 minutes
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Phone Support</h3>
                    <p className="text-slate-600 mb-6">Speak directly with our experts</p>
                    <div className="space-y-2 text-sm text-slate-500 mb-6">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Mon-Fri 8AM-6PM EST
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Technical & sales support
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      (555) 123-4567
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Email Support</h3>
                    <p className="text-slate-600 mb-6">Detailed help via email</p>
                    <div className="space-y-2 text-sm text-slate-500 mb-6">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Response within 2 hours
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Detailed technical help
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      hello@LabelVaults.com
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Support Hours */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Support Hours</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Live Chat & Email</h4>
                      <p className="text-slate-600">Available 24/7 for your convenience</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Phone Support</h4>
                      <p className="text-slate-600">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Printer className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">LabelVaults</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Professional label printing services trusted by industry leaders worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Product Labels</li>
                <li className="hover:text-white transition-colors cursor-pointer">Shipping Labels</li>
                <li className="hover:text-white transition-colors cursor-pointer">Custom Labels</li>
                <li className="hover:text-white transition-colors cursor-pointer">Security Labels</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">File Guidelines</li>
                <li className="hover:text-white transition-colors cursor-pointer">Shipping Info</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-slate-400">&copy; 2024 LabelVaults. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
