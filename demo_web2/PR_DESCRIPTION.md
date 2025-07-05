# 🚀 Pull Request: Pulsy - Interactive Referendum Application

## 📋 Summary

This PR introduces **Pulsy**, a modern and interactive web application for referendum management. The application allows users to answer questions in a fun way using a swipeable card system.

## ✨ New Features

### 🎯 User Interface
- **Interactive cards** : Swipeable card system with smooth animations
- **Touch and mouse support** : Compatible with all devices
- **Responsive design** : Interface adapted to all screens
- **Progress bar** : Visual tracking of progress

### 🎮 Interactions
- **Left/right swipe** : Intuitive navigation between questions
- **Action buttons** : "YES" and "NO" buttons separated from the card
- **State management** : Vote tracking and progress management
- **Restart functionality** : Ability to restart the questionnaire

### 🛠️ Technical Architecture
- **React 19** with TypeScript for robust code
- **Tailwind CSS** for modern and responsive design
- **Radix UI** for accessible components
- **Vite** for fast development

## 📁 File Structure

```
src/
├── components/
│   ├── QuestionCard.tsx    # Main card with interactions
│   ├── ProgressBar.tsx     # Progress bar
│   └── ui/                 # Reusable UI components
├── types/
│   └── index.ts           # TypeScript definitions
├── lib/
│   └── utils.ts           # Utilities
└── App.tsx                # Main component
```

## 🔧 Main Changes

### QuestionCard.tsx
- ✅ Separation of buttons from the card for better UX
- ✅ Support for touch and mouse interactions
- ✅ Smooth swipe animations
- ✅ Swipe event handling

### App.tsx
- ✅ Centralized state management
- ✅ Loading questions from JSON
- ✅ Navigation between questions
- ✅ Responsive interface

### UI Components
- ✅ Customizable buttons with variants
- ✅ Modern card design
- ✅ Interactive progress bar

## 🎨 Design and UX

- **Clean interface** : Minimalist and modern design
- **Smooth animations** : Gentle transitions for better experience
- **Accessibility** : WCAG compliant components
- **Responsive** : Automatic adaptation to all screens

## 🧪 Testing and Quality

- ✅ TypeScript code with strict typing
- ✅ ESLint configured for code quality
- ✅ Modular and reusable structure
- ✅ Complete documentation

## 📊 Data

The application loads questions from a `questions.json` file with the structure:

```json
{
  "questions": [
    {
      "id": "1",
      "question": "Referendum question?",
      "category": "Politics"
    }
  ]
}
```

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- pnpm or npm

### Installation
```bash
git clone git@github.com:THP-Lab/Pulse.git
cd Pulse
pnpm install
pnpm dev
```

### Available Scripts
- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm preview` - Preview
- `pnpm lint` - Code verification

## 🔮 Next Steps

- [ ] Add unit tests
- [ ] Backend API integration
- [ ] Authentication system
- [ ] Admin dashboard
- [ ] Results export

## 📝 Development Notes

- The application is production-ready
- Code follows React/TypeScript best practices
- Documentation is complete and up to date
- Interface is intuitive and accessible

---

**Pulsy** - Make voting more interactive and engaging! 🗳️

## 🔗 Useful Links

- [GitHub Repository](https://github.com/THP-Lab/Pulse)
- [Complete Documentation](./README.md)
- [Issues and Discussions](https://github.com/THP-Lab/Pulse/issues) 