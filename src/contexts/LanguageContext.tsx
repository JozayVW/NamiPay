'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { I18nService, SupportedLanguage, LanguageConfig } from '@/lib/i18n'

interface LanguageContextType {
  currentLanguage: SupportedLanguage
  languages: LanguageConfig[]
  t: (key: string, fallback?: string) => string
  formatCurrency: (amount: number) => string
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string
  formatNumber: (number: number) => string
  setLanguage: (language: SupportedLanguage) => void
  detectLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Detect language on mount
    const savedLanguage = localStorage.getItem('namipay-language') as SupportedLanguage
    if (savedLanguage && I18nService.getSupportedLanguages().find(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      detectLanguage()
    }
  }, [])

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language)
    I18nService.setLanguage(language)
    if (mounted) {
      localStorage.setItem('namipay-language', language)
    }
  }

  const detectLanguage = () => {
    const detected = I18nService.detectLanguage()
    setLanguage(detected)
  }

  const t = (key: string, fallback?: string) => {
    return I18nService.t(key, fallback)
  }

  const formatCurrency = (amount: number) => {
    return I18nService.formatCurrency(amount)
  }

  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    return I18nService.formatDate(date, options)
  }

  const formatNumber = (number: number) => {
    return I18nService.formatNumber(number)
  }

  const value: LanguageContextType = {
    currentLanguage,
    languages: I18nService.getSupportedLanguages(),
    t,
    formatCurrency,
    formatDate,
    formatNumber,
    setLanguage,
    detectLanguage
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
