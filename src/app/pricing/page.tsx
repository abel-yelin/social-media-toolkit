"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our tools",
      features: [
        "10 giveaways per month",
        "Up to 100 comments per giveaway",
        "Basic filtering",
        "Email support",
        "Instagram & Facebook tools"
      ],
      icon: Star,
      color: "from-gray-500 to-gray-700",
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Great for content creators and small businesses",
      features: [
        "Unlimited giveaways",
        "Up to 1,000 comments per giveaway",
        "Advanced filtering & analytics",
        "Priority email support",
        "All platform tools",
        "Export to CSV/Excel",
        "Winner announcement templates"
      ],
      icon: Zap,
      color: "from-blue-500 to-purple-600",
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Perfect for agencies and large teams",
      features: [
        "Everything in Pro",
        "Unlimited comments per giveaway",
        "Team collaboration tools",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "24/7 phone support",
        "Advanced integrations"
      ],
      icon: Crown,
      color: "from-purple-500 to-pink-600",
      buttonText: "Contact Sales",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <AnimatedSection direction="up">
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-6">
                Choose Your Plan
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Start free and upgrade as you grow. All plans include our core giveaway tools
                and winner selection features across all major social media platforms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center justify-center space-x-8 text-blue-100"
            >
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>14-day free trial</span>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Pricing Cards */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <StaggeredContainer
              className="grid md:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <Card className={`h-full ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'}`}>
                    <CardHeader className="text-center space-y-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto`}
                      >
                        <plan.icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          {plan.name}
                        </CardTitle>
                        <p className="text-gray-600 mt-2">{plan.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-600">/{plan.period}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                            className="flex items-start space-x-3"
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                              : plan.name === 'Free'
                                ? 'bg-gray-600 hover:bg-gray-700'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          }`}
                        >
                          {plan.buttonText}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection direction="up" delay={0.3}>
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Everything you need to know about our pricing and features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "Can I change my plan anytime?",
                  answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing."
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, we offer a 14-day free trial of our Pro plan. No credit card required to start."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "Yes, we offer a 30-day money-back guarantee if you're not completely satisfied with our service."
                },
                {
                  question: "Is my data secure?",
                  answer: "Absolutely. We use enterprise-grade security and encryption to protect your data. We're also GDPR compliant."
                },
                {
                  question: "Can I cancel anytime?",
                  answer: "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period."
                }
              ].map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection direction="up" delay={0.4}>
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of content creators and businesses who trust EasyComment
                for their social media giveaways.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8"
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8"
                >
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
