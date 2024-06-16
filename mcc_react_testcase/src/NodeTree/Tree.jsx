import Node from './Node.jsx'

const Tree = ({ tree, addNode, deleteNode, editNode }) => {

    return (
        <ul>
            {tree.map((node) => (
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