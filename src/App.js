import React, { Component } from 'react'
import './App.less'
// import _layout from './data'

class App extends Component {
  constructor() {
    super()
    this.state = {
      layout: {},
      cacheData: null,
      activeKey: '',
      asideData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(item => ({
        mid: item
      }))
    }
  }
  handleDragStartInSideChart = index => {
    this.setState({ cacheData: this.state.asideData[index] })
  }
  handleDropInRow = e => {
    // To fix Warning: This synthetic event is reused for performance reasons.
    e.persist()
    e.stopPropagation()
  }
  handleDropInBroad = e => {
    // To fix Warning: This synthetic event is reused for performance reasons.
    e.persist()
    e.stopPropagation()
    if (Object.keys(this.state.layout).length) {
      return
    }
    const data = {
      type: 1,
      children: [{ type: 0, children: this.state.cacheData }]
    }
    this.setState({ layout: data })
  }
  handleMouseEnter = () => {
    // console.log('ddd')
  }
  handleDragOverInBox = (n, key, e) => {
    e.stopPropagation()
    // 缓存好必要的变量
    let keyList = key.split('-').map(item => Number(item))
    const _data = this.state.layout
    const _cacheData = this.state.cacheData
    const findTree = (tree, _key) => {
      if (_key.length === 2) {
        tree.children = insertDataInArray(tree.children, _key[1])
        return tree
      }
      tree.children[_key[1]] = findTree(tree.children[_key[1]], _key.splice(1))
      return tree
    }
    const insertDataInArray = (children, index) => {
      // 处理数组
      let _children = children.concat()
      if (n === 2 || n === 3) {
        _children.splice(index + 1, 0, {
          type: 0,
          children: _cacheData
        })
      }
      if (n === 1 || n === 4) {
        _children.splice(index, 0, {
          type: 0,
          children: _cacheData
        })
      }
      if (n === 5) {
        _children[index].type = 1
        _children[index].children = [
          {
            type: 1,
            children: [
              {
                type: 0,
                children: _cacheData
              },
              {
                type: 0,
                children: _children[index].children
              }
            ]
          }
        ]
      }
      if (n === 6) {
        _children[index].type = 1
        _children[index].children = [
          {
            type: 1,
            children: [
              {
                type: 0,
                children: _children[index].children
              },
              {
                type: 0,
                children: _cacheData
              }
            ]
          }
        ]
      }
      if (n === 7) {
        _children[index].type = 2
        _children[index].children = [
          {
            type: 2,
            children: [
              {
                type: 0,
                children: _cacheData
              },
              {
                type: 0,
                children: _children[index].children
              }
            ]
          }
        ]
      }
      if (n === 8) {
        _children[index].type = 2
        _children[index].children = [
          {
            type: 2,
            children: [
              {
                type: 0,
                children: _cacheData
              },
              {
                type: 0,
                children: _children[index].children
              }
            ]
          }
        ]
      }
      return _children
    }
    const result = findTree(_data, keyList)
    // console.log(result)
    this.setState({
      layout: result,
      activeKey: ''
    })
  }
  render() {
    const renderRect = key => {
      const data = [
        { id: 4, mark: 'left' },
        { id: 2, mark: 'right' },
        { id: 1, mark: 'top' },
        { id: 3, mark: 'bottom' },
        { id: 5, mark: 'cleft' },
        { id: 6, mark: 'cright' },
        { id: 7, mark: 'ctop' },
        { id: 8, mark: 'cbottom' }
      ]
      return data.map((item, i) => (
        <i
          key={i}
          className={
            this.state.activeKey === `${key}${item.mark}`
              ? `active ${item.mark}`
              : `${item.mark}`
          }
          onDrop={e => this.handleDragOverInBox(item.id, key, e)}
          onDragEnter={() => this.setState({ activeKey: `${key}${item.mark}` })}
          onDragLeave={() => this.setState({ activeKey: '' })}
          onMouseLeave={() => this.setState({ activeKey: '' })}
        />
      ))
    }
    const hash = new Map()
      .set(0, 'box')
      .set(1, 'row')
      .set(2, 'column')
    const renderBox = (data, key) => {
      if (data.type) {
        return (
          <div key={key} className={hash.get(data.type)}>
            {data.children.map((item, index) =>
              renderBox(item, `${key}-${index}`)
            )}
          </div>
        )
      } else {
        return (
          <div
            key={key}
            class="bg"
            className={hash.get(data.type)}
            style={{ backgroundImage: `url(${imgUrl(data.children.mid)})` }}
          >
            {renderRect(key)}
            {/* {data.children.mid} */}
          </div>
        )
      }
    }
    const imgUrl = name => require(`./assets/img-${name}.png`)
    return (
      <div className="App">
        <aside className="aside">
          {this.state.asideData.map((item, index) => (
            <div
              className="chart"
              key={item.mid}
              draggable="true"
              onDragStart={() => this.handleDragStartInSideChart(index)}
              style={{ backgroundImage: `url(${imgUrl(item.mid)})` }}
            >
              {/* {item.mid} */}
            </div>
          ))}
        </aside>
        <section className="content">
          <div
            className="broad"
            onDragOver={e => e.preventDefault()}
            onDrop={this.handleDropInBroad}
          >
            {Object.keys(this.state.layout).length
              ? renderBox(this.state.layout, '0')
              : ''}
          </div>
        </section>
      </div>
    )
  }
}

export default App
