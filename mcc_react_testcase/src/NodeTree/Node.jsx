import React, { useState } from 'react';
import Tree from './Tree.jsx'

const Node = ({ node, addNode, deleteNode, editNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
        setNewName(node.name);
    };

    const handleSave = () => {
        editNode(node.id, newName);
        setIsEditing(false);
    };

    const handleAddChild = () => {
        addNode(node.id, 'New Child Node');
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <span onClick={handleEdit}>{node.name}</span>
                    <button onClick={handleAddChild}>Add Child</button>
                    <button onClick={() => deleteNode(node.id)}>Delete</button>
                </>
            )}
            {node.children.length > 0 && (
                <ul>
                    {node.children.map((childNode) => (
                        <Node
                            key={childNode.id}
                            node={childNode}
                            addNode={addNode}
                            deleteNode={deleteNode}
                            editNode={editNode}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Node;