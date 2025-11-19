'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MedicalDisclaimerBanner } from '@/components/ui/medical-disclaimer-banner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  BookOpen, 
  Filter,
  ChevronRight,
  Users,
  Clock,
  Target,
  Brain,
  Heart,
  Stethoscope,
  Truck
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Chapter {
  id: number
  title: string
  description: string
  cardCount: number
  category: string
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  icon: any
  color: string
}

// All 45 EMT-B chapters with original titles - legally safe from copyright
const chapters: Chapter[] = [
  // Foundation Chapters
  { id: 1, title: "Emergency Medical Services Overview", description: "Introduction to EMS systems, history, roles, and professional responsibilities", cardCount: 15, category: "Foundation", difficulty: "Basic", estimatedTime: "10 min", icon: Truck, color: "from-blue-500 to-cyan-500" },
  { id: 2, title: "Personal Safety and Professional Wellness", description: "Personal protection, wellness strategies, stress management, and scene safety", cardCount: 15, category: "Safety", difficulty: "Basic", estimatedTime: "10 min", icon: Users, color: "from-green-500 to-emerald-500" },
  { id: 3, title: "Healthcare Law and Professional Ethics", description: "Scope of practice, consent, confidentiality, and legal considerations", cardCount: 15, category: "Legal", difficulty: "Intermediate", estimatedTime: "12 min", icon: BookOpen, color: "from-purple-500 to-violet-500" },
  { id: 4, title: "Emergency Communication Systems", description: "Radio communications, verbal reports, and patient care documentation", cardCount: 15, category: "Operations", difficulty: "Basic", estimatedTime: "10 min", icon: Target, color: "from-amber-500 to-orange-500" },
  { id: 5, title: "Healthcare Terminology Fundamentals", description: "Medical terminology, abbreviations, and healthcare language basics", cardCount: 15, category: "Foundation", difficulty: "Basic", estimatedTime: "12 min", icon: BookOpen, color: "from-indigo-500 to-purple-500" },

  // Anatomy & Physiology
  { id: 6, title: "Human Anatomy and Physiology", description: "Body structure, function, and organ systems overview", cardCount: 15, category: "Anatomy", difficulty: "Intermediate", estimatedTime: "15 min", icon: Brain, color: "from-pink-500 to-rose-500" },
  { id: 7, title: "Patient Development Across Age Groups", description: "Physical and psychological development considerations across lifespans", cardCount: 15, category: "Development", difficulty: "Basic", estimatedTime: "10 min", icon: Heart, color: "from-teal-500 to-cyan-500" },

  // Assessment & Documentation
  { id: 8, title: "Clinical Patient Evaluation", description: "Systematic patient assessment techniques and clinical decision making", cardCount: 15, category: "Assessment", difficulty: "Intermediate", estimatedTime: "15 min", icon: Stethoscope, color: "from-emerald-500 to-teal-500" },
  { id: 9, title: "Emergency Response Communications", description: "Field communication protocols and emergency response coordination", cardCount: 15, category: "Operations", difficulty: "Basic", estimatedTime: "8 min", icon: Target, color: "from-orange-500 to-red-500" },
  { id: 10, title: "Medical Record Documentation", description: "Patient care reporting and legal documentation requirements", cardCount: 15, category: "Documentation", difficulty: "Basic", estimatedTime: "10 min", icon: BookOpen, color: "from-slate-500 to-gray-500" },

  // Pharmacology
  { id: 11, title: "Basic Pharmacology Principles", description: "Drug actions, administration routes, and medication safety", cardCount: 15, category: "Pharmacology", difficulty: "Intermediate", estimatedTime: "12 min", icon: Heart, color: "from-red-500 to-pink-500" },
  { id: 12, title: "Emergency Drug Administration", description: "Common emergency medications and administration protocols", cardCount: 15, category: "Pharmacology", difficulty: "Advanced", estimatedTime: "15 min", icon: Heart, color: "from-rose-500 to-red-500" },

  // Basic Life Support
  { id: 13, title: "Basic Life Support Techniques", description: "CPR, AED use, and fundamental resuscitation skills", cardCount: 15, category: "BLS", difficulty: "Basic", estimatedTime: "12 min", icon: Heart, color: "from-red-600 to-orange-600" },
  { id: 14, title: "Airway Control and Management", description: "Airway assessment, opening techniques, and airway devices", cardCount: 15, category: "Airway", difficulty: "Intermediate", estimatedTime: "15 min", icon: Brain, color: "from-blue-600 to-indigo-600" },
  { id: 15, title: "Breathing Support and Ventilation", description: "Respiratory assessment and artificial ventilation techniques", cardCount: 15, category: "Respiratory", difficulty: "Intermediate", estimatedTime: "15 min", icon: Brain, color: "from-cyan-600 to-blue-600" },

  // Medical Emergencies
  { id: 16, title: "Heart and Circulation Emergencies", description: "Cardiac conditions, chest pain evaluation, and circulation problems", cardCount: 15, category: "Cardiac", difficulty: "Intermediate", estimatedTime: "18 min", icon: Heart, color: "from-red-500 to-rose-500" },
  { id: 17, title: "Breathing and Lung Emergencies", description: "Respiratory distress, lung conditions, and breathing difficulties", cardCount: 15, category: "Respiratory", difficulty: "Intermediate", estimatedTime: "16 min", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { id: 18, title: "Skin and Surface Wound Care", description: "Soft tissue injuries, wound assessment, and bleeding control", cardCount: 15, category: "Trauma", difficulty: "Basic", estimatedTime: "12 min", icon: Target, color: "from-orange-500 to-amber-500" },
  { id: 19, title: "Burn Injury Management", description: "Thermal, chemical, and electrical burn assessment and care", cardCount: 15, category: "Trauma", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-red-500 to-orange-500" },
  { id: 20, title: "Bone and Joint Injury Care", description: "Fractures, dislocations, and musculoskeletal trauma management", cardCount: 15, category: "Trauma", difficulty: "Intermediate", estimatedTime: "16 min", icon: Target, color: "from-purple-500 to-pink-500" },

  // Special Medical Conditions
  { id: 21, title: "Poisoning and Overdose Response", description: "Toxic exposures, poisoning recognition, and overdose management", cardCount: 15, category: "Toxicology", difficulty: "Advanced", estimatedTime: "15 min", icon: Heart, color: "from-yellow-500 to-orange-500" },
  { id: 22, title: "Mental Health Crisis Intervention", description: "Behavioral emergencies, psychiatric conditions, and crisis management", cardCount: 15, category: "Behavioral", difficulty: "Intermediate", estimatedTime: "14 min", icon: Brain, color: "from-indigo-500 to-purple-500" },
  { id: 23, title: "Women's Health Emergencies", description: "Gynecological conditions and women's health emergency care", cardCount: 15, category: "Women's Health", difficulty: "Intermediate", estimatedTime: "12 min", icon: Heart, color: "from-pink-500 to-purple-500" },
  { id: 24, title: "Childbirth and Newborn Care", description: "Emergency delivery procedures and immediate newborn care", cardCount: 15, category: "Obstetrics", difficulty: "Advanced", estimatedTime: "18 min", icon: Heart, color: "from-rose-500 to-pink-500" },
  { id: 25, title: "Infant Emergency Care", description: "Neonatal assessment, resuscitation, and specialized infant care", cardCount: 15, category: "Neonatal", difficulty: "Advanced", estimatedTime: "16 min", icon: Heart, color: "from-blue-400 to-cyan-400" },

  // Age-Specific Care
  { id: 26, title: "Child Patient Care", description: "Pediatric assessment, age-specific considerations, and family interaction", cardCount: 15, category: "Pediatric", difficulty: "Intermediate", estimatedTime: "15 min", icon: Heart, color: "from-green-400 to-emerald-400" },
  { id: 27, title: "Elderly Patient Considerations", description: "Geriatric assessment, age-related changes, and special considerations", cardCount: 15, category: "Geriatric", difficulty: "Intermediate", estimatedTime: "14 min", icon: Users, color: "from-slate-400 to-gray-400" },

  // Trauma Specialties
  { id: 28, title: "Head and Spinal Injury Management", description: "Neurological trauma assessment and spinal immobilization techniques", cardCount: 15, category: "Neuro Trauma", difficulty: "Advanced", estimatedTime: "20 min", icon: Brain, color: "from-red-600 to-rose-600" },
  { id: 29, title: "Chest Injury Assessment", description: "Thoracic trauma recognition and emergency chest injury management", cardCount: 15, category: "Chest Trauma", difficulty: "Advanced", estimatedTime: "18 min", icon: Target, color: "from-blue-600 to-indigo-600" },
  { id: 30, title: "Abdominal Injury Evaluation", description: "Abdominal trauma assessment and emergency care protocols", cardCount: 15, category: "Abdominal Trauma", difficulty: "Advanced", estimatedTime: "16 min", icon: Target, color: "from-purple-600 to-violet-600" },
  { id: 31, title: "Bone Fracture and Dislocation Care", description: "Orthopedic injury recognition, splinting, and immobilization", cardCount: 15, category: "Orthopedic", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-amber-600 to-orange-600" },

  // Environmental & Special Situations
  { id: 32, title: "Weather and Environmental Hazards", description: "Temperature extremes, environmental illness, and outdoor emergencies", cardCount: 15, category: "Environmental", difficulty: "Intermediate", estimatedTime: "12 min", icon: Target, color: "from-green-600 to-teal-600" },
  { id: 33, title: "Blood Sugar and Hormone Crises", description: "Diabetic emergencies and endocrine system disorders", cardCount: 15, category: "Endocrine", difficulty: "Intermediate", estimatedTime: "14 min", icon: Heart, color: "from-yellow-600 to-amber-600" },
  { id: 34, title: "Blood Disorder Emergencies", description: "Hematological conditions and blood-related emergency care", cardCount: 15, category: "Hematology", difficulty: "Advanced", estimatedTime: "15 min", icon: Heart, color: "from-red-700 to-rose-700" },
  { id: 35, title: "Kidney and Urinary Emergencies", description: "Renal conditions and genitourinary emergency management", cardCount: 15, category: "Genitourinary", difficulty: "Intermediate", estimatedTime: "12 min", icon: Target, color: "from-blue-400 to-cyan-400" },
  { id: 36, title: "Chemical Exposure Response", description: "Toxicological emergencies and hazardous substance exposure care", cardCount: 15, category: "Toxicology", difficulty: "Advanced", estimatedTime: "16 min", icon: Target, color: "from-orange-700 to-red-700" },

  // Operations & Systems
  { id: 37, title: "Trauma Care System Operations", description: "Trauma system organization and coordinated patient care", cardCount: 15, category: "Trauma Systems", difficulty: "Intermediate", estimatedTime: "12 min", icon: Truck, color: "from-slate-600 to-gray-600" },
  { id: 38, title: "Vehicle Rescue Operations", description: "Auto extrication, rescue techniques, and vehicle emergency response", cardCount: 15, category: "Rescue", difficulty: "Advanced", estimatedTime: "18 min", icon: Truck, color: "from-red-500 to-orange-500" },
  { id: 39, title: "Emergency Scene Management", description: "Incident command, scene safety, and emergency operations coordination", cardCount: 15, category: "Operations", difficulty: "Intermediate", estimatedTime: "14 min", icon: Target, color: "from-indigo-600 to-purple-600" },
  { id: 40, title: "Public Safety Threat Response", description: "Security threats, terrorism response, and tactical emergency medicine", cardCount: 15, category: "Security", difficulty: "Advanced", estimatedTime: "16 min", icon: Target, color: "from-gray-600 to-slate-600" },
  { id: 41, title: "Mass Casualty Event Management", description: "Disaster response, triage systems, and large-scale emergency management", cardCount: 15, category: "Disaster", difficulty: "Advanced", estimatedTime: "18 min", icon: Truck, color: "from-orange-600 to-red-600" },
  { id: 42, title: "Law Enforcement Scene Safety", description: "Crime scene operations, evidence preservation, and officer safety", cardCount: 15, category: "Law Enforcement", difficulty: "Intermediate", estimatedTime: "12 min", icon: Users, color: "from-blue-700 to-indigo-700" },
  { id: 43, title: "Dangerous Material Response", description: "Hazmat identification, decontamination, and chemical emergency response", cardCount: 15, category: "Hazmat", difficulty: "Advanced", estimatedTime: "16 min", icon: Target, color: "from-yellow-700 to-orange-700" },
  { id: 44, title: "Multi-Patient Incident Operations", description: "Multiple casualty incidents, resource management, and coordinated response", cardCount: 15, category: "MCI", difficulty: "Advanced", estimatedTime: "18 min", icon: Truck, color: "from-purple-700 to-violet-700" },
  { id: 45, title: "Helicopter Medical Transport", description: "Air medical operations, flight safety, and aeromedical considerations", cardCount: 15, category: "Air Medical", difficulty: "Advanced", estimatedTime: "14 min", icon: Truck, color: "from-cyan-700 to-blue-700" }
]

const categories = [
  "All", "Foundation", "Safety", "Legal", "Operations", "Anatomy", "Development", 
  "Assessment", "Documentation", "Pharmacology", "BLS", "Airway", "Respiratory", 
  "Cardiac", "Trauma", "Toxicology", "Behavioral", "Women's Health", "Obstetrics", 
  "Neonatal", "Pediatric", "Geriatric", "Neuro Trauma", "Chest Trauma", 
  "Abdominal Trauma", "Orthopedic", "Environmental", "Endocrine", "Hematology", 
  "Genitourinary", "Trauma Systems", "Rescue", "Security", "Disaster", 
  "Law Enforcement", "Hazmat", "MCI", "Air Medical"
]
const difficulties = ["All", "Basic", "Intermediate", "Advanced"]

export default function BrowsePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [filteredChapters, setFilteredChapters] = useState(chapters)

  useEffect(() => {
    let filtered = chapters

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(chapter => chapter.category === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(chapter => chapter.difficulty === selectedDifficulty)
    }

    setFilteredChapters(filtered)
  }, [searchTerm, selectedCategory, selectedDifficulty])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-400/10 text-green-300 border-green-400/30'
      case 'Intermediate': return 'bg-amber-400/10 text-amber-300 border-amber-400/30'
      case 'Advanced': return 'bg-red-400/10 text-red-300 border-red-400/30'
      default: return 'bg-gray-400/10 text-gray-300 border-gray-400/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Medical Disclaimer */}
        <MedicalDisclaimerBanner variant="compact" className="mb-8 rounded-xl" />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <BookOpen className="h-3 w-3" />
            <span className="text-primary">Browse Content</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
            EMT-B Study Content
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of EMT-B study materials organized by chapters and topics. 
            Find the content that matches your learning needs.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search chapters, topics, or descriptions..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedDifficulty}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDifficulty(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty} className="bg-slate-800 text-white">
                      {difficulty === 'All' ? 'All Levels' : difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredChapters.length} of {chapters.length} chapters
            </div>
          </CardContent>
        </Card>

        {/* Chapter Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChapters.map((chapter) => {
            const IconComponent = chapter.icon
            
            return (
              <Card 
                key={chapter.id} 
                className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/study?chapterId=${chapter.id}`)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "p-3 rounded-xl bg-gradient-to-r",
                      chapter.color.replace('from-', 'from-').replace(' to-', '/20 to-') + '/20'
                    )}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={getDifficultyColor(chapter.difficulty)}>
                      {chapter.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    Chapter {chapter.id}: {chapter.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {chapter.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{chapter.cardCount} cards</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{chapter.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/10 border-white/20 text-xs">
                      {chapter.category}
                    </Badge>
                    
                    <Button 
                      size="sm" 
                      className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/study?chapterId=${chapter.id}`)
                      }}
                    >
                      Study
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredChapters.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="p-4 rounded-2xl bg-muted/20 mx-auto mb-6 w-fit">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find the content you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedDifficulty('All')
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}