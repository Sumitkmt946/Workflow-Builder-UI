import React, { useState, useEffect } from 'react';
import { WorkflowNode } from '../types';
import './NodeEditor.css';

interface NodeEditorProps {
  node: WorkflowNode;
  onUpdate: (nodeId: string, label: string) => void;
  onClose: () => void;
}

const NodeEditor: React.FC<NodeEditorProps> = ({
  node,
  onUpdate,
  onClose,
}) => {
  const [label, setLabel] = useState(node.label);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setLabel(node.label);
  }, [node]);

  const handleSave = () => {
    onUpdate(node.id, label);
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="node-editor-overlay" onClick={handleCancel}>
      <div
        className={`node-editor ${isVisible ? 'visible' : 'hidden'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="node-editor-header">
          <h3>Edit Node</h3>
          <button className="close-btn" onClick={handleCancel}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="node-editor-body">
          <div className="form-group">
            <label htmlFor="node-label">Node Label:</label>
            <input
              id="node-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter node label..."
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Node Type:</label>
            <div className="node-type-display">
              <i className={`fas ${
                node.type === 'action' ? 'fa-cog' :
                node.type === 'branch' ? 'fa-code-branch' :
                node.type === 'end' ? 'fa-stop' : 'fa-play'
              }`} />
              <span className="capitalize">{node.type}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Node ID:</label>
            <input type="text" value={node.id} readOnly className="readonly" />
          </div>
        </div>

        <div className="node-editor-footer">
          <button className="btn secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeEditor;