import React, { useState, useCallback } from 'react';
import { Workflow, WorkflowNode, NodeType } from './types';
import { createInitialWorkflow, getWorkflowStats, updateNodeInTree } from './utils/workflowUtils';
import WorkflowCanvas from './components/WorkflowCanvas';
import WorkflowToolbar from './components/WorkflowToolbar';
import NodeEditor from './components/NodeEditor';
import './App.css';

const App: React.FC = () => {
  const [workflow, setWorkflow] = useState<Workflow>(createInitialWorkflow());
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const updateWorkflow = useCallback((updatedWorkflow: Workflow) => {
    setWorkflow({
      ...updatedWorkflow,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const handleAddNode = useCallback((parentId: string, type: Exclude<NodeType, 'start'>) => {
    const updatedRoot = { ...workflow.rootNode };
    updateWorkflow({
      ...workflow,
      rootNode: updatedRoot,
    });
  }, [workflow, updateWorkflow]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    // Handled in WorkflowCanvas component
  }, []);

  const handleEditNode = useCallback((node: WorkflowNode) => {
    setSelectedNode(node);
    setIsEditing(true);
  }, []);

  const handleUpdateNode = useCallback((nodeId: string, label: string) => {
    const updatedRoot = updateNodeInTree(workflow.rootNode, nodeId, { label });
    updateWorkflow({
      ...workflow,
      rootNode: updatedRoot,
    });
    setIsEditing(false);
    setSelectedNode(null);
  }, [workflow, updateWorkflow]);

  const handleNewWorkflow = useCallback(() => {
    setWorkflow(createInitialWorkflow());
  }, []);

  const handleSaveWorkflow = useCallback(() => {
    localStorage.setItem('workflow', JSON.stringify(workflow));
    alert('Workflow saved successfully!');
  }, [workflow]);

  const handleLoadWorkflow = useCallback(() => {
    const saved = localStorage.getItem('workflow');
    if (saved) {
      try {
        const parsedWorkflow = JSON.parse(saved);
        setWorkflow(parsedWorkflow);
        alert('Workflow loaded successfully!');
      } catch (error) {
        alert('Error loading workflow!');
      }
    }
  }, []);

  const stats = getWorkflowStats(workflow);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <i className="fas fa-project-diagram"></i>
          Workflow Builder
        </h1>
        <div className="app-stats">
          <span>Total Nodes: {stats.totalNodes}</span>
          <span>Actions: {stats.actionNodes}</span>
          <span>Branches: {stats.branchNodes}</span>
          <span>Ends: {stats.endNodes}</span>
        </div>
      </header>

      <WorkflowToolbar
        onNew={handleNewWorkflow}
        onSave={handleSaveWorkflow}
        onLoad={handleLoadWorkflow}
      />

      <main className="app-main">
        <WorkflowCanvas
          workflow={workflow}
          onUpdateWorkflow={updateWorkflow}
          onAddNode={handleAddNode}
          onDeleteNode={handleDeleteNode}
          onEditNode={handleEditNode}
        />
      </main>

      {isEditing && selectedNode && (
        <NodeEditor
          node={selectedNode}
          onUpdate={handleUpdateNode}
          onClose={() => {
            setIsEditing(false);
            setSelectedNode(null);
          }}
        />
      )}

      <footer className="app-footer">
        <p>
          Built with React & TypeScript • 
          <a href="https://github.com/Sumitkmt946/Workflow-Builder-UI" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
