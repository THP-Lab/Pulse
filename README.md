# Pulsy - Application de Référendum Interactif

## 📋 Description

Pulsy est une application web interactive qui permet aux utilisateurs de répondre à des questions de référendum de manière ludique et intuitive. L'application utilise un système de cartes glissantes (swipe) pour recueillir les votes des utilisateurs.

## ✨ Fonctionnalités

- **Interface de cartes glissantes** : Répondez aux questions en glissant les cartes vers la gauche (Non) ou la droite (Oui)
- **Barre de progression** : Suivez votre avancement dans le questionnaire
- **Support tactile et souris** : Compatible avec les appareils tactiles et les ordinateurs
- **Interface responsive** : S'adapte à tous les écrans
- **Design moderne** : Interface utilisateur élégante avec Tailwind CSS et Radix UI
- **Gestion d'état** : Suivi des votes et de la progression

## 🛠️ Technologies Utilisées

- **React 19** - Framework frontend
- **TypeScript** - Typage statique
- **Vite** - Outil de build et développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Radix UI** - Composants d'interface accessibles
- **Lucide React** - Icônes modernes

## 🚀 Installation et Démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- pnpm (recommandé) ou npm

### Installation

1. **Cloner le repository**
   ```bash
   git clone git@github.com:THP-Lab/Pulse.git
   cd Pulse
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   # ou
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   pnpm dev
   # ou
   npm run dev
   ```

4. **Ouvrir l'application**
   L'application sera disponible à l'adresse : `http://localhost:5173`

### Scripts Disponibles

- `pnpm dev` - Lance le serveur de développement
- `pnpm build` - Compile l'application pour la production
- `pnpm preview` - Prévisualise la version de production
- `pnpm lint` - Vérifie le code avec ESLint

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants d'interface utilisateur
│   ├── QuestionCard.tsx # Carte de question principale
│   └── ProgressBar.tsx  # Barre de progression
├── types/              # Définitions TypeScript
├── lib/                # Utilitaires et configurations
├── assets/             # Ressources statiques
└── App.tsx             # Composant principal
```

## 🎮 Utilisation

1. **Démarrage** : L'application charge automatiquement les questions depuis `questions.json`
2. **Navigation** : Utilisez les boutons "YES" et "NO" ou glissez la carte
3. **Progression** : Suivez votre avancement avec la barre de progression
4. **Redémarrage** : Cliquez sur "Restart" pour recommencer le questionnaire

## 📊 Format des Données

L'application attend un fichier `questions.json` avec la structure suivante :

```json
{
  "questions": [
    {
      "id": "1",
      "question": "Question de référendum ?",
      "category": "Politique"
    }
  ]
}
```

## 🎨 Personnalisation

### Styles
- Les styles sont gérés avec Tailwind CSS
- Les composants UI utilisent Radix UI pour l'accessibilité
- Les animations sont personnalisables via CSS

### Composants
- `QuestionCard` : Carte principale avec interactions de glissement
- `ProgressBar` : Barre de progression personnalisable
- Composants UI réutilisables dans `components/ui/`

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

Développé dans le cadre du projet THP Lab.

---

**Pulsy** - Rendez le vote plus interactif et engageant ! 🗳️
