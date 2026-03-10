import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Briefcase, 
  Monitor, 
  ShieldCheck, 
  Mail, 
  Linkedin, 
  Github, 
  ChevronDown, 
  Download, 
  Eye,
  ExternalLink,
  Calendar,
  MapPin,
  GraduationCap,
  ArrowUp,
  X,
  Phone,
  User,
  Sun,
  Moon
} from 'lucide-react';

// --- Types ---

interface Mission {
  id: number;
  title: string;
  context: 'Professionnel' | 'École' | 'Personnel';
  date: string;
  description: string;
  competencies: string[];
}

interface LabItem {
  id: number;
  title: string;
  platform: string;
  description: string;
}

interface VeilleItem {
  id: number;
  category: 'YouTube/Podcast' | 'Site Web' | 'CERT-FR/Vulnérabilité' | 'Exemple de veille';
  title: string;
  description: string;
  url?: string;
  date?: string;
}

// --- Data ---

const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Mise en place d'une infrastructure Active Directory",
    context: 'École',
    date: 'Octobre - Novembre 2025',
    description: "Gestion d'annuaire avec Active Directory : création et gestion des utilisateurs, groupes, unités d'organisation et stratégies de groupe (GPO).",
    competencies: ['Gérer le patrimoine informatique']
  },
  {
    id: 2,
    title: "Configuration des services réseaux DNS/DHCP",
    context: 'École',
    date: 'Novembre 2025',
    description: "Déploiement et configuration des services DNS et DHCP sur Windows Server pour la gestion automatique des adresses IP et la résolution de noms.",
    competencies: ['Gérer le patrimoine informatique']
  },
  {
    id: 3,
    title: "Hébergement site web via Cloudflare Pages",
    context: 'École',
    date: 'Décembre 2025',
    description: "Préparation et configuration de l'hébergement d'un site web en utilisant Cloudflare Pages pour le déploiement.",
    competencies: ['Développer la présence en ligne']
  },
  {
    id: 4,
    title: "Installation réseau FTTH",
    context: 'Professionnel',
    date: 'Octobre - Novembre 2025',
    description: "Stage chez SITCOM OPTIQUE à Brazzaville (Congo). Installation de réseau fibre optique FTTH : câblage du point de branchement optique (PBO) jusqu'à l'abonné.",
    competencies: ['Gérer le patrimoine informatique']
  },
  {
    id: 5,
    title: "Mise en place de la supervision SIEM/EDR",
    context: 'École',
    date: 'Novembre 2025',
    description: "Installation et configuration d'outils de supervision pour la détection des menaces et la réponse aux incidents de sécurité.",
    competencies: ['Répondre aux incidents', 'Mettre à disposition des utilisateurs un service informatique']
  },
  {
    id: 6,
    title: "Création d'une entreprise fictive et site web",
    context: 'École',
    date: 'Novembre 2025',
    description: "Création d'une entreprise fictive avec élaboration d'un business plan et développement d'un site web vitrine en ligne.",
    competencies: ['Travailler en mode projet']
  }
];

const LAB_ITEMS: LabItem[] = [
  {
    id: 1,
    title: "Infrastructure Windows Server",
    platform: "VirtualBox",
    description: "VM Windows Server 2019 avec Active Directory, DNS et DHCP configurés."
  },
  {
    id: 2,
    title: "Machine virtuelle Ubuntu",
    platform: "VirtualBox",
    description: "Environnement Linux Ubuntu pour tests et apprentissage."
  },
  {
    id: 3,
    title: "Réseau virtuel complet",
    platform: "VirtualBox",
    description: "Architecture réseau avec plusieurs VMs interconnectées."
  },
  {
    id: 4,
    title: "Environnement Cisco",
    platform: "VirtualBox",
    description: "Configuration réseau avec équipements Cisco simulés."
  }
];

const VEILLE_ITEMS: VeilleItem[] = [
  {
    id: 1,
    category: 'YouTube/Podcast',
    title: "Chaîne Cybersécurité",
    description: "Suivi de chaînes YouTube spécialisées en cybersécurité et systèmes réseaux pour rester informé des dernières tendances.",
    url: "https://www.youtube.com/@Cybersecurite"
  },
  {
    id: 2,
    category: 'YouTube/Podcast',
    title: "Podcasts Tech & Sécurité",
    description: "Écoute régulière de podcasts sur l'actualité IT, les nouvelles technologies et les bonnes pratiques en sécurité.",
    url: "https://www.youtube.com/watch?v=y9aFZTNFvJQ&t=4623s"
  },
  {
    id: 3,
    category: 'Site Web',
    title: "La Ville de Paris touchée par une fuite de données",
    description: "Article technique sur la fuite de données liée à la plateforme des cours d'adultes de la Ville de Paris.",
    url: "https://www.usine-digitale.fr/cybersecurite/cybersecurite-la-ville-de-paris-touchee-par-une-fuite-de-donnees-liee-a-la-plateforme-des-cours-dadultes.5FG7X2EX6BD3PN2HB2M3NBWC4I.html"
  },
  {
    id: 4,
    category: 'CERT-FR/Vulnérabilité',
    title: "Alertes CERT-FR",
    description: "Suivi des alertes de sécurité publiés par le CERT-FR (Centre gouvernemental de veille, d'alerte et de réponse aux attaques informatiques).",
    url: "https://www.cert.ssi.gouv.fr/"
  },
  {
    id: 5,
    category: 'CERT-FR/Vulnérabilité',
    title: "CVE et Vulnérabilités",
    description: "Surveillance des nouvelles vulnérabilités (CVE) pour anticiper les risques et appliquer les correctifs nécessaires.",
    url: "https://cve.mitre.org/"
  },
  {
    id: 6,
    category: 'Exemple de veille',
    title: "Exemple de veille : Vulnérabilité critique",
    date: "2024",
    description: "Analyse détaillée d'une vulnérabilité critique découverte, son impact potentiel et les mesures de remédiation recommandées. Documentation complète avec captures d'écran et procédures.",
    url: "https://www.protect.airbus.com/fr/blog/airbus-protect-explique-gestion-vulnerabilites/"
  },
  {
    id: 7,
    category: 'Exemple de veille',
    title: "Exemple de Veille Détaillé",
    description: "Sujet : Analyse d'une vulnérabilité critique. Source : CERT-FR / ANSSI. Résumé : Description de la vulnérabilité, systèmes impactés, et mesures de remédiation recommandées.",
    url: "https://www.maria-conseil.com/veille-technologique-informatique-exemple-de-realisation"
  }
];

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsLight(!isLight);
    document.documentElement.classList.toggle('light');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-bg/80 backdrop-blur-lg border-b border-brand-border/30 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold gradient-text">Portfolio SISR</div>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-sm font-medium text-brand-text-muted">
            {['Accueil', 'Parcours', 'Compétences', 'Documents', 'Réalisations', 'Lab Personnel', 'Veille', 'Projet Pro'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ', '-')}`} className="hover:text-brand-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-brand-text/5 hover:bg-brand-text/10 text-brand-text-muted hover:text-brand-primary transition-all border border-brand-border/30"
            title="Changer le thème"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Mobile theme toggle */}
        <button 
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-xl bg-brand-text/5 hover:bg-brand-text/10 text-brand-text-muted hover:text-brand-primary transition-all border border-brand-border/30"
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          Samuella Erdy <span className="gradient-text">BANGO EKAKA</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-brand-text-muted mb-12 font-medium">
          Ingénieure Systèmes & Réseaux
        </p>
        

      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 text-brand-primary/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const Competences = () => {
  const competencies = [
    {
      title: "Gérer le patrimoine informatique",
      description: "Recenser et identifier les ressources numériques, gérer les licences, assurer la maintenance et l'évolution des équipements.",
      icon: Monitor
    },
    {
      title: "Répondre aux incidents",
      description: "Diagnostiquer les dysfonctionnements, apporter des solutions correctives et assister les utilisateurs dans leur environnement numérique.",
      icon: ShieldCheck
    },
    {
      title: "Développer la présence en ligne",
      description: "Participer à la mise en œuvre de services en ligne, assurer la visibilité et la sécurité des plateformes web de l'organisation.",
      icon: ExternalLink
    },
    {
      title: "Travailler en mode projet",
      description: "Planifier les activités, collaborer en équipe, respecter les délais et les objectifs définis dans le cadre d'un projet IT.",
      icon: Briefcase
    },
    {
      title: "Mettre à disposition un service",
      description: "Déployer des services informatiques, configurer les accès et assurer la continuité de service pour les utilisateurs.",
      icon: User
    },
    {
      title: "Organiser son développement",
      description: "Mettre en place une veille technologique, actualiser ses compétences et s'adapter aux évolutions du secteur numérique.",
      icon: GraduationCap
    }
  ];

  return (
    <section id="competences" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Mes Compétences</h2>
        <p className="section-subtitle">
          Les 6 blocs de compétences du référentiel BTS SIO SISR
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competencies.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 hover:border-brand-primary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                <comp.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{comp.title}</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                {comp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Documents = () => {
  return (
    <section id="documents" className="py-24 px-6 bg-brand-bg/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Documents Officiels</h2>
        <p className="section-subtitle">
          Téléchargez mon CV et mon Tableau de Synthèse - Ingénieure Systèmes & Réseaux
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-8 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Curriculum Vitae</h3>
            <p className="text-brand-text-muted text-sm mb-8">Aperçu de mon CV - Ingénieure Systèmes & Réseaux</p>
            <div className="flex gap-4 w-full">
              <a 
                href="https://drive.google.com/file/d/1-7r1xrvF7ha3P5rhp98aReiRHZ5Kgbij/preview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg border border-brand-primary/30 text-brand-primary text-sm font-medium hover:bg-brand-primary/5 flex items-center justify-center gap-2"
              >
                <Eye size={16} /> Aperçu
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1-7r1xrvF7ha3P5rhp98aReiRHZ5Kgbij"
                className="flex-1 py-2 rounded-lg bg-brand-primary/10 text-brand-primary text-sm font-medium hover:bg-brand-primary/20 flex items-center justify-center gap-2"
              >
                <Download size={16} /> Télécharger
              </a>
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Tableau de Synthèse</h3>
            <p className="text-brand-text-muted text-sm mb-8">Récapitulatif des compétences acquises en BTS SIO</p>
            <div className="flex gap-4 w-full">
              <a 
                href="https://drive.google.com/file/d/1DRn0aSnAZPr_G-ecZ75w9zi8vNcDcZGr/preview" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg border border-brand-primary/30 text-brand-primary text-sm font-medium hover:bg-brand-primary/5 flex items-center justify-center gap-2"
              >
                <Eye size={16} /> Aperçu
              </a>
              <a 
                href="https://drive.google.com/uc?export=download&id=1DRn0aSnAZPr_G-ecZ75w9zi8vNcDcZGr"
                className="flex-1 py-2 rounded-lg bg-brand-primary/10 text-brand-primary text-sm font-medium hover:bg-brand-primary/20 flex items-center justify-center gap-2"
              >
                <Download size={16} /> Télécharger
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
      </AnimatePresence>
    </section>
  );
};

const RealisationsProfessionnelles = () => {
  const [filterContext, setFilterContext] = useState('Tous');
  const [filterComp, setFilterComp] = useState('Toutes');

  const filteredMissions = MISSIONS.filter(m => {
    const matchContext = filterContext === 'Tous' || m.context === filterContext;
    const matchComp = filterComp === 'Toutes' || m.competencies.includes(filterComp);
    return matchContext && matchComp;
  });

  return (
    <section id="realisations" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Réalisations Professionnelles</h2>
        <p className="section-subtitle">
          Découvrez mes réalisations en contexte professionnel, scolaire et personnel
        </p>
        
        <div className="mb-12 space-y-6">
          <div>
            <p className="text-sm text-brand-text-muted mb-3">Filtrer par contexte :</p>
            <div className="flex flex-wrap gap-2">
              {['Tous', 'Professionnel', 'École', 'Personnel'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilterContext(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-all ${filterContext === f ? 'bg-brand-primary text-brand-bg font-semibold' : 'bg-brand-text/5 text-brand-text-muted hover:bg-brand-text/10'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-brand-text-muted mb-3">Filtrer par compétence BTS SIO :</p>
            <div className="flex flex-wrap gap-2">
              {['Toutes', 'Gérer le patrimoine informatique', 'Répondre aux incidents', 'Développer la présence en ligne', 'Travailler en mode projet'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilterComp(f)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-all ${filterComp === f ? 'bg-brand-primary text-brand-bg font-semibold' : 'bg-brand-text/5 text-brand-text-muted hover:bg-brand-text/10'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredMissions.map((mission) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={mission.id} 
                className="glass-card p-6 flex flex-col"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                    mission.context === 'École' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                    mission.context === 'Professionnel' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                    'bg-brand-text/5 text-brand-text-muted border border-brand-border/30'
                  }`}>
                    {mission.context}
                  </span>
                  <span className="text-[10px] text-brand-text-muted font-medium opacity-60">{mission.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 leading-tight">{mission.title}</h3>
                <p className="text-brand-text-muted text-sm mb-6 flex-grow leading-relaxed">{mission.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {mission.competencies.map((comp, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-brand-text/5 border border-brand-border/30 text-[9px] text-brand-text-muted">
                      {comp}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2.5 rounded-lg border border-brand-border/30 text-sm font-medium hover:bg-brand-text/5 flex items-center justify-center gap-2 transition-colors">
                  <FileText size={14} /> Voir la documentation
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredMissions.length === 0 && (
          <div className="text-center py-20 text-gray-500 mb-16">
            Aucune réalisation trouvée avec ces filtres.
          </div>
        )}

        {/* Tableau de Synthèse Section */}
        <div className="mt-24 pt-24 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 group">
              <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 group-hover:scale-110 transition-transform">
                <FileText size={40} />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Tableau de Synthèse</h3>
                <p className="text-brand-text-muted text-sm mb-6">
                  Consultez le tableau récapitulatif de mes compétences acquises au cours de ma formation BTS SIO.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="https://drive.google.com/file/d/1DRn0aSnAZPr_G-ecZ75w9zi8vNcDcZGr/preview" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-lg border border-brand-primary/30 text-brand-primary text-sm font-medium hover:bg-brand-primary/5 flex items-center gap-2"
                  >
                    <Eye size={18} /> Aperçu
                  </a>
                  <a 
                    href="https://drive.google.com/uc?export=download&id=1DRn0aSnAZPr_G-ecZ75w9zi8vNcDcZGr"
                    className="px-6 py-2.5 rounded-lg bg-brand-primary/10 text-brand-primary text-sm font-medium hover:bg-brand-primary/20 flex items-center gap-2"
                  >
                    <Download size={18} /> Télécharger
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
      </AnimatePresence>
    </section>
  );
};

const Lab = () => {
  return (
    <section id="lab-personnel" className="py-24 px-6 bg-brand-bg/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Lab Personnel</h2>
        <p className="section-subtitle">
          Mon environnement de test personnel sur VirtualBox pour pratiquer et expérimenter
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {LAB_ITEMS.map((item) => (
            <div key={item.id} className="glass-card p-6 group">
              <div className="text-brand-primary mb-4">
                <Monitor size={24} />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-brand-text-muted text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
            <Monitor size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Configuration du Lab</h3>
            <p className="text-brand-text-muted text-sm">
              Environnement virtualisé complet comprenant plusieurs machines virtuelles pour simuler des infrastructures réseau complexes : serveurs Windows/Linux, pare-feu pfSense, tests de pénétration, et environnements clients Windows 10/11.
            </p>
          </div>
        </div>

        {/* VirtualBox Screenshot Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="p-4 border-b border-brand-border/30 bg-brand-text/5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] text-gray-500 font-mono ml-2">Oracle VM VirtualBox Manager</span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974&auto=format&fit=crop" 
            alt="Capture d'écran de mon gestionnaire VirtualBox montrant SRV-PFSENSE, DEBIAN, CLIENT-WIN10, WINDOWS2019 et CLIENT-WIN11" 
            className="w-full h-auto object-cover max-h-[500px]"
            referrerPolicy="no-referrer"
          />
          <div className="p-6 bg-brand-card/30">
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Veille = () => {
  const [activeTab, setActiveTab] = useState('YouTube/Podcast');
  const tabs = ['YouTube/Podcast', 'Site Web', 'CERT-FR/Vulnérabilité', 'Exemple de veille'];

  return (
    <section id="veille" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Veille Technologique</h2>
        <p className="section-subtitle">
          Ma veille en cybersécurité : podcasts, alertes CERT-FR, articles et actualités
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-brand-primary text-brand-bg shadow-lg shadow-brand-primary/20' : 'bg-brand-text/5 text-brand-text-muted hover:bg-brand-text/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="space-y-4 max-w-4xl mx-auto">
          {VEILLE_ITEMS.filter(v => v.category === activeTab).map((item) => (
            <div key={item.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <div className="flex items-center gap-3 mb-2">
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-brand-text-muted text-sm">{item.description}</p>
              </div>
              {item.url ? (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-brand-border/30 text-sm font-medium hover:bg-brand-text/5 flex items-center justify-center gap-2 shrink-0 transition-colors"
                >
                  Voir <ExternalLink size={14} />
                </a>
              ) : (
                <button className="px-4 py-2 rounded-lg border border-brand-border/30 text-sm font-medium hover:bg-brand-text/5 flex items-center justify-center gap-2 shrink-0">
                  Voir <ExternalLink size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Parcours = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const timelineItems = [
    { 
      date: "2020 - 2021", 
      title: "Baccalauréat Général", 
      desc: "Anne Marie Javouhey. Obtention du Baccalauréat.", 
      side: 'left',
      fullDesc: "Obtention du Baccalauréat Général au lycée Anne Marie Javouhey. Cette étape a marqué la fin de mes études secondaires et le début de mon orientation vers les technologies de l'information."
    },
    { 
      date: "Depuis 2025", 
      title: "BTS SIO Option SISR", 
      desc: "IPSSI SQY. Formation en cours - Systèmes & Réseaux.", 
      side: 'right',
      fullDesc: "Actuellement en formation BTS Services Informatiques aux Organisations (SIO) option Solutions d'Infrastructure, Systèmes et Réseaux (SISR) à l'IPSSI SQY. Je me spécialise dans la gestion des infrastructures et la cybersécurité."
    },
    { 
      date: "Oct - Nov 2025", 
      title: "Stage FTTH", 
      desc: "SITCOM OPTIQUE - Brazzaville, Congo. Installation réseau fibre optique.", 
      side: 'left',
      fullDesc: "Stage pratique chez SITCOM OPTIQUE à Brazzaville. Participation à l'installation de réseaux fibre optique (FTTH), soudure de fibres, et configuration de terminaux clients."
    },
    { 
      date: "Depuis Nov 2025", 
      title: "Projet Pédagogique", 
      desc: "IPSSI SQY. Technicien système réseaux - Infrastructure complète.", 
      side: 'right',
      fullDesc: "Mise en place d'une infrastructure réseau complète dans le cadre d'un projet pédagogique : configuration de serveurs Windows/Linux, gestion d'Active Directory, et sécurisation des accès."
    },
    { 
      date: "Avril - Juin 2026", 
      title: "Stage recherché", 
      desc: "Île-de-France. Stage de 2 mois en entreprise.", 
      side: 'left',
      fullDesc: "Recherche active d'un stage de 2 mois (Avril à Juin 2026) en Île-de-France pour mettre en pratique mes compétences en administration systèmes et réseaux."
    },
    { 
      date: "Septembre 2026", 
      title: "Alternance recherchée", 
      desc: "Île-de-France. Alternance pour la 2ème année.", 
      side: 'right',
      fullDesc: "Recherche d'une alternance pour ma deuxième année de BTS SIO SISR à partir de Septembre 2026, afin de poursuivre ma montée en compétences en milieu professionnel."
    }
  ];

  return (
    <section id="parcours" className="py-24 px-6 bg-brand-bg/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Mon Parcours</h2>
        <p className="section-subtitle">
          Mon évolution académique et mes premières expériences professionnelles
        </p>
        
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0 mt-16">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-brand-primary/30 -translate-x-1/2" />
          
          {timelineItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`relative mb-12 md:w-1/2 cursor-pointer group ${item.side === 'right' ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}
              onClick={() => setSelectedItem(item)}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-auto md:right-0 top-2 w-4 h-4 rounded-full bg-brand-primary border-4 border-brand-bg translate-x-[-50%] md:translate-x-[50%] shadow-[0_0_10px_rgba(0,210,255,0.5)] group-hover:scale-125 transition-transform" />
              
              <div className="glass-card p-6 group-hover:border-brand-primary/50 transition-all group-hover:bg-brand-text/5">
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-brand-text-muted text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card p-8 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-3 text-brand-primary mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70">Période</span>
                  <p className="font-bold">{selectedItem.date}</p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{selectedItem.title}</h3>
              <div className="w-12 h-1 bg-brand-primary mb-6 rounded-full" />
              
              <p className="text-gray-300 leading-relaxed mb-8">
                {selectedItem.fullDesc}
              </p>
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 rounded-xl bg-brand-primary text-brand-bg font-bold hover:opacity-90 transition-opacity"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjetPro = () => {
  return (
    <section id="projet-pro" className="py-24 px-6 bg-brand-bg/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Projet Professionnel</h2>
        <p className="section-subtitle">
          Mes objectifs de formation et de carrière dans le domaine de la cybersécurité
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="glass-card p-8">
            <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase mb-4">
              <GraduationCap size={16} /> Formation Ciblée
            </div>
            <h3 className="text-2xl font-bold mb-4">IPSSI - Grande École d'Informatique</h3>
            <p className="text-brand-primary text-sm font-semibold mb-4">Mastère Expert en Cybersécurité</p>
            <p className="text-brand-text-muted text-sm leading-relaxed">
              Poursuite d'études en Mastère pour approfondir les compétences en cybersécurité et sécurité des systèmes d'information.
            </p>
          </div>
          
          <div className="glass-card p-8">
            <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase mb-4">
              <Briefcase size={16} /> Emploi Ciblé
            </div>
            <h3 className="text-2xl font-bold mb-4">Ingénieure Systèmes et Réseaux</h3>
            <p className="text-brand-primary text-sm font-semibold mb-4">Cybersécurité / Infrastructure IT</p>
            <p className="text-brand-text-muted text-sm leading-relaxed">
              Intégrer une équipe IT pour gérer les infrastructures réseaux, assurer la sécurité des systèmes et répondre aux incidents de sécurité.
            </p>
          </div>
        </div>
        
        <div className="mb-0">
          <h3 className="text-2xl font-bold text-center mb-12">Réseau Social Professionnel</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "Email", value: "ekakasamuella@gmail.com", link: "mailto:ekakasamuella@gmail.com" },
              { icon: Linkedin, title: "LinkedIn", value: "Mon profil professionnel", link: "https://linkedin.com/in/samuella-bango-ekaka" },
              { icon: Github, title: "GitHub", value: "Mes projets et code", link: "https://github.com/" }
            ].map((social) => (
              <a key={social.title} href={social.link} target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex flex-col items-center text-center hover:bg-brand-text/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                  <social.icon size={24} />
                </div>
                <h4 className="font-bold mb-1">{social.title}</h4>
                <p className="text-brand-text-muted text-sm">{social.value}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-brand-border/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">© 2026 Portfolio BTS SIO SISR</p>
          <p className="text-xs text-brand-text-muted mt-1">Spécialité Cybersécurité</p>
        </div>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-xs font-bold text-brand-text-muted hover:text-brand-primary transition-colors"
        >
          Retour en haut <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
};

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Parcours />
        <Competences />
        <Documents />
        <RealisationsProfessionnelles />
        <Lab />
        <Veille />
        <ProjetPro />
      </main>
      <Footer />
    </div>
  );
}
