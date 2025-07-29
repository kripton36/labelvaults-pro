import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Printer, Check, Star, Zap, Package, Award, Calculator } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "8.29",
      description: "Perfect for small businesses and startups",
      features: [
        "Standard materials",
        "Basic finishes",
        "5-7 day turnaround",
        "Email support",
        "Minimum order: 100 units",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "6.12",
      description: "Most popular for growing businesses",
      features: [
        "Premium materials",
        "Advanced finishes",
        "3-5 day turnaround",
        "Priority support",
        "Minimum order: 500 units",
        "Free design consultation",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "5.21",
      description: "Best value for large volume orders",
      features: [
        "All materials & finishes",
        "Rush orders available",
        "24-48 hour turnaround",
        "Dedicated account manager",
        "Minimum order: 2,000 units",
        "Free design & proofing",
        "Volume discounts",
      ],
      popular: false,
    },
  ]

  const labelTypes = [
    {
      name: "Product Labels",
      basePrice: "0.12",
      description: "Perfect for retail products, food packaging, and consumer goods",
      features: ["FDA compliant", "Waterproof options", "Custom shapes", "Vibrant colors"],
    },
    {
      name: "Shipping Labels",
      basePrice: "0.08",
      description: "Durable labels for logistics and distribution",
      features: ["Thermal compatible", "Barcode ready", "Weather resistant", "Strong adhesive"],
    },
    {
      name: "Security Labels",
      basePrice: "0.25",
      description: "Tamper-evident solutions for asset protection",
      features: ["Void-if-removed", "Holographic features", "Sequential numbering", "Custom security"],
    },
    {
      name: "Custom Labels",
      basePrice: "0.18",
      description: "Bespoke designs for unique applications",
      features: ["Foil stamping", "Embossing", "Die-cut shapes", "Luxury finishes"],
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
            <Link href="/help" className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium">
              Help
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
          <Badge className="mb-6 bg-white/10 text-white border-white/20">
            <Calculator className="h-4 w-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Simple,
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            No hidden fees, no surprises. Get professional quality labels at competitive prices with volume discounts.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Choose Your Plan</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Pricing based on quantity and features. All plans include free shipping on orders over $100.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative ${tier.popular ? "ring-2 ring-blue-500 shadow-2xl scale-105" : "shadow-lg"} hover:shadow-2xl transition-all duration-300`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">${tier.price}</span>
                    <span className="text-slate-600 ml-2">per label</span>
                  </div>
                  <CardDescription className="mt-4 text-slate-600">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-slate-900 hover:bg-slate-800"
                    }`}
                    asChild
                  >
                    <Link href="/login">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Label Types Pricing */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Pricing by Label Type</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Different label types have different base pricing. All prices shown are starting prices for 1,000+
              quantity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {labelTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-900">{type.name}</CardTitle>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">${type.basePrice}</span>
                      <span className="text-slate-600 text-sm ml-1">per label</span>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Additional Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Optional services to enhance your labels and speed up delivery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Rush Processing</h3>
                <p className="text-slate-600 mb-4">Get your orders faster with priority processing</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>24-48 hours</span>
                    <span className="font-semibold">+$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Same day</span>
                    <span className="font-semibold">+$150</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Premium Finishes</h3>
                <p className="text-slate-600 mb-4">Add luxury finishes to make your labels stand out</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Foil stamping</span>
                    <span className="font-semibold">+$0.05/label</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Embossing</span>
                    <span className="font-semibold">+$0.08/label</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Design Services</h3>
                <p className="text-slate-600 mb-4">Professional design help from our expert team</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Design consultation</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custom design</span>
                    <span className="font-semibold">$99</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Volume Discounts */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Volume Discounts</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The more you order, the more you save. Automatic discounts applied at checkout.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">100-999</h3>
                  <p className="text-slate-600 mb-2">Base Price</p>
                  <Badge variant="outline">0% discount</Badge>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">1,000-4,999</h3>
                  <p className="text-slate-600 mb-2">Popular Choice</p>
                  <Badge className="bg-green-100 text-green-800">10% discount</Badge>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">5,000-9,999</h3>
                  <p className="text-slate-600 mb-2">Business Orders</p>
                  <Badge className="bg-green-100 text-green-800">20% discount</Badge>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">10,000+</h3>
                  <p className="text-slate-600 mb-2">Enterprise</p>
                  <Badge className="bg-green-100 text-green-800">30% discount</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Pricing FAQ</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Common questions about our pricing and billing</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                q: "Are there any setup fees or hidden costs?",
                a: "No setup fees or hidden costs. The price you see is the price you pay. We believe in transparent pricing.",
              },
              {
                q: "Do you offer free shipping?",
                a: "Yes! Free shipping on all orders over $100. Orders under $100 have a flat $15 shipping fee within the US.",
              },
              {
                q: "How do volume discounts work?",
                a: "Volume discounts are automatically applied based on your order quantity. The more you order, the lower the per-unit price becomes.",
              },
              {
                q: "Can I get a custom quote for large orders?",
                a: "For orders over 10,000 units or complex custom requirements, contact our sales team for a personalized quote.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept wallet payments (crypto & CashApp top-ups), major credit cards, and wire transfers for large enterprise orders.",
              },
              {
                q: "Do prices include design services?",
                a: "Basic design consultation is free with all orders. Custom design work starts at $99 depending on complexity.",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Join thousands of businesses who trust LabelVaults for their printing needs. Get your instant quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-10 py-4 rounded-xl"
              asChild
            >
              <Link href="/login">Start Your Order</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/help">Contact Sales</Link>
            </Button>
          </div>
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
