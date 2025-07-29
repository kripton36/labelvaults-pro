import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Printer,
  Package,
  Truck,
  Shield,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Droplets,
  Sun,
  Thermometer,
} from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const products = [
    {
      name: "Product Labels",
      icon: Package,
      description: "Premium labels for retail, food, cosmetics, and consumer goods",
      features: [
        "FDA-compliant materials",
        "Waterproof & chemical resistant",
        "Custom shapes & finishes",
        "Vibrant color printing",
      ],
      applications: ["Food & Beverage", "Cosmetics", "Retail Products", "Pharmaceuticals"],
      materials: ["Vinyl", "Paper", "Polyester", "Waterproof"],
      startingPrice: "0.12",
    },
    {
      name: "Shipping Labels",
      icon: Truck,
      description: "Industrial-strength labels for logistics and distribution",
      features: [
        "Thermal transfer compatible",
        "Barcode & QR code ready",
        "Weather & abrasion resistant",
        "Strong adhesive",
      ],
      applications: ["E-commerce", "Warehousing", "Distribution", "Logistics"],
      materials: ["Thermal", "Direct Thermal", "Polyester", "Vinyl"],
      startingPrice: "0.08",
    },
    {
      name: "Security Labels",
      icon: Shield,
      description: "Tamper-evident solutions for asset protection and authentication",
      features: [
        "Void-if-removed technology",
        "Holographic security features",
        "Sequential numbering",
        "Custom security patterns",
      ],
      applications: ["Asset Tracking", "Warranty Seals", "Authentication", "Anti-counterfeiting"],
      materials: ["Security Vinyl", "Destructible", "Holographic", "Tamper-evident"],
      startingPrice: "0.25",
    },
    {
      name: "Custom Labels",
      icon: Star,
      description: "Bespoke designs for branding, events, and special applications",
      features: [
        "Foil stamping & embossing",
        "Die-cut custom shapes",
        "Luxury finishes available",
        "Premium materials",
      ],
      applications: ["Branding", "Events", "Promotions", "Special Projects"],
      materials: ["Premium Paper", "Metallic", "Clear", "Textured"],
      startingPrice: "0.18",
    },
    {
      name: "Industrial Labels",
      icon: Award,
      description: "Heavy-duty solutions for extreme environments and conditions",
      features: [
        "Chemical & solvent resistant",
        "High temperature rated",
        "UV stable for outdoor use",
        "Extreme durability",
      ],
      applications: ["Manufacturing", "Chemical Industry", "Outdoor Equipment", "Automotive"],
      materials: ["Polyester", "Polyimide", "Aluminum", "Ceramic"],
      startingPrice: "0.35",
    },
    {
      name: "Roll Labels",
      icon: Printer,
      description: "Continuous rolls for automated dispensing and high-volume applications",
      features: [
        "Multiple core sizes available",
        "Perforated options",
        "Bulk quantity discounts",
        "Custom roll lengths",
      ],
      applications: ["Automated Systems", "High-volume Production", "Dispensing Equipment", "Manufacturing Lines"],
      materials: ["Paper", "Vinyl", "Polyester", "Thermal"],
      startingPrice: "0.10",
    },
  ]

  const materials = [
    {
      name: "Vinyl",
      description: "Durable, waterproof, and chemical resistant",
      properties: ["Waterproof", "Chemical resistant", "Flexible", "Long-lasting"],
      applications: ["Outdoor use", "Industrial", "Product labels"],
      icon: Droplets,
    },
    {
      name: "Paper",
      description: "Cost-effective for indoor applications",
      properties: ["Economical", "Printable", "Recyclable", "Smooth finish"],
      applications: ["Indoor labels", "Shipping", "Temporary use"],
      icon: Package,
    },
    {
      name: "Polyester",
      description: "Premium durability for demanding environments",
      properties: ["Heat resistant", "Chemical proof", "Tear resistant", "Professional finish"],
      applications: ["Industrial", "Electronics", "Automotive"],
      icon: Thermometer,
    },
    {
      name: "Clear/Transparent",
      description: "Invisible application for premium look",
      properties: ["Transparent", "Professional", "Waterproof", "UV resistant"],
      applications: ["Product labels", "Branding", "Windows"],
      icon: Sun,
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
              href="/pricing"
              className="text-slate-600 hover:text-blue-600 transition-all duration-300 font-medium"
            >
              Pricing
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
            <Package className="h-4 w-4 mr-2" />
            Professional Solutions
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Our
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Comprehensive label solutions for every industry and application. From simple shipping labels to complex
            security solutions.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Complete Label Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional-grade labels designed for your specific needs and applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <product.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{product.name}</CardTitle>
                  <CardDescription className="text-slate-600">{product.description}</CardDescription>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-500">Starting at</span>
                    <span className="text-lg font-bold text-blue-600">${product.startingPrice}/label</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Features</h4>
                    <ul className="space-y-1 text-sm">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-slate-700">
                          <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Applications</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.map((app, appIndex) => (
                        <Badge key={appIndex} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                    asChild
                  >
                    <Link href="/login">
                      Order Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Premium Materials</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from our selection of high-quality materials, each optimized for specific applications and
              environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {materials.map((material, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <material.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{material.name}</h3>
                  <p className="text-slate-600 mb-4">{material.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-sm">Properties</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {material.properties.map((prop, propIndex) => (
                        <Badge key={propIndex} variant="outline" className="text-xs">
                          {prop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose LabelVaults?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry-leading features and quality that set us apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Lightning Fast Turnaround</h3>
                <p className="text-slate-600 mb-4">
                  Rush orders in as little as 4 hours, standard delivery in 24-48 hours
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Same-day rush available</li>
                  <li>• 24/7 production facility</li>
                  <li>• Real-time order tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Unmatched Quality</h3>
                <p className="text-slate-600 mb-4">ISO 9001 certified with 99.9% quality rating from customers</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Color-matched printing</li>
                  <li>• Quality inspection process</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Advanced Technology</h3>
                <p className="text-slate-600 mb-4">State-of-the-art printing equipment and cutting-edge processes</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• HP Indigo digital presses</li>
                  <li>• Precision die-cutting</li>
                  <li>• Advanced finishing options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Industries We Serve</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trusted by businesses across diverse industries for their labeling needs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Food & Beverage", description: "FDA-compliant labels for food products" },
              { name: "Healthcare", description: "Medical device and pharmaceutical labels" },
              { name: "Manufacturing", description: "Industrial and equipment labeling" },
              { name: "Retail", description: "Product and promotional labels" },
              { name: "Logistics", description: "Shipping and tracking labels" },
              { name: "Electronics", description: "Component and device labeling" },
              { name: "Automotive", description: "Parts and safety labels" },
              { name: "Cosmetics", description: "Beauty and personal care labels" },
            ].map((industry, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{industry.name}</h3>
                  <p className="text-sm text-slate-600">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Order?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Get started with professional label printing today. Upload your design and get an instant quote.
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
              <Link href="/pricing">View Pricing</Link>
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
