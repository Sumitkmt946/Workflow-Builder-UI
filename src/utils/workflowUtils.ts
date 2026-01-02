import { v4 as uuidv4 } from 'uuid';
import { WorkflowNode, Workflow, NodeType, AddNodePayload } from '../types';

export const createNode = (
  type: NodeType,
  label: string,
  position: { x: number; y: number } = { x: 0, y: 0 },
  parentId?: string
): WorkflowNode => ({
  id: uuidv4(),
  type,
  label,
  position,
  children: [],
  parentId,
});

export const createInitialWorkflow = (): Workflow => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    name: 'New Workflow',
    rootNode: createNode('start', 'Start', { x: 400, y: 50 }),
    createdAt: now,
    updatedAt: now,
  };
};

export const findNodeById = (
  rootNode: WorkflowNode,
  targetId: string
): WorkflowNode | null => {
  if (rootNode.id === targetId) {
    return rootNode;
  }

  for (const child of rootNode.children) {
    const found = findNodeById(child, targetId);
    if (found) {
      return found;
    }
  }

  return null;
};

export const findParentNode = (
  rootNode: WorkflowNode,
  targetId: string,
  parent: WorkflowNode | null = null
): WorkflowNode | null => {
  if (rootNode.id === targetId) {
    return parent;
  }

  for (const child of rootNode.children) {
    const found = findParentNode(child, targetId, rootNode);
    if (found !== null) {
      return found;
    }
  }

  return null;
};

export const addNodeToParent = (
  rootNode: WorkflowNode,
  payload: AddNodePayload
): WorkflowNode => {
  const { parentId, type, label, branchIndex } = payload;

  if (rootNode.id === parentId) {
    const newNode = createNode(
      type,
      label,
      calculateChildPosition(rootNode, branchIndex || 0),
      parentId
    );

    if (rootNode.type === 'branch') {
      if (branchIndex !== undefined && rootNode.children[branchIndex]) {
        rootNode.children[branchIndex] = newNode;
      } else if (branchIndex !== undefined) {
        rootNode.children[branchIndex] = newNode;
      } else {
        rootNode.children.push(newNode);
      }
    } else {
      rootNode.children = [newNode];
    }

    return { ...rootNode };
  }

  return {
    ...rootNode,
    children: rootNode.children.map(child =>
      addNodeToParent(child, payload)
    ),
  };
};

export const deleteNodeFromTree = (
  rootNode: WorkflowNode,
  nodeId: string
): WorkflowNode => {
  if (rootNode.id === nodeId) {
    return rootNode;
  }

  const parent = findParentNode(rootNode, nodeId);
  if (parent) {
    const nodeToDelete = findNodeById(rootNode, nodeId);
    if (nodeToDelete) {
      parent.children = parent.children.filter(child => child.id !== nodeId);
      
      if (nodeToDelete.children.length > 0) {
        const grandChildren = nodeToDelete.children.map(child => ({
          ...child,
          parentId: parent.id,
        }));
        parent.children.push(...grandChildren);
      }
    }
  }

  return {
    ...rootNode,
    children: rootNode.children.map(child =>
      deleteNodeFromTree(child, nodeId)
    ),
  };
};

export const updateNodeInTree = (
  rootNode: WorkflowNode,
  nodeId: string,
  updates: Partial<WorkflowNode>
): WorkflowNode => {
  if (rootNode.id === nodeId) {
    return { ...rootNode, ...updates };
  }

  return {
    ...rootNode,
    children: rootNode.children.map(child =>
      updateNodeInTree(child, nodeId, updates)
    ),
  };
};

export const calculateChildPosition = (
  parentNode: WorkflowNode,
  childIndex: number
): { x: number; y: number } => {
  const horizontalSpacing = 200;
  const verticalSpacing = 120;
  
  const baseX = parentNode.position.x - (parentNode.children.length * horizontalSpacing) / 2;
  const x = baseX + childIndex * horizontalSpacing + horizontalSpacing / 2;
  const y = parentNode.position.y + verticalSpacing;

  return { x, y };
};

export const canAddNode = (nodeType: NodeType): boolean => {
  return nodeType !== 'end';
};

export const canDeleteNode = (nodeType: NodeType): boolean => {
  return nodeType !== 'start';
};

export const getNodeColor = (nodeType: NodeType): string => {
  switch (nodeType) {
    case 'start':
      return '#10B981';
    case 'action':
      return '#3B82F6';
    case 'branch':
      return '#F59E0B';
    case 'end':
      return '#6B7280';
    default:
      return '#3B82F6';
  }
};

export const validateWorkflow = (workflow: Workflow): boolean => {
  if (!workflow.rootNode || workflow.rootNode.type !== 'start') {
    return false;
  }

  const hasValidConnections = (node: WorkflowNode): boolean => {
    if (node.type === 'end' && node.children.length > 0) {
      return false;
    }
    
    if (node.type === 'action' && node.children.length > 1) {
      return false;
    }

    return node.children.every(hasValidConnections);
  };

  return hasValidConnections(workflow.rootNode);
};

export const getWorkflowStats = (workflow: Workflow) => {
  let nodeCount = 0;
  let actionCount = 0;
  let branchCount = 0;
  let endCount = 0;

  const countNodes = (node: WorkflowNode) => {
    nodeCount++;
    switch (node.type) {
      case 'action':
        actionCount++;
        break;
      case 'branch':
        branchCount++;
        break;
      case 'end':
        endCount++;
        break;
    }

    node.children.forEach(countNodes);
  };

  countNodes(workflow.rootNode);

  return {
    totalNodes: nodeCount,
    actionNodes: actionCount,
    branchNodes: branchCount,
    endNodes: endCount,
    maxDepth: calculateMaxDepth(workflow.rootNode),
  };
};

const calculateMaxDepth = (node: WorkflowNode): number => {
  if (node.children.length === 0) {
    return 1;
  }

  return 1 + Math.max(...node.children.map(calculateMaxDepth));
};