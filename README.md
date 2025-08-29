# Assessly Frontend

A modern React-based frontend for the Assessly assessment test platform where students can participate in various assessment levels (A1, A2, B1, B2, C1, C2) and earn certificates upon completion.

## 🚀 Features

- **User Authentication**: Secure login system for students
- **Assessment Levels**: Support for A1, A2, B1, B2, C1, C2 assessment categories
- **Real-time Progress**: Track assessment progress in real-time
- **Certificate Generation**: Automatic certificate generation upon successful completion
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS
- **Toast Notifications**: User-friendly notifications using Sonner
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **React.js**: Modern React with functional components and hooks
- **TypeScript**: Type-safe JavaScript for better development experience
- **React Router**: Client-side routing for single-page application
- **Redux Toolkit Query**: Efficient data fetching and state management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality, accessible UI components
- **Sonner**: Beautiful toast notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 16.x or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd assessly-frontend
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### 4. Start Development Server

Using npm:
```bash
npm start
```

Using yarn:
```bash
yarn start
```

The application will start on `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── common/         # Common components
│   └── assessment/     # Assessment-specific components
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   ├── assessment/    # Assessment pages
├── store/             # Redux store configuration
│   ├── api/          # RTK Query API slices
│   ├── slices/       # Redux slices
│   └── index.ts      # Store configuration
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── App.tsx          # Main App component
```

## 📱 Available Scripts

- `npm start` or `yarn start` - Start development server
- `npm run build` or `yarn build` - Build for production
- `npm run lint` or `yarn lint` - Run ESLint
- `npm run type-check` or `yarn type-check` - Run TypeScript type checking

## 🎨 Styling

This project uses **Tailwind CSS** for styling with **shadcn/ui** components for a consistent design system.

### Tailwind Configuration

The Tailwind configuration is located in `index.css` and includes:
- Custom color palette
- Extended spacing and sizing utilities
- Custom component classes
- Dark mode support

### Component Library

We use **shadcn/ui** for pre-built, accessible components:
- Button, Input, Card components
- Form components with validation
- Modal and Dialog components
- Toast notifications via Sonner

## 🔄 State Management

The application uses **Redux Toolkit** with **RTK Query** for:
- User authentication state
- Assessment data management
- API data fetching and caching
- Loading and error states

### API Integration

RTK Query is configured to handle:
- Authentication endpoints
- Assessment CRUD operations
- Certificate generation
- User progress tracking


## 📦 Building for Production

Create a production build:
```bash
npm run build
```

This creates a `build/` folder with optimized production files.

## 🚀 Deployment

The build folder can be deployed to any static hosting service:
- Vercel

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api/v1` |

### Router Configuration

The app uses React Router v6 with the following routes:
- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Student dashboard
- `/student/assessments` - Assessment pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Node modules issues**: Delete `node_modules` and `package-lock.json`, then run `npm install`
2. **Port already in use**: Change the port in package.json or kill the process using port 3000
3. **API connection issues**: Verify the backend is running and the API URL is correct

### Getting Help

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure the backend server is running
4. Check network connectivity to API endpoints

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.