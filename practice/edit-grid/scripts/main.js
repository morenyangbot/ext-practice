Ext.onReady(function () {
  const columnModel = new Ext.grid.ColumnModel([
    {
      header: '编号',
      dataIndex: 'id',
      editor: new Ext.grid.GridEditor(
        new Ext.form.TextField({
          allowBlank: false
        })
      )
    },
    {
      header: '名称',
      dataIndex: 'name',
      editor: new Ext.grid.GridEditor(
        new Ext.form.TextField({
          allowBlank: false
        })
      )
    },
    {
      header: '描述',
      dataIndex: 'desc',
      editor: new Ext.grid.GridEditor(
        new Ext.form.TextField({
          allowBlank: false
        })
      )
    },
  ]);

  const data = [
    ['1', 'name1', 'descn1'],
    ['2', 'name2', 'descn2'],
    ['3', 'name3', 'descn3'],
    ['4', 'name4', 'descn4'],
    ['5', 'name5', 'descn5']
  ];

  const store = new Ext.data.Store({
    proxy: new Ext.data.MemoryProxy(data),
    reader: new Ext.data.ArrayReader({}, [
      {name: 'id'},
      {name: 'name'},
      {name: 'desc'}
    ])
  });

  const Record = Ext.data.Record.create([
    {name: 'id', type: 'string'},
    {name: 'name', type: 'string'},
    {name: 'desc', type: "string"}
  ]);

  store.load();
  const grid = new Ext.grid.EditorGridPanel({
    autoHeight: true,
    store: store,
    cm: columnModel,
    tbar: new Ext.Toolbar([
      {
        text: 'Add',
        handler: function () {
          const initValue = {id: '', name: '', desc: ''};
          const newRecord = new Record(initValue);

          grid.stopEditing();

          store.insert(0, newRecord);
          grid.startEditing(0, 0);
          newRecord.dirty = true;
          newRecord.modified = initValue;
          if (store.modified.indexOf(newRecord) === -1) {
            store.modified.push(newRecord)
          }
        }
      }, {
        text: 'Save',
        handler: function () {
          const modifiedRecords = store.modified;
          modifiedRecords.forEach(record => {
            const fields = record.fields.keys;
            const data = record.data;
            fields.forEach(key => {
              const val = data[key];
              const colIndex = columnModel.findColumnIndex(key);
              const editor = columnModel.getCellEditor(colIndex).field;

              if (!editor.validateValue(val)) {
                Ext.MessageBox.alert("Alert!", "Please input correct value! ");
              }
            })
          })
        }
      }
    ])
  });

  new Ext.Viewport({
    items: [grid]
  })
});