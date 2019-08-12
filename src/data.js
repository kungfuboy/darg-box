const _layout = {
  type: 1,
  children: [
    {
      type: 2,
      children: [
        { type: 0, children: { mid: 2 } },
        { type: 0, children: { mid: 3 } }
      ]
    },
    { type: 0, children: { mid: 1 } },
    {
      type: 2,
      children: [
        {
          type: 1,
          children: [
            { type: 0, children: { mid: 8 } },
            { type: 0, children: { mid: 9 } }
          ]
        },
        { type: 0, children: { mid: 5 } }
      ]
    }
  ]
}

export default _layout

// handleDragOverInBox(n, indexList) {
//   console.log(indexList)
//   const _data = this.state.layout
//   const data = this.state.cacheData
//   const _key = indexList.split('-').map(item => Number(item))
//   const DChange = (obj, key, data) => {
//     const _obj = Object.assign({}, obj)
//     if (key.length === 2) {
//       _obj.children[key[0]] = handleItem(
//         _obj.children[key[0]],
//         key[1],
//         data,
//         n
//       )
//     } else {
//       _obj.children[key[0]] = DChange(
//         _obj.children[key[1]],
//         key.slice(1),
//         data
//       )
//     }
//     return _obj
//   }
//   const handleItem = (_obj, index, data, n) => {
//     const obj = Object.assign({}, _obj)
//     if (n === 4) {
//       console.log('index', obj.children)
//       obj.children.splice(index, 0, {
//         type: 0,
//         children: data
//       })
//       console.log('index', obj.children)
//     }
//     return obj.children
//   }
//   const result = DChange(_data, _key, data)
//   console.log(result)
//   return result
// }
