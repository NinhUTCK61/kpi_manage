interface NodeFlow {
  id: string
  children: NodeFlow[]
}

export function generateIds(node: NodeFlow, prefix: string, index: number): void {
  if (prefix === '') {
    node.id = 'root'
  } else {
    const letter = String.fromCharCode(65 + index)
    node.id = prefix === 'root' ? letter : `${prefix}${index + 1}`
  }

  for (const [childIndex, child] of node.children.entries()) {
    generateIds(child, node.id, childIndex)
  }
}

export function generateNextId(parentNode: NodeFlow): string {
  // if parentNode is root
  if (parentNode.id === 'root') {
    // Find the next letter based on the number of children of the root node
    const nextLetter = String.fromCharCode(65 + parentNode.children.length)
    return nextLetter
  } else {
    // If parentNode is not the root node, create an ID for the next child node
    const nextNumber = parentNode.children.length + 1
    return `${parentNode.id}${nextNumber}`
  }
}

// DFS graph
// const root: NodeFlow = {
//   id: '',
//   children: [
//     {
//       id: '',
//       children: [
//         { id: '', children: [] },
//         { id: '', children: [] },
//       ],
//     },
//     {
//       id: '',
//       children: [
//         { id: '', children: [] },
//         { id: '', children: [] },
//       ],
//     },
//   ],
// }

// generateIds(root, '', 0)

// // Add a new node to the root node
// const nodeA: NodeFlow = { id: generateNextId(root), children: [] }
// root.children.push(nodeA)
