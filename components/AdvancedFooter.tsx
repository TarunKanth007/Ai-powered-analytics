'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Heart,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Database,
  Settings,
  HelpCircle,
  FileText,
  Lock
} from 'lucide-react';

const footerSections = [
  {
    title: 'Product',
    icon: BarChart3,
    links: [
      { name: 'Dashboard', description: 'Real-time analytics dashboard with advanced visualizations' },
      { name: 'Reports', description: 'Comprehensive reporting tools with export capabilities' },
      { name: 'Integrations', description: 'Connect with your favorite tools and platforms' },
      { name: 'API', description: 'Powerful REST API for custom integrations' }
    ]
  },
  {
    title: 'Features',
    icon: Zap,
    links: [
      { name: 'Real-time Analytics', description: 'Live data updates and monitoring' },
      { name: 'Campaign Management', description: 'Advanced campaign tracking and optimization' },
      { name: 'Data Visualization', description: 'Interactive charts and graphs' },
      { name: 'Export Tools', description: 'PDF and CSV export functionality' }
    ]
  },
  {
    title: 'Resources',
    icon: FileText,
    links: [
      { name: 'Documentation', description: 'Comprehensive guides and API reference' },
      { name: 'Help Center', description: 'FAQs and troubleshooting guides' },
      { name: 'Blog', description: 'Latest insights and best practices' },
      { name: 'Tutorials', description: 'Step-by-step video tutorials' }
    ]
  },
  {
    title: 'Company',
    icon: Users,
    links: [
      { name: 'About Us', description: 'Learn about our mission and team' },
      { name: 'Careers', description: 'Join our growing team' },
      { name: 'Privacy Policy', description: 'How we protect your data' },
      { name: 'Terms of Service', description: 'Our terms and conditions' }
    ]
  }
];

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-600' }
];

const features = [
  { icon: Shield, text: 'Enterprise Security' },
  { icon: Zap, text: 'Lightning Fast' },
  { icon: TrendingUp, text: 'Advanced Analytics' },
  { icon: Database, text: 'Big Data Ready' }
];

export function AdvancedFooter() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <section.icon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHoveredLink(`${section.title}-${link.name}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 block"
                    >
                      {link.name}
                    </a>
                    
                    {/* Hover Popup */}
                    <AnimatePresence>
                      {hoveredLink === `${section.title}-${link.name}` && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 bottom-full mb-2 z-10 bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border max-w-xs"
                        >
                          <p className="text-sm">{link.description}</p>
                          <div className="absolute top-full left-4 w-2 h-2 bg-popover border-r border-b rotate-45 transform -translate-y-1" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                className="flex items-center space-x-2 text-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact and Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Get in Touch
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@analyticspro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`p-2 rounded-lg bg-background border hover:border-primary transition-colors ${social.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© 2024 Analytics Pro. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.div>
            <span>for better business insights.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <motion.a
              href="#"
              className="hover:text-foreground transition-colors flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <Lock className="h-3 w-3" />
              <span>Privacy</span>
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-foreground transition-colors flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="h-3 w-3" />
              <span>Terms</span>
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-foreground transition-colors flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
            >
              <HelpCircle className="h-3 w-3" />
              <span>Support</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}