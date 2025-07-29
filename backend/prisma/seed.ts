import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@labelvaults.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@labelvaults.com',
      password: adminPassword,
      role: 'ADMIN',
      isEmailVerified: true,
      isActive: true,
      company: 'LabelVaults',
      phone: '+1-555-0123',
      address: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
    },
  });

  // Create admin wallet
  await prisma.wallet.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      balance: 1000.0,
    },
  });

  console.log('👤 Admin user created:', admin.email);

  // Create demo user
  const demoPassword = await bcrypt.hash('demo123', 12);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      firstName: 'Demo',
      lastName: 'Customer',
      email: 'demo@example.com',
      password: demoPassword,
      role: 'USER',
      isEmailVerified: true,
      isActive: true,
      company: 'Demo Company',
      phone: '+1-555-0124',
      address: '456 Customer St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
    },
  });

  // Create demo user wallet
  await prisma.wallet.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      balance: 250.75,
    },
  });

  console.log('👤 Demo user created:', demoUser.email);

  // Seed products
  const products = [
    {
      name: 'Product Labels',
      description: 'Premium labels for retail, food, cosmetics, and consumer goods with FDA-compliant materials and vibrant color printing.',
      category: 'PRODUCT_LABELS',
      basePrice: 0.12,
      materials: ['Paper', 'Vinyl', 'Polyester', 'Waterproof'],
      finishes: ['Matte', 'Gloss', 'UV Coating'],
      features: ['FDA compliant', 'Waterproof options', 'Custom shapes', 'Vibrant colors'],
      minQuantity: 100,
      maxQuantity: 50000,
    },
    {
      name: 'Shipping Labels',
      description: 'Industrial-strength labels for logistics and distribution with thermal transfer compatibility and weather resistance.',
      category: 'SHIPPING_LABELS',
      basePrice: 0.08,
      materials: ['Thermal', 'Direct Thermal', 'Polyester', 'Vinyl'],
      finishes: ['Standard', 'Laminated'],
      features: ['Thermal compatible', 'Barcode ready', 'Weather resistant', 'Strong adhesive'],
      minQuantity: 250,
      maxQuantity: 100000,
    },
    {
      name: 'Security Labels',
      description: 'Tamper-evident solutions for asset protection and authentication with advanced security features.',
      category: 'SECURITY_LABELS',
      basePrice: 0.25,
      materials: ['Security Vinyl', 'Destructible', 'Holographic', 'Tamper-evident'],
      finishes: ['Void-if-removed', 'Holographic', 'Sequential numbering'],
      features: ['Void-if-removed', 'Holographic features', 'Sequential numbering', 'Custom security'],
      minQuantity: 50,
      maxQuantity: 10000,
    },
    {
      name: 'Custom Labels',
      description: 'Bespoke designs for branding, events, and special applications with luxury finishing options.',
      category: 'CUSTOM_LABELS',
      basePrice: 0.18,
      materials: ['Premium Paper', 'Metallic', 'Clear', 'Textured'],
      finishes: ['Foil Stamping', 'Embossing', 'Die-cut', 'Luxury'],
      features: ['Foil stamping', 'Embossing', 'Die-cut shapes', 'Luxury finishes'],
      minQuantity: 100,
      maxQuantity: 25000,
    },
    {
      name: 'Industrial Labels',
      description: 'Heavy-duty solutions for extreme environments with chemical resistance and high temperature rating.',
      category: 'INDUSTRIAL_LABELS',
      basePrice: 0.35,
      materials: ['Polyester', 'Polyimide', 'Aluminum', 'Ceramic'],
      finishes: ['Chemical Resistant', 'High Temperature', 'UV Stable'],
      features: ['Chemical resistant', 'High temperature rated', 'UV stable', 'Extreme durability'],
      minQuantity: 50,
      maxQuantity: 20000,
    },
    {
      name: 'Roll Labels',
      description: 'Continuous rolls for automated dispensing and high-volume applications with multiple core sizes.',
      category: 'ROLL_LABELS',
      basePrice: 0.10,
      materials: ['Paper', 'Vinyl', 'Thermal', 'Clear'],
      finishes: ['Standard', 'Perforated', 'Kiss-cut'],
      features: ['Multiple core sizes', 'Perforated options', 'Bulk discounts', 'Custom lengths'],
      minQuantity: 500,
      maxQuantity: 100000,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { 
        name: productData.name,
      },
      update: {},
      create: productData,
    });
    console.log(`📦 Product created: ${product.name}`);
  }

  // Create sample orders for demo user
  const sampleOrders = [
    {
      userId: demoUser.id,
      orderNumber: 'ORD-20240001',
      status: 'IN_PRODUCTION',
      totalAmount: 120.00,
      notes: 'Rush order for product launch',
      shippingAddress: '456 Customer St, Los Angeles, CA 90210',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
    {
      userId: demoUser.id,
      orderNumber: 'ORD-20240002',
      status: 'COMPLETED',
      totalAmount: 85.50,
      notes: 'Standard shipping labels',
      shippingAddress: '456 Customer St, Los Angeles, CA 90210',
      estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const orderData of sampleOrders) {
    const order = await prisma.order.upsert({
      where: { orderNumber: orderData.orderNumber },
      update: {},
      create: orderData,
    });
    console.log(`📋 Order created: ${order.orderNumber}`);
  }

  // Create sample transactions for demo user
  const sampleTransactions = [
    {
      userId: demoUser.id,
      type: 'DEPOSIT',
      amount: 500.00,
      description: 'Initial wallet funding',
      status: 'COMPLETED',
      paymentMethod: 'stripe',
    },
    {
      userId: demoUser.id,
      type: 'ORDER_PAYMENT',
      amount: -120.00,
      description: 'Payment for order ORD-20240001',
      status: 'COMPLETED',
    },
    {
      userId: demoUser.id,
      type: 'ORDER_PAYMENT',
      amount: -85.50,
      description: 'Payment for order ORD-20240002',
      status: 'COMPLETED',
    },
    {
      userId: demoUser.id,
      type: 'DEPOSIT',
      amount: 250.00,
      description: 'Wallet top-up via Stripe',
      status: 'COMPLETED',
      paymentMethod: 'stripe',
    },
  ];

  for (const transactionData of sampleTransactions) {
    await prisma.transaction.create({
      data: transactionData,
    });
  }

  console.log('💰 Sample transactions created');

  // Create sample support ticket
  await prisma.supportTicket.create({
    data: {
      userId: demoUser.id,
      subject: 'Question about custom label materials',
      message: 'Hi, I am interested in creating custom labels for my product line. Could you provide more information about the available materials and their durability?',
      status: 'OPEN',
      priority: 'NORMAL',
    },
  });

  console.log('🎫 Sample support ticket created');

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📝 Login credentials:');
  console.log('Admin: admin@labelvaults.com / admin123');
  console.log('Demo User: demo@example.com / demo123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });