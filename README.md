# Developer Portfolio - React Vite Version

A modern developer portfolio built with React and Vite, converted from the original Next.js version.

## 🚀 Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Works on all devices
- 🎭 **Lottie Animations** - Smooth animations
- 📧 **Contact Form** - With Web3Forms integration
- 🔗 **React Router** - Client-side routing

## 📁 Project Structure

```
react-vite-portfolio/
├── public/               # Static assets
│   ├── skills/          # Skill SVG icons
│   ├── hero.svg
│   ├── section.svg
│   ├── blur-23.svg
│   └── profile.png
├── server/              # Express backend (optional)
│   ├── index.js
│   └── package.json
├── src/
│   ├── assets/
│   │   └── lottie/      # Lottie animation JSON files
│   ├── components/
│   │   ├── helper/      # Helper components
│   │   └── homepage/    # Homepage sections
│   ├── pages/           # Page components
│   ├── styles/          # SCSS styles
│   └── utils/           # Utility functions & data
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🛠️ Installation

1. **Clone or copy the project:**
   ```bash
   cd react-vite-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Add your Web3Forms API key** (for contact form):
   - Get a free API key at [web3forms.com](https://web3forms.com)
   - Add it to your `.env` file

5. **Copy static assets from original project:**
   - Copy SVG files to `public/` folder
   - Copy skill icons to `public/skills/` folder
   - Copy your profile image to `public/profile.png`
   - Copy Lottie JSON files to `src/assets/lottie/`

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📧 Backend Server (Optional)

If you want to use the server-side contact form with Telegram/Email notifications:

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Set environment variables
# Edit .env in the server folder or root

# Start server
npm start
```

Run both frontend and backend simultaneously:
```bash
npm run dev:all
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root:

```env
# Frontend
VITE_WEB3FORMS_KEY=your_web3forms_key
VITE_GTM_ID=your_google_tag_manager_id

# Backend (optional)
EMAIL_ADDRESS=your_email@gmail.com
GMAIL_PASSKEY=your_gmail_app_password
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### Customization

- **Personal Data:** Edit `src/utils/data/personal-data.js`
- **Skills:** Edit `src/utils/data/skills.js`
- **Projects:** Edit `src/utils/data/projects-data.js`
- **Education:** Edit `src/utils/data/educations.js`
- **Experience:** Edit `src/utils/data/experience.js`

## 📝 Migration Notes

### Changes from Next.js

| Feature | Next.js | React Vite |
|---------|---------|------------|
| Routing | File-based (app/) | React Router |
| Images | next/image | Regular img tags |
| Links | next/link | React Router Link |
| API Routes | Built-in | Express server |
| Env Vars | NEXT_PUBLIC_ | VITE_ |
| SSR | Built-in | Client-side only |

### Key Differences

1. **No SSR/SSG** - This version is purely client-side rendered
2. **API Routes** - Moved to separate Express server
3. **Environment Variables** - Use `import.meta.env.VITE_*` instead of `process.env.NEXT_PUBLIC_*`
4. **Dynamic Imports** - Lottie is imported directly (no need for dynamic import)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Original template by [Abu Said](https://github.com/said7388/developer-portfolio)
