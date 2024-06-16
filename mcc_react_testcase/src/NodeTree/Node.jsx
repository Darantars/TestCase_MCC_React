import React, { useState } from 'react';

const Node = ({ node, addNode, deleteNode, editNode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(node.name);

    const handleAddNode = () => {
        addNode(node.id, 'New Node');
    };

    const handleDeleteNode = () => {
        deleteNode(node.id);
    };

    const handleEditNode = () => {
        editNode(node.id, newName);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setNewName(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input type="text" value={newName} onChange={handleInputChange} />
                    <button onClick={handleEditNode}>Save</button>
                </>
            ) : (
                <>
                    <span>{node.name}</span>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
            <button onClick={handleAddNode}>Add Node</button>
            <button onClick={handleDeleteNode}>Delete Node</button>
            {node.children.length > 0 && (
                <Tree tree={node.children} addNode={addNode} deleteNode={deleteNode} editNode={editNode} />
            )}
        </li>
    );
};

export default Node;