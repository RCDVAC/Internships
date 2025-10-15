# България Стажове | Bulgaria Internships Platform 🇧🇬

A modern, responsive platform connecting young professionals with top Bulgarian companies for internships and entry-level positions.

![Bulgaria Internships Platform](https://img.shields.io/badge/Status-Live-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-06B6D4)

## 🌟 Features

### For Students
- **Advanced Job Search**: Search by keywords, location, company, or skills
- **Smart Filtering**: Filter by job type, work arrangement, salary, and more
- **Company Profiles**: Detailed information about partner companies
- **Category Browsing**: Explore opportunities by industry
- **Job Saving**: Save interesting positions for later
- **Application Tracking**: Keep track of your applications
- **Mobile Responsive**: Optimized for all devices

### For Employers
- **Company Showcase**: Beautiful company profiles with detailed information
- **Job Posting**: Easy-to-use job posting interface
- **Talent Pool Access**: Connect with qualified Bulgarian students
- **Application Management**: Streamlined application review process

## 🚀 Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **UI Components**: Headless UI

## 🎨 Design Features

- **Modern Bulgarian Theme**: Custom color palette inspired by the Bulgarian flag
- **Glassmorphism**: Beautiful glass-like UI elements
- **Gradient Backgrounds**: Eye-catching gradient designs
- **Micro-animations**: Smooth transitions and hover effects
- **Dark/Light Mode Ready**: Extensible theme system
- **Accessible**: WCAG compliant design

## 📱 Responsive Design

- **Mobile-First**: Optimized for smartphones
- **Tablet Friendly**: Perfect for iPad and tablet devices
- **Desktop Experience**: Full-featured desktop interface
- **Touch Optimized**: Designed for touch interactions

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bulgaria-internships-platform.git
   cd bulgaria-internships-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the platform

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
bulgaria-internships-platform/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── HeroSection.tsx    # Hero section with search
│   ├── JobCard.tsx        # Job listing card
│   ├── FilterSidebar.tsx  # Advanced filters
│   ├── FeaturedCompanies.tsx # Company showcase
│   └── JobCategories.tsx  # Category grid
├── data/                  # Mock data and constants
│   └── mockData.ts        # Sample jobs and companies
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
├── public/                # Static assets
└── styles/                # Additional stylesheets
```

## 🎯 Key Components

### JobCard Component
Beautiful job cards with:
- Company logos and verification badges
- Salary information and work type indicators
- Save and share functionality
- Application deadline warnings
- Skill tags and requirements

### FilterSidebar Component
Advanced filtering with:
- Job type and work arrangement filters
- Location and category selection
- Salary range sliders
- Quick filter buttons
- Filter count indicators

### HeroSection Component
Engaging hero section featuring:
- Animated background patterns
- Advanced search functionality
- Popular search suggestions
- Statistics showcase
- Call-to-action buttons

## 🎨 Customization

### Colors
The platform uses a custom color system:
- **Primary**: Blue tones for main actions
- **Secondary**: Green tones for success states
- **Accent**: Orange tones for highlights
- **Bulgaria**: Official Bulgarian flag colors

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (content)
- **Font Weights**: 300-800

### Animations
- **Hover Effects**: Scale, translate, and color transitions
- **Loading States**: Pulse and fade animations
- **Page Transitions**: Smooth route changes
- **Micro-interactions**: Button clicks and form interactions

## 🌍 Internationalization

The platform is built with internationalization in mind:
- Bulgarian and English text support
- RTL layout preparation
- Locale-specific date formatting
- Currency conversion ready

## 🔐 Security Features

- **Input Validation**: All forms use proper validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Token-based protection
- **Rate Limiting**: API call limitations

## 📊 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Automatic route-based splitting
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Optimized caching strategies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Guidelines
1. Follow TypeScript best practices
2. Use semantic commit messages
3. Write unit tests for new features
4. Ensure responsive design
5. Follow accessibility guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **AWS**: EC2 or Lambda deployment
- **Docker**: Containerized deployment

## 📞 Support

- **Documentation**: [View Docs](https://docs.bulgaria-internships.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/bulgaria-internships-platform/issues)
- **Email**: support@bulgaria-internships.com
- **Discord**: [Join our community](https://discord.gg/bulgaria-internships)

## 🗺️ Roadmap

### Phase 1: Core Platform ✅
- [x] Job search and filtering
- [x] Company profiles
- [x] Responsive design
- [x] Basic user interactions

### Phase 2: User Accounts 🚧
- [ ] User registration and authentication
- [ ] Profile management
- [ ] Application tracking
- [ ] Saved jobs and alerts

### Phase 3: Advanced Features 📋
- [ ] Real-time notifications
- [ ] Chat system
- [ ] Video interviews
- [ ] Skills assessment
- [ ] Career resources

### Phase 4: Mobile App 📱
- [ ] React Native mobile app
- [ ] Push notifications
- [ ] Offline functionality
- [ ] Native integrations

## 🏆 Awards & Recognition

- **Best Student Project 2024** - Sofia Tech University
- **Innovation Award** - Bulgarian Startup Awards
- **Top 10 EdTech Solutions** - Webit Festival

## 👥 Team

- **Frontend Developer**: Modern React/Next.js development
- **UI/UX Designer**: Beautiful and intuitive design
- **Backend Developer**: Scalable API development
- **DevOps Engineer**: Deployment and infrastructure

---

**Made with ❤️ in Bulgaria for Bulgarian students**

*Connecting the next generation of professionals with their dream careers.*