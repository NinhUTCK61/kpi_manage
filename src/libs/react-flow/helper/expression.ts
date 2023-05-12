import * as math from 'mathjs'

export const getSlugFromInputValue = (inputValue: string) => {
  const slugs: string[] = []
  const nodeParse = math.parse(inputValue)

  nodeParse.traverse(function (node: math.MathNode) {
    if (node.type === 'SymbolNode') {
      slugs.push((node as math.SymbolNode).name)
    }
  })

  return slugs
}
