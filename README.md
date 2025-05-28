# blogging

Blogging Frontend Application

This is a single-user blogging platform frontend. It allows authenticated users to create, view, and manage articles, while guests can browse content and leave comments.

✅ Implemented Functionality
👤 Public Side
Article List View: Lists all articles ordered by date (descending)
Article Detail View: Displays full article content (Markdown rendered)

🔐 Admin Side
Login Page: Auth via API (token + API key)
My Articles Table: Admin list of all created articles (with delete)
Create Article View: Add a new article (title, perex, content)

🧪 Unit Tests
Unit tests written for key components such as:
Article
ArticleDetails
Test framework: Vitest + @testing-library/react

🔧 Technologies Used
React 19 with React Router DOM
Redux Toolkit for state management
Axios for HTTP requests
SASS Modules for styling
React Hook Form + Zod for form validation
@uiw/react-md-editor for markdown editing
Vitest for unit testing

🚀 Getting Started

1. Install dependencies
   npm install
2. Create .env or hardcode values for testing
   You'll need:
   API_KEY (received from tenant creation)
   username & password for login

3. Run development server
   npm run dev
4. Run unit tests
   npm run test
   Or with interactive UI:
   npm run test:ui

🧪 Testing Details
Tested components:

<Article />
<ArticleDetail />

Test tools:
Vitest (unit test runner)
@testing-library/react
jsdom (test environment)

📦 Scripts
Command Description
npm run dev Start local dev server
npm run build Build production bundle
npm run test Run all unit tests
npm run test:ui Run tests with UI
npm run lint Lint all files
npm run format Format code with Prettier

📝 Future Work / Improvements
Implement edit article functionality

Add sorting/filtering in article list table

Add loading spinners and improved error boundaries

Expand test coverage
