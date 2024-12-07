const mongoose = require('mongoose');
const Project = require('../db/models/projectModel');

const dbURI = "mongodb+srv://ashrafmarwa:FOjGk3LQgMZeXeae@innovestdb.xrabm.mongodb.net/?retryWrites=true&w=majority&appName=innovestDB";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const projects = [
  {
    project_name: 'SmartHome Automation System',
    description: 'A cutting-edge automation system for smart homes, including AI-driven control for appliances, security, and energy management.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'under review',
    approved: 'pending',
    visibility: true,
    field: 'Technology',
    budget: 50000,
    offer: 12000,
    target: 60000,
    deadline: '2024-06-15',
    documents: [
      '/documents/smart-home-proposal.pdf',
      '/documents/smart-home-budget.xlsx',
      '/documents/smart-home-architecture.png'
    ]
  },
  {
    project_name: 'GreenTech Solar Panels',
    description: 'An innovative solar panel system that maximizes energy output and durability for residential use.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'funded',
    approved: 'pending',
    visibility: true,
    field: 'Renewable Energy',
    budget: 75000,
    offer: 20000,
    target: 80000,
    deadline: '2024-09-20',
    documents: [
      '/documents/solar-panel-technical-report.pdf',
      '/documents/solar-panel-cost-analysis.xlsx'
    ]
  },
  {
    project_name: 'Blockchain-Based Voting Platform',
    description: 'A secure, decentralized platform for online voting with blockchain technology ensuring transparency and safety.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'under review',
    approved: 'pending',
    visibility: false,
    field: 'Blockchain',
    budget: 100000,
    offer: 25000,
    target: 110000,
    deadline: '2024-12-05',
    documents: [
      '/documents/blockchain-voting-whitepaper.pdf',
      '/documents/blockchain-voting-architecture.jpg'
    ]
  },
  {
    project_name: 'AI-Powered Market Research Tool',
    description: 'A tool that uses AI and machine learning to provide in-depth market analysis and trend forecasting.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'funding',
    approved: 'pending',
    visibility: false,
    field: 'Artificial Intelligence',
    budget: 80000,
    offer: 15000,
    target: 85000,
    deadline: '2024-08-01',
    documents: [
      '/documents/ai-market-research-proposal.pdf',
      '/documents/ai-trend-analysis.docx'
    ]
  },
  {
    project_name: 'Virtual Reality Learning Platform',
    description: 'An immersive VR platform for online education, with interactive lessons and real-world simulations.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'under review',
    approved: 'pending',
    visibility: false,
    field: 'Education Technology',
    budget: 90000,
    offer: 22000,
    target: 95000,
    deadline: '2024-11-15',
    documents: [
      '/documents/vr-learning-proposal.pdf',
      '/documents/vr-learning-implementation-plan.docx'
    ]
  },
  {
    project_name: 'Eco-Friendly Biodegradable Packaging',
    description: 'A sustainable packaging solution made from biodegradable materials that reduce environmental impact.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'funded',
    approved: 'pending',
    visibility: true,
    field: 'Environmental Sustainability',
    budget: 60000,
    offer: 10000,
    target: 62000,
    deadline: '2024-07-25',
    documents: [
      '/documents/eco-packaging-sustainability-report.pdf',
      '/documents/eco-packaging-vision-board.jpg'
    ]
  },
  {
    project_name: 'E-commerce AI Chatbot',
    description: 'A chatbot solution designed for e-commerce websites to improve customer support and sales conversion rates.',
    entrepreneur_id: '32c6b77e-87b5-4bba-8e24-7106b02cccf0',
    status: 'funding',
    approved: 'pending',
    visibility: false,
    field: 'E-commerce',
    budget: 70000,
    offer: 15000,
    target: 72000,
    deadline: '2024-08-30',
    documents: [
      '/documents/ecommerce-chatbot-overview.pdf',
      '/documents/ecommerce-ai-demo.mp4'
    ]
  }
];

async function clearDatabase() {
  try {
    await Project.deleteMany({});
    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing the database:', error);
  }
}

(async function seedDatabase() {
  try {
    await clearDatabase(); // Clear existing data first
    await Project.insertMany(projects);
    console.log('Projects successfully seeded!');
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    mongoose.connection.close();
  }
})();
