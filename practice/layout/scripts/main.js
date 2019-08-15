Ext.onReady(function () {
  const panel = new Ext.Panel({
    title: 'Panel in window',
    html: 'Hello World',
    autoHeight: true
  })
  const window = new Ext.Window({
    height: 500,
    width: 500,
    title: 'Window',
    layout: 'fit',
    items: [
      panel
    ]
  });

  const accordionLayout = new Ext.Container({
    layout: 'accordion',
    width: 500,
    height: 500,
    layoutConfig: {
      titleCollapse: false,
      animate: true,
    },
    items: [
      {
        title: 'Panel 1',
        html: '<p>Panel content1!</p>'
      }, {
        title: 'Panel 2',
        html: '<p>Panel content2!</p>'
      }, {
        title: 'Panel 3',
        html: '<p>Panel content3!</p>'
      }
    ]
  })

  const navHandler = function (direction) {
    function getActiveCardId() {
      return cardLayout.layout.activeItem.id;
    }

    if (direction === 1) {
      if (getActiveCardId() === 'card-0') {
        cardLayout.layout.setActiveItem(1)
        Ext.getCmp('prev').setDisabled = false
      } else if (getActiveCardId() === 'card-1') {
        cardLayout.layout.setActiveItem(2)
        Ext.getCmp('next').setDisabled = true

      }

    } else if (direction === -1) {
      if (getActiveCardId() === 'card-2') {
        cardLayout.layout.setActiveItem(1)
        Ext.getCmp('next').setDisabled = false
      } else if (getActiveCardId() === 'card-1') {
        cardLayout.layout.setActiveItem(0)
        Ext.getCmp('prev').setDisabled = true

      }

    }
  };

  const cardLayout = new Ext.Panel({
    layout: 'card',
    id: 'cardlayout',
    width: 500,
    height: 500,
    activeItem: 0,
    bbar: [
      {
        id: 'prev',
        text: 'Prev',
        handler: navHandler.createDelegate(this, [-1]),
        disabled: true
      },
      {
        id: 'next',
        text: 'Next',
        handler: navHandler.createDelegate(this, [1])
      }
    ],
    items: [{
      id: 'card-0',
      html: '1'
    }, {
      id: 'card-1',
      html: '2'
    }, {
      id: 'card-2',
      html: '3'
    }]
  })

  const wrapper = new Ext.Container({
    layout: 'hbox',
    items: [
      accordionLayout,
      cardLayout
    ]
  })

  new Ext.Viewport({
    layout: 'fit',
    items: [wrapper]
  })
})