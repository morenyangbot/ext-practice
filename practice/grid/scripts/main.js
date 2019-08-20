Ext.onReady(function () {
  const data = [
    ['1', 'male', 'name1', "Hello"],
    ['2', 'female', 'name2', "Hello"],
    ['3', 'male', 'name3', "Hello"],
    ['4', 'female', 'name4', "Hello"],
    ['5', 'male', 'name5', "Hello"],
  ]

  function genderRenderer(value) {
    if (value === 'male') {
      return `<span style="color: red">🧑男</span>`
    } else if (value === 'female') {
      return `<span style="color: green">👧女</span>`
    }
    return value
  }

  function descriptionRenderer(value, metaData, record) {
    return `<button onclick="alert('${value}')">查看详细信息</button>`
  }

  const dataColumns = new Ext.grid.ColumnModel([
    {
      header: '编号', dataIndex: 'id',
    },
    {header: '性别', dataIndex: 'gender', renderer: genderRenderer},
    {
      header: '名称', dataIndex: 'name', editor: new Ext.grid.GridEditor(
        new Ext.form.TextField({
          allowBlank: false
        })
      )
    },
    {header: '描述', dataIndex: 'desc', renderer: descriptionRenderer, width: 120},
  ])

  const dataStore = new Ext.data.Store({
    proxy: new Ext.data.PagingMemoryProxy(data),
    reader: new Ext.data.ArrayReader({}, [
      {name: 'id'},
      {name: 'gender'},
      {name: 'name'},
      {name: 'desc'}
    ])
  })

  const pagingToolBar = new Ext.PagingToolbar({
    pageSize: 2,
    store: dataStore,
    displayInfo: true,
    displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
    emptyMsg: "没有记录"
  })

  const grid = new Ext.grid.GridPanel({
    autoHeight: true,
    autoWidth: true,
    store: dataStore,
    cm: dataColumns,
    bbar: pagingToolBar,
    viewConfig: {
      forceFit: true,

    }
  })

  dataStore.load({params: {start: 0, limit: 2}});

  new Ext.Viewport({
    items: [grid]
  })
})