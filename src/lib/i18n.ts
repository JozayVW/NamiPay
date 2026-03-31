export type SupportedLanguage = 'en' | 'af' | 'oj' | 'otj' | 'dam' | 'loz' | 'ru' | 'ts'

export interface Translation {
  [key: string]: string | Translation
}

export interface LanguageConfig {
  code: SupportedLanguage
  name: string
  nativeName: string
  flag: string
  rtl: boolean
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', rtl: false },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', rtl: false },
  { code: 'oj', name: 'Oshiwambo', nativeName: 'Oshiwambo', flag: '🇳🇦', rtl: false },
  { code: 'otj', name: 'Otjiherero', nativeName: 'Otjiherero', flag: '🇳🇦', rtl: false },
  { code: 'dam', name: 'Damara/Nama', nativeName: 'Khoekhoegowab', flag: '🇳🇦', rtl: false },
  { code: 'loz', name: 'Lozi', nativeName: 'Silozi', flag: '🇳🇦', rtl: false },
  { code: 'ru', name: 'Rukwangali', nativeName: 'Rukwangali', flag: '🇳🇦', rtl: false },
  { code: 'ts', name: 'Setswana', nativeName: 'Setswana', flag: '🇳🇦', rtl: false }
]

export const TRANSLATIONS: Record<SupportedLanguage, Translation> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.employees': 'Employees',
    'nav.payroll': 'Payroll',
    'nav.leave': 'Leave Management',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.totalEmployees': 'Total Employees',
    'dashboard.monthlyPayroll': 'Monthly Payroll',
    'dashboard.activePeriod': 'Active Period',
    'dashboard.compliance': 'Compliance',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.aiInsights': 'AI Insights',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Payroll
    'payroll.grossPay': 'Gross Pay',
    'payroll.netPay': 'Net Pay',
    'payroll.basicSalary': 'Basic Salary',
    'payroll.overtime': 'Overtime',
    'payroll.allowances': 'Allowances',
    'payroll.deductions': 'Deductions',
    'payroll.tax': 'PAYE Tax',
    'payroll.ssc': 'SSC',
    'payroll.nhe': 'NHE',
    'payroll.runPayroll': 'Run Payroll',
    'payroll.approve': 'Approve',
    'payroll.finalize': 'Finalize',
    
    // Leave
    'leave.annualLeave': 'Annual Leave',
    'leave.sickLeave': 'Sick Leave',
    'leave.familyLeave': 'Family Responsibility Leave',
    'leave.apply': 'Apply for Leave',
    'leave.balance': 'Leave Balance',
    'leave.history': 'Leave History',
    'leave.approved': 'Approved',
    'leave.pending': 'Pending',
    'leave.rejected': 'Rejected',
    'leave.days': 'days',
    
    // Self-Service
    'selfservice.welcome': 'Welcome to Employee Portal',
    'selfservice.payslip': 'Payslip',
    'selfservice.viewPayslip': 'View Payslip',
    'selfservice.downloadPDF': 'Download PDF',
    'selfservice.sendWhatsApp': 'Send via WhatsApp',
    'selfservice.employeeId': 'Employee ID',
    'selfservice.department': 'Department',
    'selfservice.jobTitle': 'Job Title',
    
    // WhatsApp
    'whatsapp.welcome': 'Welcome to NamiPay AI',
    'whatsapp.payslipReady': 'Your payslip is ready',
    'whatsapp.netPay': 'Net Pay',
    'whatsapp.period': 'Period',
    'whatsapp.viewDetails': 'View Full Payslip',
    'whatsapp.secureAccess': 'Secure Access',
    'whatsapp.replyMenu': 'Reply with:',
    'whatsapp.menu': 'MENU',
    'whatsapp.details': 'DETAILS',
    'whatsapp.balance': 'BALANCE',
    'whatsapp.help': 'HELP',
    
    // Errors
    'error.unauthorized': 'Unauthorized access',
    'error.notFound': 'Not found',
    'error.serverError': 'Server error',
    'error.networkError': 'Network error',
    'error.validation': 'Validation error',
    
    // Success messages
    'success.saved': 'Saved successfully',
    'success.deleted': 'Deleted successfully',
    'success.updated': 'Updated successfully',
    'success.payrollProcessed': 'Payroll processed successfully',
    'success.leaveApplied': 'Leave application submitted',
    
    // NAMRA Compliance
    'namira.compliant': 'Compliant',
    'namira.nonCompliant': 'Non-Compliant',
    'namira.taxCertificate': 'Tax Certificate',
    'namira.ita34': 'ITA34 Certificate',
    'namira.scc': 'Social Security Commission',
    'namira.nhe': 'National Housing Enterprise',
    
    // AI Insights
    'ai.anomalyDetected': 'Anomaly Detected',
    'ai.overtimeAlert': 'Overtime Alert',
    'ai.costSavings': 'Potential Savings',
    'ai.recommendation': 'Recommendation',
    'ai.forecast': 'Forecast',
    'ai.confidence': 'Confidence',
    
    // Time and Date
    'date.today': 'Today',
    'date.yesterday': 'Yesterday',
    'date.thisMonth': 'This Month',
    'date.lastMonth': 'Last Month',
    'date.thisYear': 'This Year',
    'date.lastYear': 'Last Year',
    
    // Numbers and Currency
    'currency.namibian': 'N$',
    'number.percentage': '%',
    'number.decimal': '.',
    'number.thousands': ',',
    
    // Departments
    'dept.it': 'Information Technology',
    'dept.finance': 'Finance',
    'dept.hr': 'Human Resources',
    'dept.operations': 'Operations',
    'dept.sales': 'Sales',
    'dept.admin': 'Administration',
    
    // Employment Types
    'employment.permanent': 'Permanent',
    'employment.contract': 'Contract',
    'employment.temporary': 'Temporary',
    'employment.probation': 'Probation',
    'employment.intern': 'Intern',
    
    // Status
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.terminated': 'Terminated',
    'status.suspended': 'Suspended',
    'status.onLeave': 'On Leave',
    
    // Actions
    'action.run': 'Run',
    'action.process': 'Process',
    'action.approve': 'Approve',
    'action.reject': 'Reject',
    'action.submit': 'Submit',
    'action.reset': 'Reset',
    'action.clear': 'Clear',
    'action.confirm': 'Confirm',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.previous': 'Previous',
    
    // User Roles
    'role.admin': 'Administrator',
    'role.payrollAdmin': 'Payroll Administrator',
    'role.hrManager': 'HR Manager',
    'role.manager': 'Manager',
    'role.employee': 'Employee',
    
    // Banking
    'bank.account': 'Bank Account',
    'bank.accountNumber': 'Account Number',
    'bank.branch': 'Branch',
    'bank.code': 'Branch Code',
    'bank.paymentMethod': 'Payment Method',
    
    // Communication
    'comm.email': 'Email',
    'comm.phone': 'Phone',
    'comm.mobile': 'Mobile',
    'comm.address': 'Address',
    'comm.city': 'City',
    'comm.country': 'Country',
    'comm.postalCode': 'Postal Code',
  },
  
  af: {
    // Afrikaans translations
    'nav.dashboard': 'Kontrolebord',
    'nav.employees': 'Werknemers',
    'nav.payroll': 'Salaris',
    'nav.leave': 'Verlofbestuur',
    'nav.reports': 'Verslae',
    'nav.settings': 'Instellings',
    
    'common.loading': 'Laai tans...',
    'common.error': 'Fout',
    'common.success': 'Sukses',
    'common.save': 'Stoor',
    'common.cancel': 'Kanselleer',
    'common.delete': 'Verwyder',
    'common.edit': 'Wysig',
    'common.view': 'Bekyk',
    'common.search': 'Soek',
    'common.filter': 'Filtreer',
    'common.export': 'Eksporteer',
    'common.import': 'Importeer',
    
    'dashboard.welcome': 'Welkom terug',
    'dashboard.totalEmployees': 'Totale Werknemers',
    'dashboard.monthlyPayroll': 'Maandelikse Salaris',
    'dashboard.activePeriod': 'Aktiewe Periode',
    'dashboard.compliance': 'Nalewing',
    'dashboard.quickActions': 'Vinnige Aksies',
    'dashboard.aiInsights': 'KI Insigte',
    'dashboard.recentActivity': 'Onlangse Aktiwiteite',
    
    'payroll.grossPay': 'Bruto Salaris',
    'payroll.netPay': 'Netto Salaris',
    'payroll.basicSalary': 'Basiese Salaris',
    'payroll.overtime': 'Oortyd',
    'payroll.allowances': 'Toelae',
    'payroll.deductions': 'Aftrekkings',
    'payroll.tax': 'BEL Belasting',
    'payroll.ssc': 'SSK',
    'payroll.nhe': 'NHE',
    'payroll.runPayroll': 'Loop Salaris',
    'payroll.approve': 'Keur goed',
    'payroll.finalize': 'Finaliseer',
    
    'leave.annualLeave': 'Jaarlikse Verlof',
    'leave.sickLeave': 'Siekteverlof',
    'leave.familyLeave': 'Familiesverantwoordelikheidsverlof',
    'leave.apply': 'Aansoek om Verlof',
    'leave.balance': 'Verlofbalans',
    'leave.history': 'Verlofgeskiedenis',
    'leave.approved': 'Goedgekeur',
    'leave.pending': 'Wagtend',
    'leave.rejected': 'Verwerp',
    'leave.days': 'dae',
    
    'selfservice.welcome': 'Welkom by Werknemersportaal',
    'selfservice.payslip': 'Salarisstrook',
    'selfservice.viewPayslip': 'Bekyk Salarisstrook',
    'selfservice.downloadPDF': 'Laai PDF af',
    'selfservice.sendWhatsApp': 'Stuur via WhatsApp',
    'selfservice.employeeId': 'Werknemer ID',
    'selfservice.department': 'Afdeling',
    'selfservice.jobTitle': 'Pos Titel',
    
    'whatsapp.welcome': 'Welkom by NamiPay KI',
    'whatsapp.payslipReady': 'Jou salarisstrook is gereed',
    'whatsapp.netPay': 'Netto Salaris',
    'whatsapp.period': 'Periode',
    'whatsapp.viewDetails': 'Bekyk Volle Salarisstrook',
    'whatsapp.secureAccess': 'Veilige Toegang',
    'whatsapp.replyMenu': 'Antwoord met:',
    'whatsapp.menu': 'KIESLYS',
    'whatsapp.details': 'BESONDERHEDE',
    'whatsapp.balance': 'BALANS',
    'whatsapp.help': 'HULP',
    
    'error.unauthorized': 'Gemagtigde toegang',
    'error.notFound': 'Nie gevind nie',
    'error.serverError': 'Bedienerfout',
    'error.networkError': 'Netwerkfout',
    'error.validation': 'Valideringsfout',
    
    'success.saved': 'Suksesvol gestoor',
    'success.deleted': 'Suksesvol verwyder',
    'success.updated': 'Suksesvol opgedateer',
    'success.payrollProcessed': 'Salaris suksesvol verwerk',
    'success.leaveApplied': 'Verlofaansoek ingedien',
    
    'namira.compliant': 'Nalig',
    'namira.nonCompliant': 'Nie Nalig nie',
    'namira.taxCertificate': 'Belastingsertifikaat',
    'namira.ita34': 'ITA34 Sertifikaat',
    'namira.scc': 'Sosiale Sekuriteitskommissie',
    'namira.nhe': 'Nasionale Huisvestingsonderneming',
    
    'currency.namibian': 'N$',
    'date.today': 'Vandag',
    'date.yesterday': 'Gister',
    'date.thisMonth': 'Hierdie Maand',
    'date.lastMonth': 'Verlede Maand',
    
    'status.active': 'Aktief',
    'status.inactive': 'Onaktief',
    'status.terminated': 'Beëindig',
    'status.suspended': 'Ophang',
    'status.onLeave': 'Op Verlof',
    
    'action.run': 'Loop',
    'action.process': 'Verwerk',
    'action.approve': 'Keur goed',
    'action.reject': 'Verwerp',
    'action.submit': 'Dien in',
    'action.reset': 'Herstel',
    'action.clear': 'Maak skoon',
    'action.confirm': 'Bevestig',
    'action.back': 'Terug',
    'action.next': 'Volgende',
    'action.previous': 'Vorige',
    
    'role.admin': 'Administrateur',
    'role.payrollAdmin': 'Salarisadministrateur',
    'role.hrManager': 'HR Bestuurder',
    'role.manager': 'Bestuurder',
    'role.employee': 'Werknemer',
  },
  
  oj: {
    // Oshiwambo translations (key phrases only - full implementation would need native speakers)
    'nav.dashboard': 'Ombaasha',
    'nav.employees': 'Ovantu',
    'nav.payroll': 'Eemba',
    'nav.leave': 'Oholo',
    'nav.reports': 'Ombepo',
    'nav.settings': 'Oshongo',
    
    'common.save': 'Pumbula',
    'common.cancel': 'Landula',
    'common.view': 'Pumbula',
    'common.search': 'Sangula',
    
    'dashboard.welcome': 'Wa lye po',
    'dashboard.totalEmployees': 'Ovantu hyaku',
    'dashboard.monthlyPayroll': 'Eemba ya paandi',
    
    'payroll.grossPay': 'Eemba epumbu',
    'payroll.netPay': 'Eemba epumbu yomwe',
    'payroll.basicSalary': 'Eemba yo ombeleko',
    
    'leave.annualLeave': 'Oholo ya paandi',
    'leave.sickLeave': 'Oholo yo ombeleko',
    'leave.apply': 'Li oholo',
    'leave.balance': 'Oholo lyaku',
    'leave.days': 'engu',
    
    'selfservice.welcome': 'Wa lye po ombaasha ya ovantu',
    'selfservice.payslip': 'Eemba',
    'selfservice.employeeId': 'Namba ya omumbale',
    
    'whatsapp.welcome': 'Wa lye po NamiPay AI',
    'whatsapp.payslipReady': 'Eemba yoyu i li',
    'whatsapp.netPay': 'Eemba epumbu yomwe',
    'whatsapp.menu': 'MENYU',
    'whatsapp.help': 'TUKA',
    
    'success.saved': 'E pumbulile mema',
    'success.leaveApplied': 'Oholo o li',
    
    'status.active': 'Yi kuli',
    'status.approved': 'E hati',
    'status.pending': 'Yi tala',
    
    'currency.namibian': 'N$',
    'date.today': 'Le',
    'date.thisMonth': 'Paandi uno',
    
    'action.approve': 'Hatike',
    'action.submit': 'Li',
    'action.back': 'Mona',
  },
  
  otj: {
    // Otjiherero translations
    'nav.dashboard': 'Otyirongo',
    'nav.employees': 'Ovantu',
    'nav.payroll': 'Otyuaromboga',
    'nav.leave': 'Otyirongo',
    'nav.reports': 'Ombepo',
    'nav.settings': 'Ozongomisa',
    
    'common.save': 'Pumbula',
    'common.cancel': 'Landula',
    'common.view': 'Pumbula',
    'common.search': 'Sangura',
    
    'dashboard.welcome': 'Wotje po',
    'dashboard.totalEmployees': 'Ovantu dzo',
    'dashboard.monthlyPayroll': 'Otyuaromboga ya karamu',
    
    'payroll.grossPay': 'Otyuaromboga otyi po',
    'payroll.netPay': 'Otyuaromboga otyi po omwe',
    'payroll.basicSalary': 'Otyuaromboga yo ombeleko',
    
    'leave.annualLeave': 'Otyirongo ya karamu',
    'leave.sickLeave': 'Otyirongo yo ombeleko',
    'leave.apply': 'Li otyirongo',
    'leave.balance': 'Otyirongo lyaku',
    'leave.days': 'engu',
    
    'selfservice.welcome': 'Wotje po otyirongo ya ovantu',
    'selfservice.payslip': 'Otyuaromboga',
    'selfservice.employeeId': 'Namba ya omumbale',
    
    'whatsapp.welcome': 'Wotje po NamiPay AI',
    'whatsapp.payslipReady': 'Otyuaromboga yoyu i li',
    'whatsapp.netPay': 'Otyuaromboga otyi po omwe',
    'whatsapp.menu': 'MENYU',
    'whatsapp.help': 'TUKA',
    
    'success.saved': 'E pumbulile mema',
    'success.leaveApplied': 'Otyirongo o li',
    
    'status.active': 'Yi kuli',
    'status.approved': 'E hati',
    'status.pending': 'Yi tala',
    
    'currency.namibian': 'N$',
    'date.today': 'Le',
    'date.thisMonth': 'Karamu uno',
    
    'action.approve': 'Hatike',
    'action.submit': 'Li',
    'action.back': 'Mona',
  },
  
  dam: {
    // Damara/Nama translations
    'nav.dashboard': 'Gâisa',
    'nav.employees': 'Tsao',
    'nav.payroll': 'Gâob',
    'nav.leave': 'Gâisa',
    'nav.reports': 'Gâob',
    'nav.settings': 'Tsore',
    
    'common.save': 'Khuba',
    'common.cancel': 'Nû',
    'common.view': 'Khuba',
    'common.search': 'Tâ',
    
    'dashboard.welcome': 'Ai ge',
    'dashboard.totalEmployees': 'Tsao dâ',
    'dashboard.monthlyPayroll': 'Gâob xa !khaes',
    
    'payroll.grossPay': 'Gâob dâ',
    'payroll.netPay': 'Gâob dâ tsî',
    'payroll.basicSalary': 'Gâob yo khaba',
    
    'leave.annualLeave': 'Gâisa xa !khaes',
    'leave.sickLeave': 'Gâisa yo khaba',
    'leave.apply': 'Li gâisa',
    'leave.balance': 'Gâisa dâ',
    'leave.days': 'ao',
    
    'selfservice.welcome': 'Ai ge gâisa ya tsao',
    'selfservice.payslip': 'Gâob',
    'selfservice.employeeId': 'Namba ya tsao',
    
    'whatsapp.welcome': 'Ai ge NamiPay AI',
    'whatsapp.payslipReady': 'Gâob yoyu i li',
    'whatsapp.netPay': 'Gâob dâ tsî',
    'whatsapp.menu': 'MENYU',
    'whatsapp.help': 'TUKA',
    
    'success.saved': 'E khubire mema',
    'success.leaveApplied': 'Gâisa o li',
    
    'status.active': 'Yi kuli',
    'status.approved': 'E hati',
    'status.pending': 'Yi tala',
    
    'currency.namibian': 'N$',
    'date.today': 'Le',
    'date.thisMonth': '!khaes uno',
    
    'action.approve': 'Hatike',
    'action.submit': 'Li',
    'action.back': 'Mona',
  },
  
  loz: {
    // Lozi translations
    'nav.dashboard': 'Ikalafe',
    'nav.employees': 'Abantu',
    'nav.payroll': 'Imali',
    'nav.leave': 'Likwalo',
    'nav.reports': 'Amanengu',
    'nav.settings': 'Kukola',
    
    'common.save': 'Bwanya',
    'common.cancel': 'Nfula',
    'common.view': 'Bona',
    'common.search': 'Fumbula',
    
    'dashboard.welcome': 'Muli shani',
    'dashboard.totalEmployees': 'Abantu bonse',
    'dashboard.monthlyPayroll': 'Imali ya kwezi',
    
    'payroll.grossPay': 'Imali yonse',
    'payroll.netPay': 'Imali yabuli',
    'payroll.basicSalary': 'Imali ya kusangula',
    
    'leave.annualLeave': 'Likwalo ya kwezi',
    'leave.sickLeave': 'Likwalo ya kulwala',
    'leave.apply': 'Lombela likwalo',
    'leave.balance': 'Likwalo lalikuli',
    'leave.days': 'malichi',
    
    'selfservice.welcome': 'Muli shani ikalafe ya abantu',
    'selfservice.payslip': 'Imali',
    'selfservice.employeeId': 'Namba ya muntu',
    
    'whatsapp.welcome': 'Muli shani NamiPay AI',
    'whatsapp.payslipReady': 'Imali yoyu i li',
    'whatsapp.netPay': 'Imali yabuli',
    'whatsapp.menu': 'MENYU',
    'whatsapp.help': 'TUKA',
    
    'success.saved': 'E bwanyile mema',
    'success.leaveApplied': 'Likwalo o li',
    
    'status.active': 'Yi kuli',
    'status.approved': 'E hati',
    'status.pending': 'Yi tala',
    
    'currency.namibian': 'N$',
    'date.today': 'Le',
    'date.thisMonth': 'Kwezi uno',
    
    'action.approve': 'Hatike',
    'action.submit': 'Li',
    'action.back': 'Mona',
  },
  
  ru: {
    // Rukwangali translations
    'nav.dashboard': 'Munganda',
    'nav.employees': 'Abantu',
    'nav.payroll': 'Mbongo',
    'nav.leave': 'Likwalo',
    'nav.reports': 'Amanengu',
    'nav.settings': 'Kukola',
    
    'common.save': 'Bwanya',
    'common.cancel': 'Nfula',
    'common.view': 'Bona',
    'common.search': 'Fumbula',
    
    'dashboard.welcome': 'Muli shani',
    'dashboard.totalEmployees': 'Abantu bonse',
    'dashboard.monthlyPayroll': 'Mbongo ya kwezi',
    
    'payroll.grossPay': 'Mbongo yonse',
    'payroll.netPay': 'Mbongo yabuli',
    'payroll.basicSalary': 'Mbongo ya kusangula',
    
    'leave.annualLeave': 'Likwalo ya kwezi',
    'leave.sickLeave': 'Likwalo ya kulwala',
    'leave.apply': 'Lombela likwalo',
    'leave.balance': 'Likwalo lalikuli',
    'leave.days': 'malichi',
    
    'selfservice.welcome': 'Muli shani munganda ya abantu',
    'selfservice.payslip': 'Mbongo',
    'selfservice.employeeId': 'Namba ya muntu',
    
    'whatsapp.welcome': 'Muli shani NamiPay AI',
    'whatsapp.payslipReady': 'Mbongo yoyu i li',
    'whatsapp.netPay': 'Mbongo yabuli',
    'whatsapp.menu': 'MENYU',
    'whatsapp.help': 'TUKA',
    
    'success.saved': 'E bwanyile mema',
    'success.leaveApplied': 'Likwalo o li',
    
    'status.active': 'Yi kuli',
    'status.approved': 'E hati',
    'status.pending': 'Yi tala',
    
    'currency.namibian': 'N$',
    'date.today': 'Le',
    'date.thisMonth': 'Kwezi uno',
    
    'action.approve': 'Hatike',
    'action.submit': 'Li',
    'action.back': 'Mona',
  },
  
  ts: {
    // Setswana translations
    'nav.dashboard': 'Tshebetso',
    'nav.employees': 'Batsami',
    'nav.payroll': 'Tshelete',
    'nav.leave': 'Tlatsamo',
    'nav.reports': 'Dipalangwa',
    'nav.settings': 'Dipeakanyo',
    
    'common.save': 'Boloka',
    'common.cancel': 'Khansela',
    'common.view': 'Bona',
    'common.search': 'Batla',
    
    'dashboard.welcome': 'Dumelang',
    'dashboard.totalEmployees': 'Batsami botlhe',
    'dashboard.monthlyPayroll': 'Tshelete ya kwedi',
    
    'payroll.grossPay': 'Tshelete yohole',
    'payroll.netPay': 'Tshelete ya fao',
    'payroll.basicSalary': 'Tshelete ya motheo',
    
    'leave.annualLeave': 'Tlatsamo ya ngwaga',
    'leave.sickLeave': 'Tlatsamo ya bolotsi',
    'leave.apply': 'Kopa tlatsamo',
    'leave.balance': 'Tlatsamo le go siame',
    'leave.days': 'malatsi',
    
    'selfservice.welcome': 'Dumelang tshebetso ya batsami',
    'selfservice.payslip': 'Tshelete',
    'selfservice.employeeId': 'Nomoro ya mosadi',
    
    'whatsapp.welcome': 'Dumelang NamiPay AI',
    'whatsapp.payslipReady': 'Tshelete yoyu e le gona',
    'whatsapp.netPay': 'Tshelete ya fao',
    'whatsapp.menu': 'MENYU',
    'whatsapp.help': 'THUSA',
    
    'success.saved': 'E bolokile sentle',
    'success.leaveApplied': 'Tlatsamo o kopeditswe',
    
    'status.active': 'E a dira',
    'status.approved': 'E amogetswe',
    'status.pending': 'E a letle',
    
    'currency.namibian': 'N$',
    'date.today': 'Kamosi',
    'date.thisMonth': 'Kwedi eno',
    
    'action.approve': 'Amogela',
    'action.submit': 'Romela',
    'action.back': 'Morago',
  }
}

export class I18nService {
  private static currentLanguage: SupportedLanguage = 'en'
  
  /**
   * Set the current language
   */
  static setLanguage(language: SupportedLanguage): void {
    this.currentLanguage = language
  }
  
  /**
   * Get the current language
   */
  static getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage
  }
  
  /**
   * Get a translation for the current language
   */
  static t(key: string, fallback?: string): string {
    const keys = key.split('.')
    let translation: any = TRANSLATIONS[this.currentLanguage]
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k]
      } else {
        // Fallback to English if translation not found
        translation = TRANSLATIONS.en
        for (const k of keys) {
          if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k]
          } else {
            return fallback || key
          }
        }
        break
      }
    }
    
    return typeof translation === 'string' ? translation : fallback || key
  }
  
  /**
   * Format currency based on language
   */
  static formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat(this.getLocale(), {
      style: 'currency',
      currency: 'NAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(amount)
  }
  
  /**
   * Format date based on language
   */
  static formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }
    
    return new Intl.DateTimeFormat(this.getLocale(), defaultOptions).format(dateObj)
  }
  
  /**
   * Format number based on language
   */
  static formatNumber(number: number): string {
    return new Intl.NumberFormat(this.getLocale()).format(number)
  }
  
  /**
   * Get locale for Intl APIs
   */
  private static getLocale(): string {
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-NA',
      af: 'af-ZA',
      oj: 'en-NA', // Fallback for languages without full locale support
      otj: 'en-NA',
      dam: 'en-NA',
      loz: 'en-NA',
      ru: 'en-NA',
      ts: 'en-NA'
    }
    
    return localeMap[this.currentLanguage]
  }
  
  /**
   * Get supported languages
   */
  static getSupportedLanguages(): LanguageConfig[] {
    return SUPPORTED_LANGUAGES
  }
  
  /**
   * Detect language from browser or user preference
   */
  static detectLanguage(preferredLanguage?: string): SupportedLanguage {
    if (preferredLanguage) {
      const lang = SUPPORTED_LANGUAGES.find(l => l.code === preferredLanguage || l.name.toLowerCase() === preferredLanguage.toLowerCase())
      if (lang) return lang.code
    }
    
    // Check browser language
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.split('-')[0]
      const supportedLang = SUPPORTED_LANGUAGES.find(l => l.code === browserLang)
      if (supportedLang) return supportedLang.code
    }
    
    return 'en' // Default to English
  }
}
