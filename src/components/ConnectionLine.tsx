import React from 'react';
import { ConnectionLineProps } from '../types';
import './ConnectionLine.css';

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  type = 'curved',
}) => {
  if (type === 'straight') {
    return (
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#4B5563"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    );
  }

  const controlX1 = startX;
  const controlY1 = startY + (endY - startY) * 0.5;
  const controlX2 = endX;
  const controlY2 = endY - (endY - startY) * 0.5;

  const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

  return (
    <svg className="connection-line">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#4B5563"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="#4B5563"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className="connection-path"
      />
    </svg>
  );
};

export default ConnectionLine;