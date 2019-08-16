Ext.onReady(function () {

  const fruits = new Ext.tree.TreeNode({
    text: 'Fruits',
    checked: false,
    expanded: true
  })

  const apple = new Ext.tree.TreeNode({
    text: 'Apple🍎',
    checked: true
  })

  const grapes = new Ext.tree.TreeNode({
    text: 'Grapes🍇',
    checked: true
  })
  const pear = new Ext.tree.TreeNode({
    text: 'Pear🍐',
    checked: false
  })
  const strawberry = new Ext.tree.TreeNode({
    text: 'Strawberry🍓',
    checked: false
  })
  const watermelon = new Ext.tree.TreeNode({
    text: 'Watermelon🍉',
    checked: false
  })


  fruits.appendChild(apple)
  fruits.appendChild(grapes)
  fruits.appendChild(pear)
  fruits.appendChild(strawberry)
  fruits.appendChild(watermelon)

  fruits.on('checkchange', function (node, chekced) {
    node.childNodes.forEach(node => {
      console.log(node)
    })
  })

  const vegetables = new Ext.tree.TreeNode({
    text: 'Vegetables',
    expanded: false,
    checked: 'false'
  })

  const tomato = new Ext.tree.TreeNode({
    text: 'Tomato🍅',
    checked: false
  })

  vegetables.appendChild(tomato)

  const rootNode = new Ext.tree.TreeNode({
    text: 'Root',
    expanded: true,
  })

  rootNode.appendChild(fruits)
  rootNode.appendChild(vegetables)

  const tree = new Ext.tree.TreePanel({
    useArrows: true,
    rootVisible: false,
    enableDD: true
  })

  tree.setRootNode(rootNode)

  const asyncTreeMenu = new Ext.menu.Menu({
    items: [{
      id: 'delete',
      text: 'DeleteNode'
    }, {
      id: 'append',
      text: 'AppendNode'
    }]
  })

  asyncTreeMenu.on('itemClick', function (item) {
    const currentNode = item.parentMenu.contextNode;
    switch (item.id) {
      case `delete`:
        if (currentNode.parentNode) {
          currentNode.remove()
        }
        break;
      case `append`:
        currentNode.appendChild(new Ext.tree.TreeNode({text: 'New Item 😊'}))
        break;
      default:
        break;
    }
  })

  const asyncTree = new Ext.tree.TreePanel({
    useArrows: true,
    // rootVisible: false,
    root: new Ext.tree.AsyncTreeNode({
      loader: new Ext.tree.TreeLoader({dataUrl: 'data.json'}),
      text: 'root'
    }),
    height: 500,
    width: 300,
    autoScroll: true,
    enableDD: true,
    contextMenu: asyncTreeMenu
  })
  const asyncTreeEditor = new Ext.tree.TreeEditor(asyncTree, {allowBlank: false}, {
    listeners: {
      complete: function (editor, currentVal, originVal) {
        console.log(editor)
        if (currentVal.includes("Zh")) {
          editor.editNode.ui.textNode.style = "color: red"
        } else {
          editor.editNode.ui.textNode.style = ""
        }
        // Ext.MessageBox.alert("You edit!", `${originVal} -> ${currentVal}`)
      }
    }
  })


  asyncTree.on('click', function (node) {
    //   Ext.MessageBox.alert('AsyncTree', `You Click ${node.text}!`)
  })

  asyncTree.on('dblclick', function (node) {

    // Ext.MessageBox.alert(node.text, `${node.text}: Do not click me twice!`)

  })

  asyncTree.on('checkchange', function (node, checked) {
    // Ext.MessageBox.alert('AsyncTree', `You ${checked ? 'check' : 'uncheck'} ${node.text}!`)
  })

  asyncTree.on('expandnode', function (node) {
    // Ext.MessageBox.alert(node.text, `You expanded ${node.text}!`)
  })

  asyncTree.on('contextmenu', function (node, e) {
    node.select();
    const treeContextMenu = node.getOwnerTree().contextMenu;
    treeContextMenu.contextNode = node;
    treeContextMenu.showAt(e.getXY());
  })

  asyncTree.on("dragdrop", function (tree, node, dd, e) {
    console.log(tree, node, dd, e)
  })

  asyncTree.expandAll()

  new Ext.Viewport({
    layout: 'hbox',
    items: [tree, asyncTree]
  })
})