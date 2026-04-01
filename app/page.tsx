'use client'

import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Zap,
  Users,
  TrendingUp,
  Shield,
  Heart,
  GraduationCap,
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Phone,
  Mail,
  Check,
  Building2,
  Factory,
  Flame,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Target,
  Award,
  CircuitBoard,
  Wrench,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'job'
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('loading')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormMessage(data.message)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          type: 'job'
        })
      } else {
        setFormStatus('error')
        setFormMessage(data.error || 'Произошла ошибка')
      }
    } catch (error) {
      setFormStatus('error')
      setFormMessage('Не удалось отправить заявку')
    }

    setTimeout(() => {
      setFormStatus('idle')
      setFormMessage('')
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-accent p-1.5 md:p-2 rounded-lg">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ТГК-1</h1>
                <p className="text-[10px] md:text-xs text-muted-foreground">Энергия Северо-Запада</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">О компании</a>
              <a href="#services" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Услуги</a>
              <a href="#careers" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Карьера</a>
              <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Контакты</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <a 
                href="#about" 
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 px-3 hover:bg-muted rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                О компании
              </a>
              <a 
                href="#services" 
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 px-3 hover:bg-muted rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Услуги
              </a>
              <a 
                href="#careers" 
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 px-3 hover:bg-muted rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Карьера
              </a>
              <a 
                href="#contact" 
                className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2 px-3 hover:bg-muted rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Контакты
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 md:mb-6 px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium border border-primary/20 bg-primary/10 text-foreground">
              <Sparkles className="h-3 w-3 mr-1.5 md:mr-2 inline" />
              С 1897 года — энергия для Северо-Запада России
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-balance bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent leading-tight px-2">
              Энергия, которая движет регион
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto text-pretty px-2">
              Крупнейший производитель электрической и тепловой энергии на Северо-Западе. 
              40 ГЭС и 12 ТЭЦ обеспечивают надёжное энергоснабжение миллионов людей.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-10 md:mb-16 px-4">
              <Button 
                size="lg" 
                className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity w-full sm:w-auto" 
                onClick={() => document.getElementById('how-to-connect')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Подключить услуги
                <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 border-2 bg-transparent w-full sm:w-auto" 
                onClick={() => document.getElementById('careers')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Вакансии
                <Briefcase className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto px-2">
              <div className="bg-card border rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 md:mb-2">40</div>
                <div className="text-xs md:text-sm text-muted-foreground">Гидроэлектростанций</div>
              </div>
              <div className="bg-card border rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 md:mb-2">12</div>
                <div className="text-xs md:text-sm text-muted-foreground">Теплоэлектроцентралей</div>
              </div>
              <div className="bg-card border rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 md:mb-2">~7</div>
                <div className="text-xs md:text-sm text-muted-foreground">ГВт мощности</div>
              </div>
              <div className="bg-card border rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 md:mb-2">50%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Доля рынка в СПб</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section id="about" className="py-12 md:py-20 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <Badge variant="outline" className="mb-3 md:mb-4 text-xs md:text-sm">О компании</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance px-2">Что такое ТГК-1</h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty px-2">
                Это территориальная генерирующая компания №1, часть крупнейшего энергохолдинга России
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
              <Card className="border-2">
                <CardHeader className="p-4 md:p-6">
                  <Factory className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
                  <CardTitle className="text-xl md:text-2xl">Чем занимается компания</CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    Компания производит электрическую и тепловую энергию для населения и предприятий Санкт-Петербурга, 
                    Республики Карелия и Мурманской области. Её станции работают круглосуточно, 
                    обеспечивая бесперебойное энергоснабжение более 3 миллионов жителей региона.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader className="p-4 md:p-6">
                  <Lightbulb className="h-10 w-10 md:h-12 md:w-12 text-accent mb-3 md:mb-4" />
                  <CardTitle className="text-xl md:text-2xl">Миссия компании</CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    Обеспечить надёжное, доступное и экологичное энергоснабжение Северо-Западного региона. 
                    Компания инвестирует в модернизацию оборудования, развивает возобновляемую энергетику 
                    и создаёт комфортные условия для своих сотрудников.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2">
              <CardContent className="p-4 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                  <div className="bg-primary/10 p-2.5 md:p-3 rounded-xl">
                    <Award className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Почему ТГК-1 важна для региона</h3>
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                      <div className="flex items-start gap-2 md:gap-3">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">Обеспечивает 50% тепла в Санкт-Петербурге</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">100% теплоснабжение Петрозаводска, Апатитов, Кировска</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">40% энергии из возобновляемых источников (ГЭС)</span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">Входит в первую десятку крупнейших генерирующих компаний РФ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <Badge variant="outline" className="mb-3 md:mb-4 text-xs md:text-sm">Услуги</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance px-2">Услуги компании</h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty px-2">
                Полный спектр энергетических услуг для физических и юридических лиц
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <Card className="group hover:shadow-xl transition-all hover:border-primary/50">
                <CardHeader className="p-4 md:p-6">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-2.5 md:p-3 rounded-xl w-fit mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <Lightbulb className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Электроэнергия</CardTitle>
                  <CardDescription className="leading-relaxed text-sm md:text-base">
                    Производство электроэнергии на 40 ГЭС и 12 ТЭЦ общей мощностью около 6 900 МВт. 
                    Надёжное электроснабжение промышленных предприятий и населения.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                      <span>Круглосуточная диспетчеризация</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                      <span>Экологичная гидрогенерация (40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                      <span>Газовые ТЭЦ нового поколения</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all hover:border-accent/50">
                <CardHeader className="p-4 md:p-6">
                  <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-2.5 md:p-3 rounded-xl w-fit mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <Flame className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Теплоснабжение</CardTitle>
                  <CardDescription className="leading-relaxed text-sm md:text-base">
                    Отопление и горячее водоснабжение для миллионов жителей. 50% рынка тепла в Санкт-Петербурге, 
                    72% в Мурманске, 100% в Петрозаводске.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent flex-shrink-0" />
                      <span>Бесперебойная подача тепла</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent flex-shrink-0" />
                      <span>Современная инфраструктура</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent flex-shrink-0" />
                      <span>Комбинированная выработка</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all hover:border-secondary/50">
                <CardHeader className="p-4 md:p-6">
                  <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-2.5 md:p-3 rounded-xl w-fit mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <CircuitBoard className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Технологическое присоединение</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Подключение новых потребителей к электрическим и тепловым сетям. 
                    Полное сопровождение от заявки до ввода в эксплуатацию.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>Консультация специалистов</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>Прозрачные условия</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>Быстрое подключение</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Хотите подключиться к услугам?</h3>
                    <p className="text-primary-foreground/90 text-lg">
                      Оставьте заявку, и специалисты компании свяжутся с вами для консультации
                    </p>
                  </div>
                  <Button size="lg" variant="secondary" className="flex-shrink-0" onClick={() => document.getElementById('how-to-connect')?.scrollIntoView({ behavior: 'smooth' })}>
                    Подключиться
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Карьера</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Работа в ТГК-1</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Присоединяйтесь к команде профессионалов. Стабильная работа, достойная зарплата, развитие и карьерный рост
              </p>
            </div>

            {/* Why Work With Us */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Достойная оплата</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Зарплата от 60 000 до 110 000 ₽ в зависимости от специальности. Белая зарплата, 
                    премии, 13-я зарплата, надбавки за выслугу лет.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Полный соцпакет</CardTitle>
                  <CardDescription className="leading-relaxed">
                    ДМС для сотрудника и семьи, санаторно-курортное лечение, материальная помощь, 
                    компенсация питания и проезда.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Обучение и рост</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Бесплатное обучение и повышение квалификации, наставничество, 
                    корпоративный университет, карьерный рост.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Popular Vacancies */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Популярные вакансии</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Машинист турбин', salary: '80 000 – 110 000 ₽', location: 'Санкт-Петербург' },
                  { title: 'Слесарь КИПиА', salary: '70 000 – 95 000 ₽', location: 'Мурманск' },
                  { title: 'Электромонтёр', salary: '65 000 – 90 000 ₽', location: 'Петрозаводск' },
                  { title: 'Оператор котельной', salary: '70 000 – 100 000 ₽', location: 'Санкт-Петербург' },
                ].map((vacancy, idx) => (
                  <Card key={idx} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{vacancy.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {vacancy.location}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-sm font-semibold">
                          {vacancy.salary}
                        </Badge>
                      </div>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Полная занятость
                        </span>
                        <span>•</span>
                        <span>Официальное трудоустройство</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How to Apply */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">Как устроиться на работу</CardTitle>
                <CardDescription className="text-base">
                  Процесс трудоустройства в ТГК-1 прост и прозрачен
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-3">1</div>
                    <h4 className="font-semibold mb-2">Заявка</h4>
                    <p className="text-sm text-muted-foreground">Заполните форму обратной связи или отправьте резюме</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-3">2</div>
                    <h4 className="font-semibold mb-2">Собеседование</h4>
                    <p className="text-sm text-muted-foreground">Встреча с HR и руководителем подразделения</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-3">3</div>
                    <h4 className="font-semibold mb-2">Медосмотр</h4>
                    <p className="text-sm text-muted-foreground">Обязательный медицинский осмотр за счет компании</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-3">4</div>
                    <h4 className="font-semibold mb-2">Выход на работу</h4>
                    <p className="text-sm text-muted-foreground">Оформление документов и адаптация на рабочем месте</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits for Customers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Для потребителей</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Почему выбирают ТГК-1</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Надёжность, проверенная временем. Современные технологии. Забота о клиентах.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Надёжность 24/7</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Бесперебойное энергоснабжение круглый год. Круглосуточная диспетчерская служба 
                    и оперативное устранение аварий.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Экологичность</CardTitle>
                  <CardDescription className="leading-relaxed">
                    40% энергии из возобновляемых источников (ГЭС). Современные газовые ТЭЦ 
                    с минимальными выбросами.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Модернизация</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Постоянное обновление оборудования. Внедрение цифровых технологий управления. 
                    Повышение эффективности.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Поддержка клиентов</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Личный кабинет для управления услугами. Мобильное приложение. 
                    Консультации специалистов.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Building2 className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Масштаб</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Крупнейшая генерирующая компания Северо-Запада. Часть энергохолдинга ПАО "Газпром энергохолдинг".
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Wrench className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Прозрачность</CardTitle>
                  <CardDescription className="leading-relaxed">
                    Регулируемые государством тарифы. Понятные условия подключения. 
                    Открытая информация о плановых работах.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* How to Connect */}
            <Card className="mt-12 bg-card">
              <CardHeader>
                <CardTitle className="text-2xl">Как подключиться к услугам ТГК-1</CardTitle>
                <CardDescription className="text-base">
                  Простой процесс подключения для физических и юридических лиц
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="bg-accent/10 text-accent w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
                    <h4 className="font-semibold mb-2 text-lg">Заявка</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Подайте заявку на технологическое присоединение через личный кабинет, 
                      офис обслуживания или онлайн-форму на сайте
                    </p>
                  </div>
                  <div>
                    <div className="bg-accent/10 text-accent w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
                    <h4 className="font-semibold mb-2 text-lg">Согласование</h4>
                    <p className="text-muted-foreground leading-relaxed">
Специалисты компании рассмотрят заявку, проведут технический осмотр, 
                    рассчитают стоимость и подготовят договор
                    </p>
                  </div>
                  <div>
                    <div className="bg-accent/10 text-accent w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
                    <h4 className="font-semibold mb-2 text-lg">Подключение</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Выполним технологическое присоединение, установим приборы учета 
                      и введем объект в эксплуатацию
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Connect */}
      <section id="how-to-connect" className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Инструкция</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Как подключиться к услугам ТГК-1</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Простые шаги для подключения электричества и теплоснабжения
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <CardTitle>Подготовьте документы</CardTitle>
                  <CardDescription className="leading-relaxed space-y-2">
                    <div className="flex items-start gap-2 mt-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Паспорт или документы юр. лица</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Правоустанавливающие документы на объект</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>План расположения объекта</span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <CardTitle>Подайте заявку</CardTitle>
                  <CardDescription className="leading-relaxed space-y-2">
                    <div className="flex items-start gap-2 mt-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Позвоните по телефону +7 (812) 688-36-06</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Заполните форму на сайте ниже</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Посетите офис обслуживания клиентов</span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <CardTitle>Получите подключение</CardTitle>
                  <CardDescription className="leading-relaxed space-y-2">
                    <div className="flex items-start gap-2 mt-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Согласование технических условий</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Заключение договора</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Подключение и ввод в эксплуатацию</span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Важная информация</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Подключение электроэнергии
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Срок рассмотрения заявки: 15 дней</li>
                      <li>• Срок подключения: от 4 месяцев</li>
                      <li>• Льготные условия для мощности до 15 кВт</li>
                      <li>• Онлайн-отслеживание статуса заявки</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Flame className="h-5 w-5 text-accent" />
                      Подключение теплоснабжения
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Срок рассмотрения заявки: 30 дней</li>
                      <li>• Срок подключения: от 6 месяцев</li>
                      <li>• Требуется проект теплоснабжения</li>
                      <li>• Бесплатная консультация инженера</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge variant="outline" className="mb-3 md:mb-4 text-xs md:text-sm">Обратная связь</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance px-2">Форма обратной связи</h2>
              <p className="text-base md:text-xl text-muted-foreground text-pretty px-2">
                Есть вопросы? Хотите работать в ТГК-1 или подключиться к услугам? Напишите!
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="p-4 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input 
                        id="name" 
                        placeholder="Иван Иванов" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="ivan@example.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 123-45-67" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm md:text-base">Тип обращения *</Label>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <label className="flex items-center gap-2 cursor-pointer py-2 sm:py-0">
                        <input 
                          type="radio" 
                          name="type" 
                          value="job" 
                          checked={formData.type === 'job'}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm md:text-base">Трудоустройство</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer py-2 sm:py-0">
                        <input 
                          type="radio" 
                          name="type" 
                          value="service" 
                          checked={formData.type === 'service'}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-sm md:text-base">Подключение услуг</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm md:text-base">Сообщение *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о себе или опишите ваш вопрос..." 
                      className="min-h-32 md:min-h-40 text-sm md:text-base" 
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {formMessage && (
                    <div className={`p-3 md:p-4 rounded-lg text-sm md:text-base ${
                      formStatus === 'success' 
                        ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-600 border border-red-500/20'
                    }`}>
                      {formMessage}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-accent text-sm md:text-base py-5 md:py-6"
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? 'Отправка...' : 'Отправить заявку'}
                  </Button>

                  <p className="text-xs md:text-sm text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 md:mb-3" />
                  <h4 className="font-semibold mb-1.5 md:mb-2 text-sm md:text-base">Телефон</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">+7 (812) 688-36-06</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Единая справочная служба</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <Mail className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 md:mb-3" />
                  <h4 className="font-semibold mb-1.5 md:mb-2 text-sm md:text-base">Email</h4>
                  <p className="text-xs md:text-sm text-muted-foreground break-all">ivanivanit64@gmail.com</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Ответим в течение дня</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6 text-center">
                  <MapPin className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 md:mb-3" />
                  <h4 className="font-semibold mb-1.5 md:mb-2 text-sm md:text-base">Офис</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">Санкт-Петербург</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Пн-Пт 9:00-18:00</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="sm:col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="bg-gradient-to-br from-primary to-accent p-1.5 md:p-2 rounded-lg">
                    <Zap className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-lg md:text-base bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ТГК-1</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Крупнейший производитель электрической и тепловой энергии на Северо-Западе России
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Услуги</h4>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li><a href="#services" className="hover:text-primary transition-colors">Электроэнергия</a></li>
                  <li><a href="#services" className="hover:text-primary transition-colors">Теплоснабжение</a></li>
                  <li><a href="#how-to-connect" className="hover:text-primary transition-colors">Технологическое присоединение</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Компания</h4>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li><a href="#about" className="hover:text-primary transition-colors">О компании</a></li>
                  <li><a href="#careers" className="hover:text-primary transition-colors">Карьера</a></li>
                  <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Контакты</h4>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li>Телефон: +7 (812) 688-36-06</li>
                  <li className="break-all">Email: ivanivanit64@gmail.com</li>
                  <li>Санкт-Петербург</li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-8 text-center text-sm text-muted-foreground">
              <p>© 2026 ПАО "ТГК-1". Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
