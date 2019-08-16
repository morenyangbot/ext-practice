const NODE_TYPE_SCHOOL = "SCHOOL";
const NODE_TYPE_CLASS = "CLASS";
const NODE_TYPE_STUDENT = "STUDENT";

function getNodeType(node) {
  if (!node || !node.attributes) {
    return null
  }
  return node.attributes.nodeType
}

Ext.onReady(function () {

  const schoolRootNode = new Ext.tree.TreeNode({
    text: '🏫School',
    leaf: false,
    expandable: true,
    nodeType: 'SCHOOL',
    editable: true
  })

  const studentTreeMenu = new Ext.menu.Menu({
    items: [{
      id: 'menu-delete',
      text: 'Delete Item'
    }, {
      id: 'menu-append',
      text: 'Add Item'
    }]
  })

  const schoolTree = new Ext.tree.TreePanel({
    enableDD: true,
    width: 300,
    height: 300,
    root: schoolRootNode,
    contextMenu: studentTreeMenu
  })

  schoolTree.on("click", function (node) {
    schoolTree._currentSelectedNode = node
  })

  schoolTree.on('contextmenu', function (node, e) {
    node.select();
    const contextMenu = node.getOwnerTree().contextMenu;
    contextMenu.contextNode = node;
    contextMenu.showAt(e.getXY())
  })

  studentTreeMenu.on('itemClick', function (item) {
    const currentNode = item.parentMenu.contextNode;
    switch (item.id) {
      case `menu-delete`:
        if (currentNode.parentNode) {
          if (schoolTree._currentSelectedNode === currentNode) {
            delete schoolTree._currentSelectedNode
          }
          currentNode.remove()
        }
        break;
      case `menu-append`:
        appendChild("New Item", currentNode);
        break
    }
  })

  schoolTree.on("beforenodedrop", function (e) {
    // class -> class
    let source = e.dropNode;
    let target = e.target;
    if (e.point === 'append' && getNodeType(source) === NODE_TYPE_CLASS && getNodeType(target) === NODE_TYPE_CLASS) {
      resolveClassToClass(source, target)
      e.cancel = true
    } else if (getNodeType(source) === NODE_TYPE_CLASS && getNodeType(target) === NODE_TYPE_STUDENT) {
      resolveClassToClass(source, target.parentNode)
      e.cancel = true
    }
    // student -> school
    else if (getNodeType(source) === NODE_TYPE_STUDENT && getNodeType(target) === NODE_TYPE_SCHOOL) {
      resolveStudentToNewClass(source, target)
      e.cancel = true;
    } else if (e.point !== 'append' && getNodeType(target) === NODE_TYPE_CLASS && getNodeType(source) === NODE_TYPE_STUDENT) {
      resolveStudentToNewClass(source, target.parentNode)
      e.cancel = true;
    }
  })

  function resolveStudentToNewClass(student, school) {
    const newClass = createNode(NODE_TYPE_CLASS, "📖NewClass")
    newClass.appendChild(student)
    school.appendChild(newClass)
    newClass.expand()
  }

  function resolveClassToClass(sourceClass, targetClass) {
    const children = [...sourceClass.childNodes];
    children.forEach(node => {
      targetClass.appendChild(node)
    });
    targetClass.expand();
    schoolTree._currentSelectedNode = targetClass;
    sourceClass.remove()
  }


  function createNode(nodeType, text) {
    return new Ext.tree.TreeNode({
      text,
      nodeType,
      expandable: nodeType === NODE_TYPE_CLASS,
      leaf: nodeType === NODE_TYPE_STUDENT,
      allowDrop: nodeType === NODE_TYPE_CLASS,
      editable: true
    })
  }

  function appendChild(childName, node) {
    node = node || schoolTree._currentSelectedNode || schoolRootNode;
    switch (getNodeType(node)) {
      case NODE_TYPE_STUDENT:
        appendChild(childName, node.parentNode);
        break;
      case NODE_TYPE_CLASS:
        node.appendChild(createNode(NODE_TYPE_STUDENT, `👩‍🎓${childName}`));
        break;
      case NODE_TYPE_SCHOOL:
      default:
        node.appendChild(createNode(NODE_TYPE_CLASS, `📖${childName}`));

    }
    node.expand()
  }

  const schoolEditor = new Ext.tree.TreeEditor(schoolTree, {allowBlank: false}, {})

  schoolEditor.on("complete", function (editor, currentVal) {
    // todo add emoji checker
  })

  const editForm = new Ext.FormPanel({
    title: 'Add a item',
    width: 300,
    frame: true,
    items: [
      new Ext.form.TextField({
        id: 'name',
        fieldLabel: '名称',
        allowBlank: false,
      })
    ],
    buttons: [
      new Ext.Button({
        text: '提交',
        handler: function () {
          if (editForm.getForm().isValid()) {
            appendChild(editForm.getForm().getValues().name)
            editForm.getForm().reset()
            editForm.getForm().clearInvalid()
          }
        }
      })
    ]
  })

  new Ext.Viewport({
    layout: 'vbox',
    items: [schoolTree, editForm],
  })
})