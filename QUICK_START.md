# Workflow Builder - Quick Start Guide

## 🚀 Getting Started (30 seconds)

### Option 1: Development Mode (Recommended)
```bash
cd "c:\Users\ashok\Downloads\Home assignment\workflow-builder"
npm install
npm start
```
Opens automatically at `http://localhost:3000`

### Option 2: Production Build
```bash
cd "c:\Users\ashok\Downloads\Home assignment\workflow-builder"
npm install
npm run build
npm install -g serve
serve -s build
```
Then visit `http://localhost:5000`

---

## 📖 How to Use

### Create Your First Workflow

1. **You'll see a green "Start" node** - This is your workflow entry point
2. **Right-click on the Start node** - A context menu appears
3. **Click "Add Action Node"** - A blue rectangle appears below
4. **Edit the label** - Double-click the action node to change its name
5. **Continue adding nodes** - Build your workflow step by step

### Node Types Explained

- 🟢 **Start** (Green Circle) - Workflow begins here
  - Can have children
  - Cannot be deleted
  
- 🔵 **Action** (Blue Rectangle) - A task or step
  - One outgoing connection
  - Can add: another Action, Branch, or End
  
- 🟡 **Branch** (Yellow Diamond) - Decision point
  - Multiple branches (True/False paths)
  - Each branch can have its own path
  
- ⚫ **End** (Gray Circle) - Workflow completes
  - No children
  - Terminates the path

### Actions You Can Perform

#### Add a Node
```
Right-click on any node → Select node type
OR
Hover over node → Click the + buttons
```

#### Edit a Node
```
Double-click the node → Edit the label → Press Enter or click Save
```

#### Delete a Node
```
Hover over node → Click the trash icon → Confirm deletion
Note: The node's children automatically connect to its parent
```

#### Save Your Work
```
Click "Save" button in toolbar → Workflow saved to browser storage
```

#### Load Saved Work
```
Click "Load" button in toolbar → Your last saved workflow appears
```

#### Start Fresh
```
Click "New" button in toolbar → Creates a new blank workflow
```

---

## 🎯 Example Workflows

### Example 1: Simple Linear Workflow
```
Start → Send Email → Log Result → End
```

1. Start node (already there)
2. Right-click → Add Action: "Send Email"
3. Right-click Send Email → Add Action: "Log Result"
4. Right-click Log Result → Add End node

### Example 2: Conditional Workflow
```
Start → Check Condition (Branch)
         ├→ If True: Process Data → End
         └→ If False: Log Error → End
```

1. Start node
2. Right-click → Add Branch: "Check Condition"
3. Right-click condition → Add Action: "Process Data"
4. Right-click Process Data → Add End
5. Right-click condition → Add Action: "Log Error"
6. Right-click Log Error → Add End

### Example 3: Complex Workflow
```
Start → Validate Input
        ├→ Valid (Branch)
        │  ├→ Process
        │  └→ Send Success → End
        └→ Invalid
           ├→ Log Error → End
           └→ Retry → Validate Input (loops back)
```

---

## 🎮 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Edit Node | Double-click |
| Save Edit | Enter |
| Cancel Edit | Escape |
| Add Node | Right-click → Select |
| Delete Node | Click trash icon |

---

## 💾 Data Storage

Your workflows are saved in **browser localStorage**:
- Location: Browser developer tools → Application → Local Storage
- Key: `workflow`
- Format: JSON
- Persists across browser sessions
- Survives browser restart

---

## 🐛 Troubleshooting

### Problem: Node won't add
**Solution**: Make sure you're right-clicking on a non-End node

### Problem: Can't delete Start node
**Solution**: This is intentional - Start node is always required

### Problem: Workflow didn't save
**Solution**: Check browser's localStorage isn't full or disabled

### Problem: Positions look weird
**Solution**: Reload the page - positions auto-calculate on load

### Problem: Old workflow won't load
**Solution**: Click "New" first, then "Load" to ensure clean state

---

## 📊 What You'll See

### Node Statistics (Top Right)
Shows real-time count of:
- Total Nodes
- Actions count
- Branches count
- Ends count

### Visual Feedback
- **Hover**: Nodes scale up slightly
- **Colors**: Each type has distinct color
- **Lines**: Curved connections show relationships
- **Icons**: Quick visual identification

---

## 🧪 Test Cases to Try

### ✅ Test Adding Nodes
1. Add an Action node
2. Add a Branch node with multiple children
3. Verify automatic positioning

### ✅ Test Deleting Nodes
1. Create: Start → Action → Action → End
2. Delete the middle Action
3. Verify that children connect to parent

### ✅ Test Editing Nodes
1. Double-click a node
2. Change the label
3. Press Enter
4. Verify change appears immediately

### ✅ Test Save/Load
1. Create a workflow
2. Click Save
3. Add more nodes
4. Click Load
5. Verify original workflow is restored

### ✅ Test Branch Logic
1. Create a Branch node
2. Add Action to first branch
3. Add different Action to second branch
4. Verify both paths exist

---

## 🎓 Features Demonstrated

This application showcases:

✨ **Component Design** - Modular React components  
✨ **State Management** - React Hooks (useState, useCallback)  
✨ **TypeScript** - Full type safety  
✨ **Data Structures** - Tree traversal algorithms  
✨ **UI/UX** - Professional design with smooth interactions  
✨ **Responsive Design** - Works on all screen sizes  
✨ **Browser APIs** - localStorage integration  
✨ **SVG Graphics** - Connection lines rendering  

---

## 📞 Need Help?

Check the following files:
- **README.md** - Full feature documentation
- **SETUP_GUIDE.md** - Installation help
- **IMPLEMENTATION_SUMMARY.md** - Technical details

---

**Enjoy building workflows! 🎉**
