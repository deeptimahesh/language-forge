# Language Forge: Project Setup

This document provides instructions for setting up the Language Forge development
environment and getting started with the project.

## 1. Prerequisites

Before beginning development, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- **MongoDB** (v5.0 or higher) for database

Optional but recommended:

- **VSCode** with recommended extensions
- **MongoDB Compass** for database management

## 2. Initial Setup

### 2.1 Clone the Repository

```bash
git clone https://github.com/your-username/language-forge.git
cd language-forge
```

### 2.2 Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn
```

### 2.3 Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/language-forge
MONGODB_DB=language-forge

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# OpenAI API (for AI features)
OPENAI_API_KEY=your-openai-api-key
```

### 2.4 Start Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 3. Project Structure Overview

```bash
language-forge/
├── src/                        # Source code
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── lib/                    # Utility functions
│   ├── ai/                     # AI integration
│   ├── server/                 # Server-side code
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── docs/                       # Documentation
├── architecture/               # Architecture diagrams and specs
├── __tests__/                  # Test files
├── .env.local                  # Environment variables (create this)
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 4. Development Workflow

### 4.1 Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/[feature-name]` - Feature branches
- `bugfix/[bug-description]` - Bug fix branches

### 4.2 Typical Development Cycle

1. Create a feature branch from `develop`
2. Implement the feature with tests
3. Submit a pull request to `develop`
4. After review and approval, merge to `develop`
5. Periodically, `develop` is merged to `main` for releases

### 4.3 Code Style and Linting

The project uses ESLint and Prettier for code formatting. Run linting with:

```bash
# Using npm
npm run lint

# Using yarn
yarn lint
```

Format code with:

```bash
# Using npm
npm run format

# Using yarn
yarn format
```

## 5. Working with MongoDB

### 5.1 Local MongoDB Setup

For local development, a MongoDB instance is required:

```bash
# Start MongoDB (macOS/Linux)
mongod --dbpath /path/to/data/directory

# Connect to MongoDB shell
mongosh
```

### 5.2 Database Initialization

The application will create collections automatically as needed. You can also
manually set up the database:

```javascript
// In MongoDB shell
use language-forge
db.createCollection('projects')
db.createCollection('users')
```

## 6. AI Integration Setup

### 6.1 OpenAI API Configuration

1. Obtain an API key from [OpenAI](https://platform.openai.com/)
2. Add the key to your `.env.local` file
3. Test the API connection with:

```bash
# Using npm
npm run test:ai

# Using yarn
yarn test:ai
```

### 6.2 LangChain Configuration

The project uses LangChain for agent orchestration. Customize agent behavior in:

```bash
src/ai/agents/
src/ai/chains/
src/ai/prompts/
```

## 7. Testing

### 7.1 Running Tests

```bash
# Run all tests
npm test

# Run specific tests
npm test -- -t "component name"

# Watch mode
npm test -- --watch
```

### 7.2 Test Structure

- Unit tests: `__tests__/unit/`
- Integration tests: `__tests__/integration/`
- E2E tests: `__tests__/e2e/`

## 8. Deployment

### 8.1 Vercel Deployment

The project is configured for deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

### 8.2 MongoDB Atlas Setup

For production, it's recommended to use MongoDB Atlas:

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configure network access and database users
3. Update the `MONGODB_URI` in the production environment

## 9. Troubleshooting

### Common Issues

1. **Connection to MongoDB fails**
   - Check if MongoDB is running
   - Verify connection string in `.env.local`

2. **AI features not working**
   - Verify OpenAI API key
   - Check API rate limits
   - Look for specific error messages in logs

3. **Type errors in TypeScript**
   - Run `npm run type-check`
   - Update type definitions if needed

## 10. Contributing

1. Review the architecture documents
2. Follow the coding standards
3. Write tests for new features
4. Update documentation
5. Submit a pull request with a clear description

## 11. Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [LangChain Documentation](https://js.langchain.com/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
