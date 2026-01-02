# Workflow Builder - Setup Guide

## Quick Setup Instructions

### Step 1: Navigate to Project Directory
```bash
cd workflow-builder
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm start
```

### Step 4: Open in Browser
Open [http://localhost:3000](http://localhost:3000) in your browser

---

## Fixed Issues

### Issue 1: Duplicate Declaration Error
**Problem**: `WorkflowNode` type and component had naming conflict  
**Solution**: Renamed component to `WorkflowNodeComponent`

### Issue 2: Missing Import
**Problem**: `findNodeById` function was not imported  
**Solution**: Added missing import from `workflowUtils`

---

## Project Features

✅ **Visual Workflow Canvas** - Interactive canvas with grid background  
✅ **4 Node Types** - Start, Action, Branch, End nodes  
✅ **Smart Interactions** - Right-click, double-click, hover effects  
✅ **Auto-reconnection** - When deleting nodes, parents connect to children  
✅ **Save/Load** - Persistent storage in localStorage  
✅ **Professional UI** - Dark theme with smooth animations  
✅ **TypeScript** - Full type safety  
✅ **Responsive Design** - Works on mobile and desktop  

---

## File Structure

```
workflow-builder/
├── 📦 package.json              # Dependencies and scripts
├── 📄 README.md                 # Complete documentation
├── 📄 SETUP_GUIDE.md            # This file
├── ⚙️ tsconfig.json             # TypeScript config
├── 🌐 public/
│   ├── index.html              # HTML template
│   └── manifest.json           # PWA manifest
└── 📁 src/
    ├── 🎯 types/index.ts       # TypeScript interfaces
    ├── 🛠 utils/workflowUtils.ts # Core logic functions
    ├── 📱 App.tsx              # Main app component
    ├── 🎨 App.css              # App styles
    ├── ▶️ index.tsx            # Entry point
    ├── 🌈 index.css            # Global styles
    └── 🧩 components/
        ├── WorkflowCanvas.tsx  # Main canvas
        ├── WorkflowNode.tsx    # Individual nodes
        ├── ConnectionLine.tsx  # SVG connections
        ├── WorkflowToolbar.tsx # Top toolbar
        ├── NodeEditor.tsx      # Edit modal
        └── *.css               # Component styles
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from create-react-app |

---

## How to Use the Application

### 1. Creating Workflows
- Start with the green "Start" node
- Right-click on any node to add children
- Choose from: Action (blue), Branch (yellow), End (gray)

### 2. Editing Nodes
- **Double-click** any node to edit its label
- Modal will open with input field
- Press Enter or click Save to confirm

### 3. Deleting Nodes
- **Hover** over a node to see action buttons
- Click the **red trash icon** to delete
- Parent will automatically connect to children

### 4. Saving & Loading
- Click **Save** button to store in localStorage
- Click **Load** button to restore saved workflow
- Click **New** to start fresh

---

## Development Tips

### Code Style
- TypeScript for type safety
- CSS Modules for scoped styling
- React Hooks for state management
- Functional components with TypeScript

### Key Functions
- `addNodeToParent()` - Add new nodes to workflow
- `deleteNodeFromTree()` - Delete nodes with auto-reconnection
- `updateNodeInTree()` - Update node properties
- `calculateChildPosition()` - Auto-layout algorithm

---

## Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Automatic deployment on push
3. Get live URL instantly

### Netlify
1. Drag & drop the `build` folder
2. Or connect Git for auto-deployment

### GitHub Pages
```bash
npm run build
npx gh-pages -d build
```

---

## Troubleshooting

### Error: "Cannot find module"
Solution: Run `npm install` to install dependencies

### Error: "react-scripts: not found"
Solution: Make sure you're in the correct directory and run `npm install`

### Port 3000 already in use
Solution: The app will automatically ask to use a different port

---

## Assignment Requirements Covered

✅ **Data Modeling**: Efficient JSON structure for workflow hierarchy  
✅ **Component Architecture**: Modular and reusable UI components  
✅ **State Management**: React hooks managing dynamic structure  
✅ **User Experience**: Smooth, intuitive interactions  

---

## Bonus Features Implemented

✅ **Save/Load**: Persistent storage  
✅ **Context Menu**: Right-click interactions  
✅ **Professional UI**: Clean design with animations  

---

**Your project is ready! 🚀**

Follow the setup steps above and you'll have a fully functional Workflow Builder application that meets all the assignment requirements.