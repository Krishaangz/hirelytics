
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    welcome: "Welcome back",
    dashboard: "Dashboard",
    settings: "Settings",
    projects: "Projects",
    organizations: "Organizations",
    profile: "Profile",
    appearance: "Appearance",
    notifications: "Notifications",
    security: "Security",
    language: "Language",
    timezone: "Timezone",
    darkMode: "Dark Mode",
    saveChanges: "Save Changes",
    createOrganization: "Create Organization",
    joinOrganization: "Join Organization",
    newProject: "New Project",
    uploadCandidate: "Upload Candidate",
    runComparison: "Run AI Comparison",
    currentPlan: "Current Plan",
    upgradePlan: "Upgrade Plan",
    deleteAccount: "Delete Account",
    changePassword: "Change Password",
    enable2FA: "Enable Two-Factor Authentication"
  },
  es: {
    welcome: "Bienvenido de vuelta",
    dashboard: "Tablero",
    settings: "Configuración",
    projects: "Proyectos",
    organizations: "Organizaciones",
    profile: "Perfil",
    appearance: "Apariencia",
    notifications: "Notificaciones",
    security: "Seguridad",
    language: "Idioma",
    timezone: "Zona horaria",
    darkMode: "Modo oscuro",
    saveChanges: "Guardar cambios",
    createOrganization: "Crear organización",
    joinOrganization: "Unirse a organización",
    newProject: "Nuevo proyecto",
    uploadCandidate: "Subir candidato",
    runComparison: "Ejecutar comparación IA",
    currentPlan: "Plan actual",
    upgradePlan: "Actualizar plan",
    deleteAccount: "Eliminar cuenta",
    changePassword: "Cambiar contraseña",
    enable2FA: "Habilitar autenticación de dos factores"
  },
  fr: {
    welcome: "Bienvenue",
    dashboard: "Tableau de bord",
    settings: "Paramètres",
    projects: "Projets",
    organizations: "Organisations",
    profile: "Profil",
    appearance: "Apparence",
    notifications: "Notifications",
    security: "Sécurité",
    language: "Langue",
    timezone: "Fuseau horaire",
    darkMode: "Mode sombre",
    saveChanges: "Sauvegarder",
    createOrganization: "Créer une organisation",
    joinOrganization: "Rejoindre une organisation",
    newProject: "Nouveau projet",
    uploadCandidate: "Télécharger candidat",
    runComparison: "Lancer comparaison IA",
    currentPlan: "Plan actuel",
    upgradePlan: "Mettre à niveau",
    deleteAccount: "Supprimer le compte",
    changePassword: "Changer le mot de passe",
    enable2FA: "Activer l'authentification à deux facteurs"
  },
  de: {
    welcome: "Willkommen zurück",
    dashboard: "Dashboard",
    settings: "Einstellungen",
    projects: "Projekte",
    organizations: "Organisationen",
    profile: "Profil",
    appearance: "Erscheinung",
    notifications: "Benachrichtigungen",
    security: "Sicherheit",
    language: "Sprache",
    timezone: "Zeitzone",
    darkMode: "Dunkler Modus",
    saveChanges: "Änderungen speichern",
    createOrganization: "Organisation erstellen",
    joinOrganization: "Organisation beitreten",
    newProject: "Neues Projekt",
    uploadCandidate: "Kandidat hochladen",
    runComparison: "KI-Vergleich starten",
    currentPlan: "Aktueller Plan",
    upgradePlan: "Plan upgraden",
    deleteAccount: "Konto löschen",
    changePassword: "Passwort ändern",
    enable2FA: "Zwei-Faktor-Authentifizierung aktivieren"
  },
  ja: {
    welcome: "おかえりなさい",
    dashboard: "ダッシュボード",
    settings: "設定",
    projects: "プロジェクト",
    organizations: "組織",
    profile: "プロフィール",
    appearance: "外観",
    notifications: "通知",
    security: "セキュリティ",
    language: "言語",
    timezone: "タイムゾーン",
    darkMode: "ダークモード",
    saveChanges: "変更を保存",
    createOrganization: "組織を作成",
    joinOrganization: "組織に参加",
    newProject: "新しいプロジェクト",
    uploadCandidate: "候補者をアップロード",
    runComparison: "AI比較を実行",
    currentPlan: "現在のプラン",
    upgradePlan: "プランをアップグレード",
    deleteAccount: "アカウントを削除",
    changePassword: "パスワードを変更",
    enable2FA: "二要素認証を有効にする"
  }
};

export const useTranslation = (language: string) => {
  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return { t };
};
