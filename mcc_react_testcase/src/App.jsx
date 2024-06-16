import { useState } from 'react'
import './App.css'
import Node from './NodeTree/Node.jsx'
import Tree from './NodeTree/Tree.jsx'
function App() {
    const [nodes, setNodes] = useState([
        {
            id: 1,
            name: 'Root',
            children: [],
        },
    ]);

    const addNode = (parentId, name) => {
        setNodes((prevNodes) => {
            const newNode = {
                id: Date.now(),
                name,
                children: [],
            };

            const updatedNodes = prevNodes.map((node) => {
                if (node.id === parentId) {
                    return {
                        ...node,
                        children: [...node.children, newNode],
                    };
                } else if (node.children.length > 0) {
                    return {
                        ...node,
                        children: addNodeToChildren(node.children, parentId, newNode),
                    };
                }

                return node;
            });

            return updatedNodes;
        });
    };

    const addNodeToChildren = (children, parentId, newNode) => {
        return children.map((child) => {
            if (child.id === parentId) {
                return {
                    ...child,
                    children: [...child.children, newNode],
                };
            } else if (child.children.length > 0) {
                return {
                    ...child,
                    children: addNodeToChildren(child.children, parentId, newNode),
                };
            }

            return child;
        });
    };

    const deleteNode = (nodeId) => {
        setNodes((prevNodes) => {
            const updatedNodes = prevNodes.filter((node) => node.id !== nodeId);

            return updatedNodes.map((node) => {
                if (node.children.length > 0) {
                    return {
                        ...node,
                        children: deleteNodeFromChildren(node.children, nodeId),
                    };
                }

                return node;
            });
        });
    };

    const deleteNodeFromChildren = (children, nodeId) => {
        return children.filter((child) => child.id !== nodeId).map((child) => {
            if (child.children.length > 0) {
                return {
                    ...child,
                    children: deleteNodeFromChildren(child.children, nodeId),
                };
            }

            return child;
        });
    };

    const editNode = (nodeId, newName) => {
        setNodes((prevNodes) => {
            return prevNodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        name: newName,
                    };
                } else if (node.children.length > 0) {
                    return {
                        ...node,
                        children: editNodeInChildren(node.children, nodeId, newName),
                    };
                }

                return node;
            });
        });
    };

    const editNodeInChildren = (children, nodeId, newName) => {
        return children.map((child) => {
            if (child.id === nodeId) {
                return {
                    ...child,
                    name: newName,
                };
            } else if (child.children.length > 0) {
                return {
                    ...child,
                    children: editNodeInChildren(child.children, nodeId, newName),
                };
            }

            return child;
        });
    };

    const resetTree = () => {
        setNodes([
            {
                id: 1,
                name: 'Root',
                children: [],
            },
        ]);
    };
    return (
        <div className="App">
            <Tree nodes={nodes} addNode={addNode} deleteNode={deleteNode} editNode={editNode} />
            <button onClick={resetTree}>Reset</button>
        </div>
    );
}

export default App
