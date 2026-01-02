import React, { useState } from 'react';
import { WorkflowNode, NodeType } from '../types';
import { getNodeColor, canAddNode, canDeleteNode } from '../utils/workflowUtils';
import './WorkflowNode.css';

interface WorkflowNodeProps {
  node: WorkflowNode;
  onAddNode: (type: Exclude<NodeType, 'start'>) => void;
  onDeleteNode: (nodeId: string) => void;
  onEditNode: (node: WorkflowNode) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  level: number;
}

const WorkflowNodeComponent: React.FC<WorkflowNodeProps> = ({
  node,
  onAddNode,
  onDeleteNode,
  onEditNode,
  onContextMenu,
  level,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const nodeColor = getNodeColor(node.type);
  const canAdd = canAddNode(node.type);
  const canDelete = canDeleteNode(node.type);

  const handleDoubleClick = () => {
    if (node.type !== 'start') {
      onEditNode(node);
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'start':
        return <i className="fas fa-play" />;
      case 'action':
        return <i className="fas fa-cog" />;
      case 'branch':
        return <i className="fas fa-code-branch" />;
      case 'end':
        return <i className="fas fa-stop" />;
      default:
        return <i className="fas fa-square" />;
    }
  };

  const getNodeShape = () => {
    switch (node.type) {
      case 'start':
      case 'end':
        return 'circle';
      case 'branch':
        return 'diamond';
      default:
        return 'rectangle';
    }
  };

  return (
    <div
      className={`workflow-node node-${getNodeShape()}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        backgroundColor: nodeColor,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
      onContextMenu={onContextMenu}
    >
      <div className="node-content">
        <div className="node-icon">
          {getNodeIcon()}
        </div>
        <div className="node-label">
          {node.label}
        </div>
      </div>

      <div className="node-actions">
        {canAdd && (
          <div className="add-node-actions">
            <button
              className="node-btn add-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddNode('action');
              }}
              title="Add Action Node"
            >
              <i className="fas fa-plus" />
            </button>
            {node.type === 'branch' && (
              <button
                className="node-btn add-branch-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddNode('branch');
                }}
                title="Add Branch Node"
              >
                <i className="fas fa-code-branch" />
              </button>
            )}
            <button
              className="node-btn add-end-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddNode('end');
              }}
              title="Add End Node"
            >
              <i className="fas fa-stop" />
            </button>
          </div>
        )}

        {canDelete && (
          <button
            className="node-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this node?')) {
                onDeleteNode(node.id);
              }
            }}
            title="Delete Node"
          >
            <i className="fas fa-trash-alt" />
          </button>
        )}
      </div>

      {node.children.length === 0 && canAdd && (
        <div className="connection-point" />
      )}
    </div>
  );
};

export default WorkflowNodeComponent;