Ext.onReady(function () {

  Ext.QuickTips.init();

  const toolBar = new Ext.Toolbar({
    items: [
      {
        text: 'Edit',
        menu: [{
          text: 'Reset',
          handler: handleReset
        }]
      },
      {
        text: 'Insert',
        menu: [{
          text: 'Table',
          handler: handleInsertTable
        }]
      }
    ]
  })

  function handleReset() {
    mainEditor.reset()
  }

  const tableInsertForm = new Ext.FormPanel({
    frame: true,
    padding: '10px',
    items: [
      {
        xtype: 'numberfield',
        id: 'col',
        fieldLabel: 'Cols',
        minValue: 1,
        allowBlank: false,
        allowDecimals: false
      }, {
        xtype: 'numberfield',
        id: 'row',
        fieldLabel: 'Rows',
        minValue: 1,
        allowBlank: false,
        allowDecimals: false
      }
    ],
  })

  const tableInsertWindow = new Ext.Window({
    title: 'Append Table',
    layout: 'fit',
    width: 300,
    height: 150,
    items: [tableInsertForm],
    bbar: [
      '->',
      {
        text: 'Cancel'
      },
      '',
      {
        text: 'Append',
        handler: onTableInsert
      }
    ]
  })

  const tableXTemplate = new Ext.XTemplate(
    `<table border="1" cellspacing="0"><tbody>`,
    `<tpl for="rows">`,
    `<tr>`,
    `<tpl for=".">`,
    `<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>`,
    `</tpl>`,
    `</tr>`,
    `</tpl>`,
    `</tbody></table>`,
  )

  function onTableInsert() {
    const form = tableInsertForm.getForm();
    const {col, row} = form.getValues();
    const _col = parseInt(col), _row = parseInt(row);
    const _data = {}
    _data.rows = Array(_row).fill(Array(_col).fill("1"))
    const html = tableXTemplate.apply(_data)
    mainEditor.setValue(mainEditor.getValue() + html)
    form.reset();
    tableInsertWindow.hide()
  }

  function handleInsertTable() {
    tableInsertWindow.show()
  }

  const contextMenu = new Ext.menu.Menu({
    items: [
      {
        id: 'menu-edit',
        text: 'Edit',
        menu: [
          {
            text: 'Reset',
            id: 'menu-reset',
            handler: handleReset,
          }]
      }, {
        id: 'menu-insert',
        text: 'Insert',
        menu: [{
          text: 'Table',
          id: 'menu-table',
          handler: handleInsertTable
        }]
      }
    ]
  })

  const progressBar = new Ext.ProgressBar({
    text: 'Loading'
  })

  const progressWindow = new Ext.Window({
    layout: 'fit',
    height: 40,
    width: 300,
    resizable: false,
    modal: true,
    closable: false,
    items: [progressBar]
  })

  const mainEditor = new Ext.form.HtmlEditor()

  const panel = new Ext.FormPanel({
    labelWidth: 0,
    width: 800,
    layout: 'fit',
    tbar: toolBar,
    items: [mainEditor],
    bbar: [
      '->',
      {
        text: '提交',
        handler: function () {
          progressWindow.show()
          progressBar.wait({
            duration: 3000,
            interval: 1000,
            increment: 3,
            text: 'Loading',
            fn: function () {
              Ext.Msg.alert('Result', 'Success');
              progressWindow.hide();
            }
          })
        }
      }
    ]
  })

  Ext.get(document).on(`contextmenu`, function (e) {
    e.preventDefault();
    contextMenu.showAt(e.getXY())
  })

  new Ext.Viewport({
    items: [panel]
  })
})