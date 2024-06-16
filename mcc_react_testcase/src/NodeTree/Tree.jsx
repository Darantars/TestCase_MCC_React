import Node from './Node.jsx'
import React, { useState } from 'react';
const Tree = ({ nodes, addNode, deleteNode, editNode }) => {
    return (
        <ul>
            {nodes.map((node) => (
                <Node
                    key={node.id}
                    node={node}
                    addNode={addNode}
                    deleteNode={deleteNode}
                    editNode={editNode}
                />
            ))}
        </ul>
    );
};

export default Tree;