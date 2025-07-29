import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Printer, Award, Users, Globe, Target, Heart, Zap, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
            <Award className="h-4 w-4 mr-2" />
            Industry Leader Since 2010
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            About
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LabelVaults
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of label printing with cutting-edge technology, unmatched quality, and exceptional
            service for over a decade.
          </p>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">10,000+</h3>
              <p className="text-slate-600 font-medium">Happy Clients</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">50+</h3>
              <p className="text-slate-600 font-medium">Countries Served</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">15+</h3>
              <p className="text-slate-600 font-medium">Years Experience</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Printer className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">1M+</h3>
              <p className="text-slate-600 font-medium">Labels Printed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Built on Innovation,
                <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Driven by Excellence
                </span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Founded in 2010 by a team of printing industry veterans, LabelVaults emerged from a simple vision: to
                revolutionize label printing through technology, quality, and customer-first service.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                What started as a small operation has grown into a global leader, serving Fortune 500 companies and
                innovative startups alike. Our commitment to excellence and continuous innovation has made us the
                trusted partner for businesses worldwide.
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                asChild
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
              <img
                src="/placeholder.svg?height=600&width=700&text=LabelVaults+Facility"
                alt="LabelVaults printing facility"
                className="relative rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Precision</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every label we produce meets the highest standards of accuracy and quality, ensuring your brand looks
                  perfect every time.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Innovation</h3>
                <p className="text-slate-600 leading-relaxed">
                  We continuously invest in cutting-edge technology and processes to deliver faster, better, and more
                  sustainable solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Partnership</h3>
                <p className="text-slate-600 leading-relaxed">
                  We build lasting relationships with our clients, understanding their unique needs and growing together
                  as partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Meet Our Leadership</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The visionary team behind LabelVaults's success and innovation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=300&width=300&text=Sarah+Johnson",
                bio: "15+ years in printing industry, former VP at PrintTech Solutions",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "/placeholder.svg?height=300&width=300&text=Michael+Chen",
                bio: "Technology innovator with expertise in digital printing and automation",
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Operations",
                image: "/placeholder.svg?height=300&width=300&text=Emily+Rodriguez",
                bio: "Operations expert ensuring quality and efficiency in every order",
              },
            ].map((member, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Certifications & Awards</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Recognized for excellence in quality, sustainability, and innovation
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "ISO 9001", description: "Quality Management" },
              { name: "FSC Certified", description: "Sustainable Forestry" },
              { name: "G7 Master", description: "Color Excellence" },
              { name: "Best Printer 2023", description: "Industry Award" },
            ].map((cert, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-slate-600">{cert.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Work Together?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust LabelVaults for their printing needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-10 py-4 rounded-xl"
              asChild
            >
              <Link href="/login">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
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
