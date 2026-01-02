import React from 'react';
import './WorkflowToolbar.css';

interface WorkflowToolbarProps {
  onNew: () => void;
  onSave: () => void;
  onLoad: () => void;
}

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  onNew,
  onSave,
  onLoad,
}) => {
  return (
    <div className="workflow-toolbar">
      <div className="toolbar-section">
        <button className="toolbar-btn primary" onClick={onNew}>
          <i className="fas fa-file" />
          New
        </button>
        <button className="toolbar-btn success" onClick={onSave}>
          <i className="fas fa-save" />
          Save
        </button>
        <button className="toolbar-btn info" onClick={onLoad}>
          <i className="fas fa-folder-open" />
          Load
        </button>
      </div>

      <div className="toolbar-section">
        <div className="toolbar-info">
          <i className="fas fa-info-circle" />
          <span>Right-click on nodes to add children</span>
        </div>
      </div>

      <div className="toolbar-section">
        <div className="toolbar-shortcuts">
          <span>Shortcuts:</span>
          <span className="shortcut">Double-click to edit</span>
          <span className="shortcut">Right-click for menu</span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowToolbar;