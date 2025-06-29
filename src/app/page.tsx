"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, Check } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import { EnhancedHero } from "@/components/EnhancedHero"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <Navigation />

      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Rating Section */}
      <AnimatedSection direction="scale" delay={0.2}>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <StaggeredContainer
              className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center"
              staggerDelay={0.15}
            >
              {[
                { platform: "Capterra", rating: "4.6/5 Rating" },
                { platform: "Product Hunt", rating: "4.6/5 Rating" },
                { platform: "G2", rating: "4.4/5 Rating" },
                { platform: "Trustpilot", rating: "4.6/5 Rating" },
                { platform: "GetApp", rating: "4.7/5 Rating" }
              ].map((item) => (
                <motion.div
                  key={item.platform}
                  className="text-center space-y-2"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex justify-center space-x-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <motion.div
                        key={`${item.platform}-star-${i}`}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.rating}</p>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Trusted By Section */}
      <AnimatedSection direction="up" delay={0.3}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Trusted by 1,000+ Social Media Influencer
            </motion.h2>
            <StaggeredContainer
              className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60"
              staggerDelay={0.2}
            >
              {[
                { name: "YouTube", color: "text-red-600" },
                { name: "Instagram", color: "text-pink-600 italic" },
                { name: "TikTok", color: "text-black" },
                { name: "facebook", color: "text-blue-600" }
              ].map((platform) => (
                <motion.div
                  key={platform.name}
                  className="flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <span className={`text-2xl font-bold ${platform.color}`}>
                    {platform.name}
                  </span>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Giveaway Picker Section */}
      <AnimatedSection direction="scale" delay={0.2}>
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              className="text-5xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              Work smarter, not harder, with professional<br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% auto" }}
              >
                AI Comment Tools
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-16 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              AI Comments specializes in social media comment management, providing powerful AI-driven tools designed to enhance social media engagement and streamline cross-platform comment analysis and fan interaction workflows.
            </motion.p>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="https://ext.same-assets.com/3165006027/4061154993.webp"
                alt="Giveaway Tools"
                className="max-w-2xl w-full mx-auto"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Export Comments Section */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Get and Export All User Comments<br />
                from Social Media Platforms
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left" delay={0.3}>
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-gray-900">Get and Export Comments</h3>
                  <p className="text-gray-600 text-lg">A rich library of smart APIs for file-based data import</p>

                  <StaggeredContainer
                    className="space-y-4"
                    staggerDelay={0.1}
                  >
                    {[
                      "Get Comments On Social Media",
                      "Export Comments",
                      "CSV, Excel File Export",
                      "Send DMs To Followers"
                    ].map((text) => (
                      <motion.div
                        key={text}
                        className="flex items-center space-x-4"
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                        <span className="text-gray-800">{text}</span>
                      </motion.div>
                    ))}
                  </StaggeredContainer>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.5}>
                <motion.img
                  src="https://ext.same-assets.com/3165006027/1586800804.webp"
                  alt="Export Comments"
                  className="w-full rounded-lg"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Filter Section */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left" delay={0.3}>
                <motion.img
                  src="https://ext.same-assets.com/3165006027/1781150486.webp"
                  alt="Filter Accounts"
                  className="w-full rounded-lg"
                  whileHover={{ scale: 1.02, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.5}>
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-gray-900">Filter Low Quality Accounts</h3>
                  <p className="text-gray-600 text-lg">
                    Use Giveaway settings to filter low-quality accounts to help followers who really like you have a higher probability of winning.
                  </p>

                  <StaggeredContainer
                    className="space-y-4"
                    staggerDelay={0.1}
                  >
                    {[
                      "Filter Duplicate Comments",
                      "Filter By keywords and tags",
                      "Filter By Mentions/Tagged Friends",
                      "Comments Data Analysis"
                    ].map((text) => (
                      <motion.div
                        key={text}
                        className="flex items-center space-x-4"
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                        <span className="text-gray-800">{text}</span>
                      </motion.div>
                    ))}
                  </StaggeredContainer>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Built for Developers Section */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left" delay={0.3}>
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-gray-900">Built for developers</h3>
                  <p className="text-gray-600 text-lg">Multiple ways to notify your followers of winning results and enhance user engagement</p>

                  <StaggeredContainer
                    className="space-y-4"
                    staggerDelay={0.1}
                  >
                    {[
                      "Notification result generation",
                      "Comment area notification",
                      "Notice poster",
                      "Easy to share & display"
                    ].map((text) => (
                      <motion.div
                        key={text}
                        className="flex items-center space-x-4"
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                        <span className="text-gray-800">{text}</span>
                      </motion.div>
                    ))}
                  </StaggeredContainer>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.5}>
                <motion.img
                  src="https://ext.same-assets.com/3165006027/2150276889.webp"
                  alt="Developer Tools"
                  className="w-full rounded-lg"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection direction="scale" delay={0.2}>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              className="text-4xl font-bold text-center text-gray-900 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Loved by Many Social Media Influencer
            </motion.h2>

            <StaggeredContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {[
                {
                  name: "Lucas Emma",
                  handle: "@lucas_emma",
                  platform: "twitter",
                  text: "This product is amazing! It made selecting winners for our social media giveaways so easy. It's powerful, yet simple to use. Highly recommended!",
                  highlight: "social media giveaways"
                },
                {
                  name: "Mohammad Ghanbari",
                  handle: "",
                  platform: "pinterest",
                  text: "This product helped us effortlessly run our social media giveaways. The user experience is excellent, and it supports a variety of giveaway formats, making our campaigns more creative and engaging!",
                  highlight: "more creative and engaging"
                },
                {
                  name: "hemangi karkar",
                  handle: "@hemangi_karkar",
                  platform: "twitter",
                  text: "Using this product for our social media giveaways was convenient and quick, and the winners selected were absolutely fair. Thanks to this product, our campaigns were flawless!",
                  highlight: "absolutely fair"
                },
                {
                  name: "Naufal Hunaif",
                  handle: "@naufal_hunaif",
                  platform: "twitter",
                  text: "The interface of this product is elegant and intuitive, and its functionality is powerful and practical. Whether for giveaways or selecting winners, it's a breeze to use. Very satisfied with the experience!",
                  highlight: "powerful and practical"
                },
                {
                  name: "kamille ann",
                  handle: "@kamille_ann",
                  platform: "twitter",
                  text: "This is a fantastic product that greatly facilitated our social media giveaway campaigns. It supports various configuration, making our campaigns more flexible and fun!",
                  highlight: "various configuration"
                },
                {
                  name: "zamar khan",
                  handle: "",
                  platform: "pinterest",
                  text: "Running giveaway campaigns with this product is simple, and the winners selected are truly random. It ensures fairness and impartiality in our campaigns!",
                  highlight: "truly random"
                }
              ].map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card className="p-6 bg-white shadow-sm border border-gray-200 h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4 mb-4">
                        <motion.div
                          className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-gray-600 font-bold text-lg">{testimonial.name[0]}</span>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <motion.div
                              className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.2 }}
                            >
                              <span className="text-white text-xs">🐦</span>
                            </motion.div>
                          </div>
                          {testimonial.handle && (
                            <p className="text-gray-500 text-sm">{testimonial.handle}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {testimonial.text.split(testimonial.highlight).map((part, i, arr) => (
                          <span key={`${testimonial.name}-part-${i}`}>
                            {part}
                            {i < arr.length - 1 && (
                              <motion.span
                                className="bg-purple-100 text-purple-800 px-1 rounded"
                                whileHover={{ backgroundColor: "#e879f9" }}
                              >
                                {testimonial.highlight}
                              </motion.span>
                            )}
                          </span>
                        ))}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Got a question? We've got answers. If you have some other questions, see our support center.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "What is EasyComment?",
                    answer: "EasyComment is a comprehensive tool designed to simplify and enhance social media engagement by offering powerful giveaway picker tools. It helps users manage giveaways and contests efficiently across various platforms such as Instagram, Twitter, YouTube, and TikTok."
                  },
                  {
                    question: "Is EasyComment free to use?",
                    answer: "Yes, all tools on EasyComment are available at no cost. This includes tools for managing giveaways, contests, and boosting engagement across various social media platforms, all free of charge."
                  },
                  {
                    question: "Which social media platforms does EasyComment support?",
                    answer: "EasyComment supports a variety of popular social media platforms, including Instagram, Twitter, YouTube, TikTok, and Facebook."
                  },
                  {
                    question: "Do I need to register on EasyComment to use these tools?",
                    answer: "No, you do not need to register on EasyComment to use these tools. You can access and use the giveaway tools directly."
                  },
                  {
                    question: "How does EasyComment ensure fairness in the giveaway selection process?",
                    answer: "EasyComment ensures fairness in the giveaway selection process by using a random selection algorithm to choose winners from the comments that meet the specified criteria. So you can trust the results."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border border-gray-200 rounded-lg px-6 hover:border-purple-300 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline hover:text-purple-600 transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection direction="up" delay={0.2}>
        <footer className="bg-white border-t py-16">
          <div className="max-w-7xl mx-auto px-4">
            <StaggeredContainer
              className="grid md:grid-cols-4 gap-8 mb-12"
              staggerDelay={0.1}
            >
              {[
                {
                  title: null,
                  content: (
                    <div className="space-y-4">
                      <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <span className="font-bold text-lg text-gray-900">asyComment</span>
                      </motion.div>
                      <p className="text-gray-600 text-sm">
                        Discover the best random comment picker and instantly elevate interaction!
                      </p>
                    </div>
                  )
                },
                {
                  title: "Instagram Tools",
                  content: (
                    <ul className="space-y-2 text-sm text-gray-600">
                      {["Instagram Giveaway Picker", "Export Instagram Comments", "IG Follower Export Tool", "AI Carousel Generator"].map((item) => (
                        <motion.li
                          key={item}
                          whileHover={{ x: 5, color: "#3b82f6" }}
                          className="cursor-pointer transition-colors"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )
                },
                {
                  title: "Facebook Tools",
                  content: (
                    <ul className="space-y-2 text-sm text-gray-600">
                      {["Facebook Comment Picker", "Export Facebook Friends List", "Export Facebook Comments"].map((item) => (
                        <motion.li
                          key={item}
                          whileHover={{ x: 5, color: "#3b82f6" }}
                          className="cursor-pointer transition-colors"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )
                },
                {
                  title: "TikTok Tools",
                  content: (
                    <ul className="space-y-2 text-sm text-gray-600">
                      {["TikTok Comment Generator", "TikTok Comment Picker", "TikTok Video Downloader"].map((item) => (
                        <motion.li
                          key={item}
                          whileHover={{ x: 5, color: "#3b82f6" }}
                          className="cursor-pointer transition-colors"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  )
                }
              ].map((section) => (
                <div key={section.title || "logo"} className="space-y-4">
                  {section.title && (
                    <h4 className="font-semibold text-gray-900">{section.title}</h4>
                  )}
                  {section.content}
                </div>
              ))}
            </StaggeredContainer>

            <motion.div
              className="border-t pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-500 text-sm">
                Copyright 2023-2024 EASY COMMENT AI. All rights reserved.
              </p>
            </motion.div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  )
}
