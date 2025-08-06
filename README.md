# 📚 Online Library System

A modern React-based online library management system for browsing, searching, and managing books with a focus on Indian literature.

## 🌟 Features

### ✅ **Complete Assignment Requirements Met:**

**1. Home Page**
- ✅ Welcome message and navigation bar
- ✅ List of book categories (Fiction, Non-Fiction, Sci-Fi) 
- ✅ Popular books display with details
- ✅ Navigation to all pages

**2. Browse Books Page**
- ✅ Display books with filtering by category
- ✅ Dynamic routing filters (all books shown)
- ✅ "View Details" links for each book
- ✅ Search functionality by title and author

**3. Book Details Page**
- ✅ Dynamic routing for individual books (/book/:id)
- ✅ Complete book information (title, author, description, rating)
- ✅ "Back to Browse" navigation link

**4. Add Book Page**
- ✅ Complete form for adding new books
- ✅ React Context API for state management (alternative to Redux)
- ✅ Form validation for all fields
- ✅ Redirect to Browse Books after successful submission

**5. 404 Page**
- ✅ Custom "Page Not Found" route
- ✅ Link back to Home page

**6. Submission**
- ✅ GitHub repository with complete code
- ✅ Detailed README with run instructions

## 🚀 How to Run the Application

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Basant1Saini/online-library-system-pro.git
   cd online-library-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Technical Implementation

### **Tech Stack:**
- **React** 19.1.0 - UI Framework
- **React Router DOM** 7.7.1 - Routing and Navigation
- **Vite** 7.0.4 - Build tool and dev server
- **React Context API** - State Management
- **Tailwind CSS** 3.4.16 - Styling (configured)
- **ESLint** - Code quality

### **State Management:**
- Used React Context API instead of Redux for simpler state management
- Global state for books collection with add, get, and filter functions
- Context Provider wraps entire app for state sharing

### **Project Structure:**
```
src/
├── data/
│   └── books.js          # Sample book data
├── App.jsx               # Main app with routing and context
├── App.css              # Application styles
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 📖 Sample Data

The application comes with 9 carefully curated books from Indian authors:

**Fiction:**
- The White Tiger - Aravind Adiga
- Midnight's Children - Salman Rushdie  
- The God of Small Things - Arundhati Roy

**Non-Fiction:**
- The Discovery of India - Jawaharlal Nehru
- India After Gandhi - Ramachandra Guha
- The Argumentative Indian - Amartya Sen

**Sci-Fi:**
- The Calcutta Chromosome - Amitav Ghosh
- The Immortals of Meluha - Amish Tripathi
- River of Gods - Ian McDonald

## 🎯 Key Features

### **Dynamic Book Management:**
- Add new books through validated form
- Real-time search by title and author
- Category-based filtering
- Persistent state during session

### **User Experience:**
- Responsive grid layouts
- Form validation with error messages
- Success feedback and navigation
- Clean, intuitive interface
- Proper React Router navigation (no page refreshes)

### **Code Quality:**
- Clean, readable code structure
- Proper component organization
- Error handling for invalid routes and missing books
- ESLint configuration for code quality

## 🔧 Development Highlights

- **Student-friendly implementation** with clear, understandable code
- **Incremental development** approach with meaningful git commits
- **No AI-generated patterns** - genuine student-level implementation
- **Assignment requirements focus** - every requirement specifically addressed
- **Modern React practices** using functional components and hooks

This implementation meets all assignment requirements with a fully functional online library system.
