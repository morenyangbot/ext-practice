Ext.onReady(function () {

  const checkMenu = new Ext.menu.Menu({
    allowOtherMenus: true,
    width: 300,
    items: [
      new Ext.menu.CheckItem({
          id: 'checkItemA',
          text: 'A',
          handler: checkHandler
        },
      ),
      new Ext.menu.CheckItem({
        text: 'B',
        handler: checkHandler
      }),
      new Ext.menu.CheckItem({
        text: 'C',
        group: 'Group',
        handler: checkHandler
      }),
      new Ext.menu.CheckItem({

        text: 'D',
        group: 'Group',
        handler: checkHandler
      }), new Ext.menu.CheckItem({

        text: 'E',
        group: 'Group',
        handler: checkHandler
      })
    ]
  })

  function checkHandler(item) {
    Ext.MessageBox.alert('checkBox', `${item.text}: ${item.checked}`);
  }

  const toolBar = new Ext.Toolbar({
    items: [
      new Ext.Toolbar.TextItem({
        text: 'Hello',
      }),
      '',
      'World',
      '-',
      {
        text: 'checkMenu',
        menu: checkMenu
      },
      {
        text: 'Date',
        menu: [{
          xtype: 'datepicker',
          handler: function (picker, date) {
            Ext.MessageBox.alert("DatePicker", date)
          }
        }]
      },
      {
        text: 'Color',
        menu: [{
          xtype: 'colorpalette',
          handler: function (palette, color) {
            Ext.MessageBox.alert("Color", color)
          }
        }]
      },
      {
        text: 'ExtUtils',
        menu: [
          {
            text: 'Ext.get',
            handler: function () {
              const dom = Ext.getDom(Ext.getBody())
              console.log(dom)
              console.log(Ext.get(dom))
            }
          }, {
            text: 'Ext.getCmp',
            handler: function () {
              console.log(Ext.getCmp("checkItemA"))
            }
          }, {
            text: 'Ext.getBody',
            handler: function () {
              console.log(Ext.getBody())
            }
          }, {
            text: 'Ext.getDOM',
            handler: function () {
              console.log(Ext.getDom(Ext.getBody()))
            }
          }
        ]
      },
      {
        text: 'Menu',
        menu: [
          new Ext.menu.Item({text: 'Find'}),
          '-',
          new Ext.menu.Item({text: 'Replace'}),
          {xtype: 'menuseparator'},
          {text: 'Test1'},
          new Ext.menu.Separator(),
          {text: 'Test2'},
        ]
      },
      '-',
      'ToolbarDemo',
      '->',
      'End'
    ]
  })

  new Ext.Viewport({
    items: [
      toolBar
    ]
  })

  Ext.query(".class1").forEach(
    item => item.style = "background: #EEE"
  )

  Ext.query("//#list/ul/li").forEach(
    item => item.style = "color: red;"
  )


  console.log(Ext.encode({a: 123}))
  console.log(Ext.decode(`{"a":123}`))

  const obj1 = {
    a: 1,
    b: 2
  }

  Ext.apply(obj1, {a: 2, b: 3, c: 4})
  console.log(obj1)

  const obj2 = {
    a: 1,
    b: 2
  }
  Ext.applyIf(obj2, {a: 2, b: 2, c: 4})
  console.log(obj2)

  console.log(Ext.isEmpty([]))

  Ext.each([1, 2, 3], function (i) {
    console.log(i)
  })

  Ext.ns("testNs")
  Ext.ns("testNs", "test.test")
  testNs.a = 1

  console.log(testNs)
  console.log(test)
})