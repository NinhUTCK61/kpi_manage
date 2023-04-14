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

export function generateNextIdByAdd(parentNode: NodeFlow): string {
  if (parentNode.id === 'root') {
    let nextLetter = ''
    let index = parentNode.children.length
    do {
      nextLetter = String.fromCharCode(65 + index)
      index++
    } while (parentNode.children.some((child) => child.id === nextLetter))
    return nextLetter
  } else {
    let nextNumber = ''
    let index = parentNode.children.length + 1
    do {
      nextNumber = `${parentNode.id}${index}`
      index++
    } while (parentNode.children.some((child) => child.id === nextNumber))
    return nextNumber
  }
}

export function generateNextIdByFill(parentNode: NodeFlow): string {
  if (parentNode.id === 'root') {
    let nextLetter = ''
    let index = 0
    do {
      nextLetter = String.fromCharCode(65 + index)
      index++
    } while (parentNode.children.some((child) => child.id === nextLetter))
    return nextLetter
  } else {
    let nextNumber = ''
    let index = 1
    do {
      nextNumber = `${parentNode.id}${index}`
      index++
    } while (parentNode.children.some((child) => child.id === nextNumber))
    return nextNumber
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

// const root: NodeFlow = {
//   id: 'root',
//   children: [
//     {
//       id: 'A',
//       children: [
//         { id: 'A1', children: [] },
//         { id: 'A2', children: [] },
//       ],
//     },
//     {
//       id: 'B',
//       children: [
//         { id: 'B1', children: [] },
//         { id: 'B2', children: [] },
//       ],
//     },
//   ],
// };

// generateIds(root, '', 0)

// // Add a new node to the root node
// const nodeA: NodeFlow = { id: generateNextId(root), children: [] }
// root.children.push(nodeA)
