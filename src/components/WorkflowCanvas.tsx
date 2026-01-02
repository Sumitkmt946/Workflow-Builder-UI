import React, { useCallback, useState } from 'react';
import { Workflow, WorkflowNode, NodeType } from '../types';
import { 
  addNodeToParent, 
  deleteNodeFromTree,
  canAddNode, 
  canDeleteNode,
  createNode,
  calculateChildPosition,
  findNodeById
} from '../utils/workflowUtils';
import WorkflowNodeComponent from './WorkflowNode';
import ConnectionLine from './ConnectionLine';
import './WorkflowCanvas.css';

interface WorkflowCanvasProps {
  workflow: Workflow;
  onUpdateWorkflow: (workflow: Workflow) => void;
  onAddNode: (parentId: string, type: Exclude<NodeType, 'start'>) => void;
  onDeleteNode: (nodeId: string) => void;
  onEditNode: (node: WorkflowNode) => void;
}

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflow,
  onUpdateWorkflow,
  onAddNode,
  onDeleteNode,
  onEditNode,
}) => {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    parentId: string;
  }>({ visible: false, x: 0, y: 0, parentId: '' });

  const handleAddNode = useCallback((parentId: string, type: Exclude<NodeType, 'start'>) => {
    const parentNode = findNodeById(workflow.rootNode, parentId);
    if (!parentNode || !canAddNode(parentNode.type)) return;

    const newNode = createNode(
      type,
      type === 'action' ? 'New Action' : type === 'branch' ? 'New Condition' : 'End',
      calculateChildPosition(parentNode, parentNode.children.length),
      parentId
    );

    const updatedRootNode = addNodeToParent(workflow.rootNode, {
      parentId,
      type,
      label: newNode.label,
    });

    onUpdateWorkflow({
      ...workflow,
      rootNode: updatedRootNode,
    });

    setContextMenu({ visible: false, x: 0, y: 0, parentId: '' });
  }, [workflow, onUpdateWorkflow]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    const nodeToDelete = findNodeById(workflow.rootNode, nodeId);
    if (!nodeToDelete || !canDeleteNode(nodeToDelete.type)) return;

    const updatedRootNode = deleteNodeFromTree(workflow.rootNode, nodeId);
    onUpdateWorkflow({
      ...workflow,
      rootNode: updatedRootNode,
    });

    onDeleteNode(nodeId);
  }, [workflow, onUpdateWorkflow, onDeleteNode]);

  const handleContextMenu = useCallback((e: React.MouseEvent, parentId: string) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      parentId,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, parentId: '' });
  }, []);

  const renderNode = useCallback((node: WorkflowNode, level: number = 0) => {
    return (
      <div key={node.id} className="node-container">
        <WorkflowNodeComponent
          node={node}
          onAddNode={(type) => handleAddNode(node.id, type)}
          onDeleteNode={handleDeleteNode}
          onEditNode={onEditNode}
          onContextMenu={(e) => handleContextMenu(e, node.id)}
          level={level}
        />
        
        {node.children.length > 0 && (
          <div className="children-container">
            {node.children.map((child) => (
              <React.Fragment key={child.id}>
                <ConnectionLine
                  startX={node.position.x + 75}
                  startY={node.position.y + 50}
                  endX={child.position.x + 75}
                  endY={child.position.y}
                  type="curved"
                />
                {renderNode(child, level + 1)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }, [handleAddNode, handleDeleteNode, onEditNode, handleContextMenu]);

  return (
    <div className="workflow-canvas" onClick={closeContextMenu}>
      <div className="canvas-content">
        {renderNode(workflow.rootNode)}
      </div>

      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-item" onClick={() => handleAddNode(contextMenu.parentId, 'action')}>
            <i className="fas fa-play"></i>
            Add Action Node
          </div>
          <div className="context-menu-item" onClick={() => handleAddNode(contextMenu.parentId, 'branch')}>
            <i className="fas fa-code-branch"></i>
            Add Branch Node
          </div>
          <div className="context-menu-item" onClick={() => handleAddNode(contextMenu.parentId, 'end')}>
            <i className="fas fa-stop"></i>
            Add End Node
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowCanvas;