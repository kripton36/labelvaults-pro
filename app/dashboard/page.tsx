"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Printer,
  Upload,
  FileText,
  Package,
  User,
  Settings,
  LogOut,
  Plus,
  Eye,
  Download,
  X,
  Search,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [walletBalance, setWalletBalance] = useState(250.75)
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false)
  const [topupAmount, setTopupAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Reset form or show success message
  }

  const handleTopup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const amount = Number.parseFloat(topupAmount)
    setWalletBalance((prev) => prev + amount)
    setIsProcessingPayment(false)
    setIsTopupModalOpen(false)
    setTopupAmount("")
    setSelectedPaymentMethod("")
  }

  const cryptoAddresses = {
    bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethereum: "0x742d35Cc6634C0532925a3b8D4C9db96590b4c5d",
    usdt: "TQn9Y2khEsLJW1ChVWFMSMeRDow5oREqjK",
  }

  const orders = [
    {
      id: "ORD-001",
      type: "Product Labels",
      quantity: 1000,
      status: "In Production",
      date: "2024-01-15",
      progress: 75,
    },
    {
      id: "ORD-002",
      type: "Shipping Labels",
      quantity: 500,
      status: "Completed",
      date: "2024-01-10",
      progress: 100,
    },
    {
      id: "ORD-003",
      type: "Custom Labels",
      quantity: 2000,
      status: "Pending Review",
      date: "2024-01-12",
      progress: 25,
    },
  ]

  const trackingOrders = [
    {
      id: "ORD-001",
      type: "Product Labels",
      quantity: 1000,
      status: "In Production",
      date: "2024-01-15",
      estimatedDelivery: "2024-01-20",
      trackingNumber: "LP123456789",
      timeline: [
        {
          status: "Order Received",
          date: "2024-01-15 09:00",
          completed: true,
          description: "Your order has been received and is being reviewed",
        },
        {
          status: "Design Approved",
          date: "2024-01-15 14:30",
          completed: true,
          description: "Design has been approved and sent to production",
        },
        {
          status: "In Production",
          date: "2024-01-16 08:00",
          completed: true,
          description: "Your labels are currently being printed",
          current: true,
        },
        {
          status: "Quality Check",
          date: "2024-01-19 10:00",
          completed: false,
          description: "Final quality inspection before packaging",
        },
        {
          status: "Shipped",
          date: "2024-01-20 12:00",
          completed: false,
          description: "Package shipped and tracking information provided",
        },
        {
          status: "Delivered",
          date: "2024-01-22 16:00",
          completed: false,
          description: "Package delivered to your address",
        },
      ],
    },
    {
      id: "ORD-002",
      type: "Shipping Labels",
      quantity: 500,
      status: "Delivered",
      date: "2024-01-10",
      estimatedDelivery: "2024-01-15",
      trackingNumber: "LP987654321",
      timeline: [
        {
          status: "Order Received",
          date: "2024-01-10 10:15",
          completed: true,
          description: "Your order has been received and is being reviewed",
        },
        {
          status: "Design Approved",
          date: "2024-01-10 15:45",
          completed: true,
          description: "Design has been approved and sent to production",
        },
        {
          status: "In Production",
          date: "2024-01-11 09:30",
          completed: true,
          description: "Your labels are currently being printed",
        },
        {
          status: "Quality Check",
          date: "2024-01-12 11:00",
          completed: true,
          description: "Final quality inspection completed successfully",
        },
        {
          status: "Shipped",
          date: "2024-01-13 14:20",
          completed: true,
          description: "Package shipped via FedEx Express",
        },
        {
          status: "Delivered",
          date: "2024-01-15 10:30",
          completed: true,
          description: "Package delivered successfully",
          current: true,
        },
      ],
    },
    {
      id: "ORD-003",
      type: "Custom Labels",
      quantity: 2000,
      status: "Pending Review",
      date: "2024-01-12",
      estimatedDelivery: "2024-01-25",
      trackingNumber: "LP456789123",
      timeline: [
        {
          status: "Order Received",
          date: "2024-01-12 11:20",
          completed: true,
          description: "Your order has been received and is being reviewed",
          current: true,
        },
        {
          status: "Design Review",
          date: "2024-01-13 09:00",
          completed: false,
          description: "Design team reviewing your specifications",
        },
        {
          status: "Customer Approval",
          date: "2024-01-14 12:00",
          completed: false,
          description: "Waiting for your approval on design proof",
        },
        {
          status: "In Production",
          date: "2024-01-16 08:00",
          completed: false,
          description: "Production will begin after approval",
        },
        {
          status: "Quality Check",
          date: "2024-01-22 10:00",
          completed: false,
          description: "Final quality inspection before packaging",
        },
        {
          status: "Shipped",
          date: "2024-01-24 12:00",
          completed: false,
          description: "Package shipped and tracking information provided",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Printer className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              LabelVaults
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              John Doe
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage your label printing orders and track progress</p>
        </div>

        <Tabs defaultValue="new-order" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="new-order">New Order</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="new-order" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Order
                </CardTitle>
                <CardDescription>Fill out the details below to submit your label printing order</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="labelType">Label Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select label type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Product Labels</SelectItem>
                          <SelectItem value="shipping">Shipping Labels</SelectItem>
                          <SelectItem value="custom">Custom Labels</SelectItem>
                          <SelectItem value="security">Security Labels</SelectItem>
                          <SelectItem value="industrial">Industrial Labels</SelectItem>
                          <SelectItem value="roll">Roll Labels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="1000" min="1" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="size">Label Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2x1">2" x 1"</SelectItem>
                          <SelectItem value="3x2">3" x 2"</SelectItem>
                          <SelectItem value="4x3">4" x 3"</SelectItem>
                          <SelectItem value="custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material">Material</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vinyl">Vinyl</SelectItem>
                          <SelectItem value="paper">Paper</SelectItem>
                          <SelectItem value="polyester">Polyester</SelectItem>
                          <SelectItem value="waterproof">Waterproof</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your label requirements, colors, text, special instructions..."
                      rows={4}
                    />
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <Label>Design Files</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">
                        Drag and drop your files here, or{" "}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                          browse
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.ai,.eps,.png,.jpg,.jpeg"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-sm text-slate-500">
                        Supported formats: PDF, AI, EPS, PNG, JPG (Max 10MB each)
                      </p>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files</Label>
                        <div className="space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
                            >
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-blue-600" />
                                <div>
                                  <p className="font-medium text-slate-900">{file.name}</p>
                                  <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Preferred Deadline</Label>
                      <Input id="deadline" type="date" min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rush">Rush Order</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select turnaround" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                          <SelectItem value="rush">Rush (24-48 hours) +$50</SelectItem>
                          <SelectItem value="same-day">Same Day +$150</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting Order..." : "Submit Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order History
                </CardTitle>
                <CardDescription>Track the status of your current and past orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border border-slate-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">{order.id}</h3>
                            <p className="text-sm text-slate-600">
                              {order.type} • {order.quantity} units
                            </p>
                          </div>
                          <Badge
                            variant={
                              order.status === "Completed"
                                ? "default"
                                : order.status === "In Production"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{order.progress}%</span>
                          </div>
                          <Progress value={order.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-sm text-slate-500">Ordered on {order.date}</p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {order.status === "Completed" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Order Tracking
                </CardTitle>
                <CardDescription>Track your orders in real-time with detailed status updates</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input placeholder="Search by order ID or tracking number..." className="pl-10" />
                  </div>
                </div>

                {/* Tracking Cards */}
                <div className="space-y-6">
                  {trackingOrders.map((order) => (
                    <Card key={order.id} className="border border-slate-200">
                      <CardContent className="p-6">
                        {/* Order Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{order.id}</h3>
                            <p className="text-slate-600">
                              {order.type} • {order.quantity} units
                            </p>
                            <p className="text-sm text-slate-500">Ordered: {order.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : order.status === "In Production"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="mb-2"
                            >
                              {order.status}
                            </Badge>
                            <p className="text-sm text-slate-600">Est. Delivery: {order.estimatedDelivery}</p>
                            <p className="text-xs text-slate-500">Tracking: {order.trackingNumber}</p>
                          </div>
                        </div>

                        {/* Progress Timeline */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-slate-900 mb-4">Order Progress</h4>
                          <div className="relative">
                            {order.timeline.map((step, index) => (
                              <div key={index} className="flex items-start space-x-4 pb-6 last:pb-0">
                                {/* Timeline Line */}
                                {index < order.timeline.length - 1 && (
                                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-slate-200"></div>
                                )}

                                {/* Status Icon */}
                                <div
                                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                                    step.completed
                                      ? "bg-green-500 border-green-500"
                                      : step.current
                                        ? "bg-blue-500 border-blue-500"
                                        : "bg-white border-slate-300"
                                  }`}
                                >
                                  {step.completed ? (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  ) : step.current ? (
                                    <Clock className="h-4 w-4 text-white" />
                                  ) : (
                                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                                  )}
                                </div>

                                {/* Status Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h5
                                      className={`font-medium ${
                                        step.completed || step.current ? "text-slate-900" : "text-slate-500"
                                      }`}
                                    >
                                      {step.status}
                                    </h5>
                                    <span
                                      className={`text-sm ${
                                        step.completed || step.current ? "text-slate-600" : "text-slate-400"
                                      }`}
                                    >
                                      {step.date}
                                    </span>
                                  </div>
                                  <p
                                    className={`text-sm mt-1 ${
                                      step.completed || step.current ? "text-slate-600" : "text-slate-400"
                                    }`}
                                  >
                                    {step.description}
                                  </p>

                                  {/* Current Status Highlight */}
                                  {step.current && (
                                    <div className="mt-2 flex items-center text-blue-600">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      <span className="text-sm font-medium">Current Status</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                          <div className="flex items-center space-x-2 text-slate-600">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">Shipping to: 123 Business St, New York, NY 10001</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            {order.status === "Delivered" && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Download Invoice
                              </Button>
                            )}
                            {(order.status === "In Production" || order.status === "Shipped") && (
                              <Button variant="outline" size="sm">
                                <Truck className="h-4 w-4 mr-1" />
                                Track Package
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-4 mt-8">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h3 className="font-bold text-blue-900">3</h3>
                      <p className="text-sm text-blue-700">Active Orders</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h3 className="font-bold text-green-900">12</h3>
                      <p className="text-sm text-green-700">Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <h3 className="font-bold text-orange-900">1</h3>
                      <p className="text-sm text-orange-700">Pending Review</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h3 className="font-bold text-purple-900">2</h3>
                      <p className="text-sm text-purple-700">In Transit</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            {/* Wallet Balance Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Wallet Balance</h2>
                    <p className="text-3xl font-bold">${walletBalance.toFixed(2)}</p>
                    <p className="text-blue-100 mt-2">Available for orders</p>
                  </div>
                  <div className="text-right">
                    <Button
                      onClick={() => setIsTopupModalOpen(true)}
                      className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Top Up
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Your wallet transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "TXN-001",
                      type: "Top Up",
                      method: "Bitcoin",
                      amount: 100.0,
                      date: "2024-01-18",
                      status: "Completed",
                    },
                    {
                      id: "TXN-002",
                      type: "Order Payment",
                      method: "Wallet",
                      amount: -45.5,
                      date: "2024-01-17",
                      status: "Completed",
                    },
                    {
                      id: "TXN-003",
                      type: "Top Up",
                      method: "CashApp",
                      amount: 75.25,
                      date: "2024-01-15",
                      status: "Completed",
                    },
                    {
                      id: "TXN-004",
                      type: "Order Payment",
                      method: "Wallet",
                      amount: -120.0,
                      date: "2024-01-14",
                      status: "Completed",
                    },
                  ].map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {transaction.amount > 0 ? (
                            <Plus className={`h-5 w-5 text-green-600`} />
                          ) : (
                            <Package className={`h-5 w-5 text-red-600`} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{transaction.type}</h4>
                          <p className="text-sm text-slate-600">
                            {transaction.method} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Supported Payment Methods</CardTitle>
                <CardDescription>Choose from various payment options to top up your wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Cryptocurrency</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">₿</span>
                        </div>
                        <span className="font-medium">Bitcoin (BTC)</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">Ξ</span>
                        </div>
                        <span className="font-medium">Ethereum (ETH)</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">₮</span>
                        </div>
                        <span className="font-medium">USDT (Tether)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Digital Payments</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">$</span>
                        </div>
                        <span className="font-medium">CashApp</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg opacity-50">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">V</span>
                        </div>
                        <span className="font-medium">Venmo (Coming Soon)</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg opacity-50">
                        <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">P</span>
                        </div>
                        <span className="font-medium">PayPal (Coming Soon)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Corp" />
                  </div>
                  <Button className="w-full">Update Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your billing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Business St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue="10001" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                  <Button className="w-full">Update Billing</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Top Up Modal */}
        {isTopupModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Top Up Wallet</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsTopupModalOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Add funds to your wallet using crypto or CashApp</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTopup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50.00"
                      min="10"
                      max="1000"
                      step="0.01"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                      required
                    />
                    <p className="text-sm text-slate-500">Minimum: $10.00 • Maximum: $1,000.00</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <div className="space-y-2">
                      {/* Crypto Options */}
                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPaymentMethod === "bitcoin" ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedPaymentMethod("bitcoin")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">₿</span>
                          </div>
                          <span className="font-medium">Bitcoin</span>
                        </div>
                      </div>

                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPaymentMethod === "ethereum" ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedPaymentMethod("ethereum")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">Ξ</span>
                          </div>
                          <span className="font-medium">Ethereum</span>
                        </div>
                      </div>

                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPaymentMethod === "usdt" ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedPaymentMethod("usdt")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">₮</span>
                          </div>
                          <span className="font-medium">USDT (Tether)</span>
                        </div>
                      </div>

                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedPaymentMethod === "cashapp" ? "border-blue-500 bg-blue-50" : "hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedPaymentMethod("cashapp")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">$</span>
                          </div>
                          <span className="font-medium">CashApp</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  {selectedPaymentMethod && selectedPaymentMethod !== "cashapp" && (
                    <div className="space-y-3">
                      <Label>Payment Instructions</Label>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700 mb-2">
                          Send <strong>${topupAmount || "0.00"}</strong> worth of {selectedPaymentMethod.toUpperCase()}{" "}
                          to:
                        </p>
                        <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                          {cryptoAddresses[selectedPaymentMethod as keyof typeof cryptoAddresses]}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          ⚠️ Only send {selectedPaymentMethod.toUpperCase()} to this address. Funds will be credited
                          after 3 confirmations.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "cashapp" && (
                    <div className="space-y-3">
                      <Label>CashApp Payment</Label>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-700 mb-2">
                          Send <strong>${topupAmount || "0.00"}</strong> to our CashApp:
                        </p>
                        <div className="bg-white p-3 rounded border font-mono text-sm text-center">$LabelVaultsPay</div>
                        <p className="text-xs text-slate-500 mt-2">
                          💡 Include your order ID in the payment note for faster processing.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!selectedPaymentMethod || !topupAmount || isProcessingPayment}
                  >
                    {isProcessingPayment ? "Processing Payment..." : "Confirm Top Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
