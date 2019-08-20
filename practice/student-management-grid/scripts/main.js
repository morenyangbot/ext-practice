Ext.onReady(function () {

  const data = [
    ['Reet', 'Bering', 'female', 21, '1998-01-15T02:57:03'],
    ['Penny', 'Bering', 'female', 21, '1998-01-15T02:57:03'],
    ['Waylon', 'Panama', 'male', 21, '1998-01-15T02:57:03'],
    ['Cayde', 'Panama', 'male', 21, '1998-01-15T02:57:03'],
    ['Dean', 'Suez', 'female', 21, '1998-01-15T02:57:03'],
    ['Bill', 'Suez', 'male', 21, '1998-01-15T02:57:03'],
  ]

  const gridSelectMode = new Ext.grid.CheckboxSelectionModel()

  const dataColumns = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(),
    gridSelectMode,
    {
      header: 'Name',
      dataIndex: 'name',
      sortable: true,
      editor: new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false}))
    },
    {
      header: 'Class',
      dataIndex: 'class',
      sortable: true,
      editor: new Ext.grid.GridEditor(new Ext.form.TextField({allowBlank: false}))
    },
    {
      header: 'Sex', dataIndex: 'sex', editor: new Ext.grid.GridEditor(
        new Ext.form.ComboBox({
          mode: 'local',
          store: new Ext.data.ArrayStore({
            id: 0,
            fields: ['id', 'displayName'],
            data: [['male', '🧑Male'], ['female', '👧Female']],
          }),
          valueField: 'id',
          displayField: 'displayName'
        })
      ),
      renderer: function (value) {
        if (value === 'male') {
          return '🧑Male'
        } else if (value === 'female') {
          return '👧Female'
        }
        return value
      }
    },
    {
      header: 'Age', dataIndex: 'age', editor: new Ext.grid.GridEditor(new Ext.form.NumberField({
        minValue: 1,
        allowBlank: false,
        allowDecimals: false
      }))
    },
    {
      header: 'Birthday',
      dataIndex: 'birthday',
      renderer: Ext.util.Format.dateRenderer('Y-m-d'),
      editor: new Ext.grid.GridEditor(
        new Ext.form.DateField({allowBlank: false, format: 'Y-m-d'})
      )
    },
    {
      header: 'Avatar', dataIndex: 'avatar', renderer: function (value, metaData, record) {
        if (record.data.sex === 'male') {
          return `🙋‍♂️`
        } else if (record.data.sex === 'female') {
          return `🙋‍♀️`
        }
        return `👶`
      }
    },
  ])

  const store = new Ext.data.GroupingStore({
    proxy: new Ext.data.PagingMemoryProxy(data),
    reader: new Ext.data.ArrayReader({}, [
      {name: 'name'},
      {name: 'class'},
      {name: 'sex'},
      {name: 'age'},
      {name: 'birthday'}
    ]),
    groupField: 'class',
  })

  const pagingToolBar = new Ext.PagingToolbar({
    pageSize: 4,
    store: store,
    displayInfo: true,
    displayMsg: 'Show records from {0} to {1}, total: {2}',
    emptyText: 'No record.'
  })

  function getCurrentSelection() {
    let selections = gridSelectMode.getSelections();
    return selections[selections.length - 1];
  }

  function getRecordIndex(selection) {
    return store.indexOf(selection);
  }

  function handleSelectionFirst() {
    const selection = getCurrentSelection();
    store.remove(selection);
    store.insert(0, selection)
  }

  function handleSelectionLast() {
    const selection = getCurrentSelection();
    store.remove(selection);
    store.insert(store.getCount(), selection)
  }


  function handleSelectionUp() {
    const selection = getCurrentSelection();
    const index = getRecordIndex(selection);
    if (selection === 0) {
      return;
    }
    store.remove(selection);
    store.insert(index - 1, selection)
  }

  function handleSelectionDown() {
    const selection = getCurrentSelection();
    const index = getRecordIndex(selection);
    if (index === store.getCount() - 1) {
      return;
    }
    store.remove(selection);
    store.insert(index + 1, selection);
  }

  const rowContextMenu = new Ext.menu.Menu({
    id: 'rowContentMenu',
    items: [{
      text: 'First',
      handler: handleSelectionFirst
    }, {
      text: 'Up',
      handler: handleSelectionUp
    }, {
      text: 'Down',
      handler: handleSelectionDown
    }, {
      text: 'Last',
      handler: handleSelectionLast
    }]
  })

  const panel = new Ext.grid.EditorGridPanel({
    id: 'grid',
    autoHeight: true,
    store: store,
    cm: dataColumns,
    sm: gridSelectMode,
    view: new Ext.grid.GroupingView(),
    tbar: new Ext.Toolbar([
      {
        text: 'Add',
        handler: handleAdd
      },
      '',
      {
        text: 'Delete',
        handler: handleDelete
      }
    ]),
    bbar: pagingToolBar
  })

  function handleDelete() {
    let selections = gridSelectMode.getSelections();

    !Ext.isEmpty(selections) && Ext.MessageBox.confirm("Warning", "Are you sure to delete selected columns? ", function (btn) {
      if (btn === 'yes') {
        selections.forEach(item => {
          store.remove(item)
        })
      }
    })
  }

  function handleAdd() {
    const selection = getCurrentSelection();
    const initValue = {
      name: '',
      class: 'newClass',
      sex: 'male',
      age: 18,
      birthday: new Date()
    }
    let index = 0
    if (selection) {
      initValue.class = store.getById(selection.id).data.class
      index = getRecordIndex(selection) + 1;
    }
    const newRecord = new Ext.data.Record(initValue);
    panel.stopEditing();
    store.insert(index, newRecord);
    panel.startEditing(index, 0);
    newRecord.dirty = true;
    newRecord.modified = initValue;
    if (store.modified.indexOf(newRecord) === -1) {
      store.modified.push(newRecord);
    }
  }

  panel.on('rowcontextmenu', function (panel, rowIndex, e) {
    e.preventDefault();
    panel.getSelectionModel().selectRow(rowIndex);
    rowContextMenu.showAt(e.getXY())
  })

  store.load({params: {start: 0, limit: 4}})

  new Ext.Viewport({
    items: [panel]
  })

})