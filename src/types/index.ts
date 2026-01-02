export type NodeType = 'action' | 'branch' | 'end' | 'start';

export interface Position {
  x: number;
  y: number;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  position: Position;
  children: WorkflowNode[];
  parentId?: string;
}

export interface Workflow {
  id: string;
  name: string;
  rootNode: WorkflowNode;
  createdAt: string;
  updatedAt: string;
}

export interface AddNodePayload {
  parentId: string;
  type: Exclude<NodeType, 'start'>;
  label: string;
  branchIndex?: number; // For branch nodes - which branch to add to
}

export interface DeleteNodePayload {
  nodeId: string;
}

export interface UpdateNodePayload {
  nodeId: string;
  updates: Partial<Pick<WorkflowNode, 'label' | 'position'>>;
}

export interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  type?: 'straight' | 'curved';
}

export interface NodeEditorProps {
  node: WorkflowNode;
  onUpdate: (nodeId: string, label: string) => void;
  onClose: () => void;
}

export interface WorkflowCanvasProps {
  workflow: Workflow;
  onUpdateWorkflow: (workflow: Workflow) => void;
}

export interface WorkflowNodeProps {
  node: WorkflowNode;
  onAddNode: (parentId: string, type: Exclude<NodeType, 'start'>) => void;
  onDeleteNode: (nodeId: string) => void;
  onEditNode: (node: WorkflowNode) => void;
  level: number;
}