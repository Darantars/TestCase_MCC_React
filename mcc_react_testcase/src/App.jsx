import { useState } from 'react'
import './App.css'
import Node from './NodeTree/Node.jsx'
import Tree from './NodeTree/Tree.jsx'
function App() {
    const [tree, setTree] = useState([{ id: 1, name: 'Root', children: [] }]);
    const addNode = (parentId, name) => {
        setTree((prevTree) => {
            const updatedTree = [...prevTree];
            const parentNode = updatedTree.find((node) => node.id === parentId);
            const newNode = { id: Date.now(), name, children: [] };
            if (parentNode) {
                parentNode.children.push(newNode);
            }
            return updatedTree;
        });
    };
    const deleteNode = (nodeId) => {
        setTree((prevTree) => {
            const updatedTree = prevTree.filter((node) => node.id !== nodeId);
            updatedTree.forEach((node) => {
                node.children = node.children.filter((child) => child.id !== nodeId);
            });
            return updatedTree;
        });
    };

    const editNode = (nodeId, newName) => {
        setTree((prevTree) => {
            const updatedTree = prevTree.map((node) =>
                node.id === nodeId ? { ...node, name: newName } : node
            );
            updatedTree.forEach((node) => {
                node.children = node.children.map((child) =>
                    child.id === nodeId ? { ...child, name: newName } : child
                );
            });
            return updatedTree;
        });
    };

    const resetTree = () => {
        setTree([{ id: 1, name: 'Root', children: [] }]);
    };

    return (
        <div className="treeContainer">
            <button onClick={() => resetTree()}>Reset</button>
            <Tree
                tree={tree}
                addNode={addNode}
                deleteNode={deleteNode}
                editNode={editNode}
            />
        </div>
    );
}

export default App
