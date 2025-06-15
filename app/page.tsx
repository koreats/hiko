"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  MotionDiv, 
  fadeInUp, 
  fadeIn, 
  scaleIn, 
  slideInLeft, 
  slideInRight,
  staggerContainer,
  staggerItem 
} from "@/components/ui/motion-div"
import { cn } from "@/lib/cn"
import { ShoppingCart, Smile, Users, Phone, Globe, HelpCircle, Heart, CheckCircle, Star, Menu, X, ArrowRight, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function HiKoLanding() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", consent: false })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.consent) {
      // Here you would integrate with Notion API
      console.log("Submitting to waiting list:", formData)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsFormOpen(false)
        setIsSubmitted(false)
        setFormData({ name: "", email: "", consent: false })
      }, 3000)
    }
  }

  const RegistrationForm = () => (
    <MotionDiv {...fadeInUp} className="space-y-4">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">HiKo 웨이팅 리스트 등록</h3>
            <p className="text-gray-600 mb-4">하이코의 최신 소식과 출시 정보를 가장 먼저 받아보세요!</p>
          </div>

          <Input
            placeholder="이름을 입력해주세요"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border-gray-200 focus:border-primary-500 focus:ring-primary-500"
          />

          <Input
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="border-gray-200 focus:border-primary-500 focus:ring-primary-500"
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              required
              className="data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600"
            />
            <label htmlFor="consent" className="text-sm text-gray-600">
              개인정보 수집 및 이용에 동의합니다.
              <a href="#" className="text-primary-600 hover:text-primary-700 ml-1 underline">
                개인정보 처리방침
              </a>
            </label>
          </div>

          <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all">
            등록하기
          </Button>
        </form>
      ) : (
        <MotionDiv {...scaleIn} className="text-center py-8">
          <MotionDiv
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-4xl mb-4"
          >
            🎉
          </MotionDiv>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">웨이팅 리스트 등록 완료!</h3>
          <p className="text-gray-600 mb-4">
            출시되면 가장 먼저 알려드릴게요. 가이드북은 입력하신 이메일로 발송될 예정입니다.
          </p>
          <Button variant="outline" onClick={() => window.open("#", "_blank")} className="border-primary-600 text-primary-600 hover:bg-primary-50">
            하이코 소셜 미디어 팔로우하기
          </Button>
        </MotionDiv>
      )}
    </MotionDiv>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Glassmorphism */}
      <MotionDiv
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="sticky top-0 z-50"
      >
        <GlassCard className="rounded-none border-x-0 border-t-0">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">HiKo</div>
              <span className="hidden sm:block text-sm text-gray-600">외국인을 위한 한국 생활 통합 플랫폼</span>
            </MotionDiv>

            <nav className="hidden md:flex items-center space-x-6">
              {["기능", "후기", "FAQ"].map((item, index) => (
                <MotionDiv
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <a 
                    href={`#${item === "기능" ? "features" : item === "후기" ? "testimonials" : "faq"}`} 
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {item}
                  </a>
                </MotionDiv>
              ))}
            </nav>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200/20 px-4 py-4 space-y-2"
            >
              {["기능", "후기", "FAQ"].map((item) => (
                <MotionDiv
                  key={item}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={`#${item === "기능" ? "features" : item === "후기" ? "testimonials" : "faq"}`} 
                    className="block text-gray-600 hover:text-primary-600 py-2"
                  >
                    {item}
                  </a>
                </MotionDiv>
              ))}
            </MotionDiv>
          )}
        </GlassCard>
      </MotionDiv>

      {/* Hero Section with Animations */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <MotionDiv 
            {...staggerContainer} 
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <MotionDiv {...staggerItem} className="space-y-8">
              <div className="space-y-4">
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    한국 생활, 이제 하이코와 함께라면
                    <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      문제없어요!
                    </span>
                  </h1>
                </MotionDiv>
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-xl text-gray-600 leading-relaxed">
                    실시간 핫딜, 문화 인사이트, 든든한 커뮤니티 지원까지! 현지인처럼 한국을 경험하세요.
                  </p>
                </MotionDiv>
              </div>

              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
                    >
                      무료 한국 생활 가이드북 받고 웨이팅 리스트 등록하기
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <RegistrationForm />
                  </DialogContent>
                </Dialog>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv {...slideInRight} className="relative">
              <MotionDiv
                animate={{ 
                  rotate: [0, 3, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="relative"
              >
                <GlassCard className="p-8 shadow-2xl">
                  <img
                    src="/placeholder.svg?height=400&width=300"
                    alt="다양한 국적의 외국인들이 한국에서 즐겁게 생활하는 모습"
                    className="w-full h-auto rounded-lg"
                  />
                  <MotionDiv
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    실시간 번역
                  </MotionDiv>
                </GlassCard>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* Problem/Solution Section with Animations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              한국 생활, 아직도 어렵게 느껴지시나요?
            </h2>
          </MotionDiv>

          <MotionDiv 
            {...staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { icon: Globe, title: "언어 장벽", desc: "한국어 때문에 정보 찾기가 어려우셨죠?", color: "red" },
              { icon: HelpCircle, title: "정보 비대칭", desc: "현지인만 아는 꿀팁을 놓치고 계신가요?", color: "orange" },
              { icon: Heart, title: "외로움", desc: "낯선 곳에서 혼자라는 느낌이 드나요?", color: "purple" }
            ].map((item, index) => (
              <MotionDiv
                key={item.title}
                {...staggerItem}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center space-y-4"
              >
                <MotionDiv
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto",
                    item.color === "red" && "bg-red-100",
                    item.color === "orange" && "bg-orange-100",
                    item.color === "purple" && "bg-purple-100"
                  )}
                >
                  <item.icon className={cn(
                    "w-8 h-8",
                    item.color === "red" && "text-red-600",
                    item.color === "orange" && "text-orange-600",
                    item.color === "purple" && "text-purple-600"
                  )} />
                </MotionDiv>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </MotionDiv>
            ))}
          </MotionDiv>

          <MotionDiv {...scaleIn} className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              하이코가 이 모든 어려움을 해결해 드립니다!
            </h3>
          </MotionDiv>
        </div>
      </section>

      {/* Key Features Section - Bento Grid Layout */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              하이코의 핵심 기능으로 한국 생활을 완벽하게!
            </h2>
          </MotionDiv>

          <MotionDiv 
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Large Feature Card */}
            <MotionDiv
              {...staggerItem}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 lg:row-span-2"
            >
              <GlassCard className="h-full p-8 hover:shadow-2xl transition-all group">
                <div className="space-y-6 h-full flex flex-col">
                  <div className="flex items-center space-x-4">
                    <MotionDiv
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center"
                    >
                      <ShoppingCart className="w-6 h-6 text-primary-600" />
                    </MotionDiv>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">한국인 커뮤니티 핫딜 & 꿀팁 번역</h3>
                      <Badge variant="secondary" className="mt-1 bg-primary-100 text-primary-700">
                        1순위 기능
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 flex-grow">현지인만 아는 핫딜과 꿀팁, 한국 유머까지 실시간 번역으로 놓치지 마세요!</p>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">데모 예시:</div>
                    <MotionDiv
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white p-3 rounded border-l-4 border-primary-500 shadow-sm group-hover:shadow-md transition-shadow"
                    >
                      <div className="text-sm font-medium">🔥 이마트 삼겹살 50% 할인!</div>
                      <div className="text-xs text-gray-500 mt-1">→ 🔥 E-Mart pork belly 50% discount!</div>
                    </MotionDiv>
                  </div>
                </div>
              </GlassCard>
            </MotionDiv>

            {/* Medium Feature Cards */}
            <MotionDiv
              {...staggerItem}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2"
            >
              <GlassCard className="h-full p-6 hover:shadow-2xl transition-all">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                      <Smile className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">한국 유머 & 문화적 차이 해설</h3>
                      <Badge variant="secondary" className="mt-1 bg-yellow-100 text-yellow-700">
                        문화 적응
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">한국인 유머를 쉽게 이해하고 한국 친구들과 더 자연스럽게 소통하세요.</p>
                </div>
              </GlassCard>
            </MotionDiv>

            {/* Small Feature Cards */}
            <MotionDiv
              {...staggerItem}
              whileHover={{ scale: 1.02 }}
            >
              <GlassCard className="h-full p-6 hover:shadow-2xl transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">국가별 자국민 커뮤니티</h3>
                  <p className="text-gray-600 text-sm">우리나라 사람들끼리 모여 정보 공유하고 외로움도 달래요.</p>
                </div>
              </GlassCard>
            </MotionDiv>

            <MotionDiv
              {...staggerItem}
              whileHover={{ scale: 1.02 }}
            >
              <GlassCard className="h-full p-6 hover:shadow-2xl transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">긴급 통역 서비스</h3>
                  <p className="text-gray-600 text-sm">병원, 관공서 등 긴급 상황에서 전문 통역사가 대신 말해드려요.</p>
                  <div className="text-sm text-green-600 font-medium">✨ 최초 3회 완전 무료</div>
                </div>
              </GlassCard>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* Value Proposition Section with Hover Effects */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-white">
        <div className="container mx-auto px-4">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              하이코가 당신의 한국 생활을 어떻게 변화시킬까요?
            </h2>
          </MotionDiv>

          <MotionDiv 
            {...staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { emoji: "💰", title: "경제적 이득", desc: "생활비 절약, 현지인처럼 알뜰하게!", color: "green" },
              { emoji: "🛡️", title: "생활 편의 및 안전", desc: "복잡한 한국 시스템, 이제 걱정 끝!", color: "blue" },
              { emoji: "🎭", title: "문화적 적응", desc: "한국 문화 속으로, 외로움 없이 즐겁게!", color: "purple" },
              { emoji: "🤝", title: "사회적 연결", desc: "새로운 친구, 새로운 기회를 만나세요!", color: "orange" }
            ].map((item) => (
              <MotionDiv
                key={item.title}
                {...staggerItem}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="text-center space-y-4">
                  <MotionDiv
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow",
                      item.color === "green" && "bg-gradient-to-br from-green-100 to-green-200",
                      item.color === "blue" && "bg-gradient-to-br from-blue-100 to-blue-200",
                      item.color === "purple" && "bg-gradient-to-br from-purple-100 to-purple-200",
                      item.color === "orange" && "bg-gradient-to-br from-orange-100 to-orange-200"
                    )}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                  </MotionDiv>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* Testimonials Section with Scroll Animation */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              하이코와 함께하는 외국인들의 생생한 이야기
            </h2>
          </MotionDiv>

          <MotionDiv 
            {...staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { name: "마리아", country: "베트남 유학생", review: "하이코 핫딜 덕분에 냉장고를 반값에 샀어요! 정말 감사해요." },
              { name: "리나", country: "베트남 유학생", review: "한국 유머를 이해하게 되면서 한국 친구들과 더 가까워졌어요!" },
              { name: "아미르", country: "파키스탄 근로자", review: "긴급 통역 서비스 덕분에 병원에서 정확한 진료를 받을 수 있었어요." }
            ].map((testimonial, index) => (
              <MotionDiv
                key={testimonial.name}
                {...staggerItem}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <GlassCard className="p-6 h-full hover:shadow-xl transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <MotionDiv
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                      >
                        <img src="/placeholder.svg?height=60&width=60" alt={testimonial.name} className="w-15 h-15 rounded-full border-2 border-primary-200" />
                      </MotionDiv>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.country}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <MotionDiv
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i + index * 0.2 }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </MotionDiv>
                      ))}
                    </div>
                    <p className="text-gray-600">{testimonial.review}</p>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* Lead Magnet Section with Gradient Animation */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 text-white relative overflow-hidden">
        <MotionDiv
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <MotionDiv 
            {...staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <MotionDiv {...slideInLeft} className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                지금 바로, '한국 생활 완전정복 가이드북'을 무료로 받으세요!
              </h2>

              <div className="space-y-3">
                {[
                  "필수 정착 정보 (비자, 주거, 통신, 금융)",
                  "건강 & 안전 (의료, 법률, 비상 대처)",
                  "한국 생활 즐기기 (쇼핑 핫딜, 맛집, 문화, 유머 해설)",
                  "하이코 플랫폼 활용 가이드"
                ].map((item, index) => (
                  <MotionDiv
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span>{item}</span>
                  </MotionDiv>
                ))}
              </div>

              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="secondary" 
                      className="text-lg px-8 py-6 bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl"
                    >
                      무료 한국 생활 가이드북 받고 웨이팅 리스트 등록하기
                      <ArrowRight className="ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <RegistrationForm />
                  </DialogContent>
                </Dialog>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv {...slideInRight} className="flex justify-center">
              <MotionDiv
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-2xl"
              >
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt="한국 생활 완전정복 가이드북"
                  className="w-full h-auto rounded-lg"
                />
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-gray-900">한국 생활 완전정복</h3>
                  <p className="text-gray-600">가이드북</p>
                </div>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* FAQ Section with Smooth Animations */}
      <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
          </MotionDiv>

          <MotionDiv {...fadeIn} className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "하이코는 어떤 언어를 지원하나요?",
                  answer: "현재 영어, 베트남어, 중국어, 일본어, 태국어 등 주요 언어를 지원하며, 출시 후 지속적으로 지원 언어를 확대할 예정입니다."
                },
                {
                  question: "핫딜 정보는 어떻게 제공되나요?",
                  answer: "한국의 주요 커뮤니티와 쇼핑몰의 핫딜 정보를 실시간으로 수집하여 AI 번역을 통해 여러 언어로 제공합니다. 푸시 알림으로도 받아보실 수 있어요."
                },
                {
                  question: "개인 정보는 안전하게 보호되나요?",
                  answer: "네, 개인정보보호법에 따라 엄격하게 관리되며, 수집된 정보는 서비스 제공 목적으로만 사용됩니다."
                },
                {
                  question: "앱은 언제 출시되나요?",
                  answer: "2024년 하반기 베타 버전 출시를 목표로 개발 중입니다. 웨이팅 리스트에 등록하시면 출시 소식을 가장 먼저 받아보실 수 있어요."
                }
              ].map((faq, index) => (
                <MotionDiv
                  key={`item-${index + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index + 1}`} className="bg-white rounded-lg px-6 border border-gray-200 hover:border-primary-300 transition-colors">
                    <AccordionTrigger className="text-left hover:text-primary-600 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </MotionDiv>
              ))}
            </Accordion>
          </MotionDiv>
        </div>
      </section>

      {/* Footer with Subtle Animations */}
      <footer className="bg-gray-900 text-white py-12">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-4 gap-8">
            <MotionDiv {...fadeInUp} transition={{ delay: 0.1 }}>
              <div className="space-y-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">HiKo</div>
                <p className="text-gray-400">외국인을 위한 한국 생활 통합 플랫폼</p>
              </div>
            </MotionDiv>

            <MotionDiv {...fadeInUp} transition={{ delay: 0.2 }}>
              <div className="space-y-4">
                <h4 className="font-semibold">서비스</h4>
                <div className="space-y-2 text-gray-400">
                  <div className="hover:text-white transition-colors cursor-pointer">핫딜 번역</div>
                  <div className="hover:text-white transition-colors cursor-pointer">문화 해설</div>
                  <div className="hover:text-white transition-colors cursor-pointer">커뮤니티</div>
                  <div className="hover:text-white transition-colors cursor-pointer">긴급 통역</div>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv {...fadeInUp} transition={{ delay: 0.3 }}>
              <div className="space-y-4">
                <h4 className="font-semibold">법적 고지</h4>
                <div className="space-y-2 text-gray-400">
                  <a href="#" className="hover:text-white transition-colors block">
                    이용 약관
                  </a>
                  <a href="#" className="hover:text-white transition-colors block">
                    개인정보 처리방침
                  </a>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv {...fadeInUp} transition={{ delay: 0.4 }}>
              <div className="space-y-4">
                <h4 className="font-semibold">연락처</h4>
                <div className="text-gray-400">
                  <p>contact@hiko.kr</p>
                </div>
                <div className="flex space-x-4">
                  {["Facebook", "Instagram", "YouTube"].map((social) => (
                    <MotionDiv
                      key={social}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {social}
                      </a>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            </MotionDiv>
          </div>

          <MotionDiv
            {...fadeIn}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 HiKo. All rights reserved.</p>
          </MotionDiv>
        </MotionDiv>
      </footer>
    </div>
  )
}