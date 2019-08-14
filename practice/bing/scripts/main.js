Ext.onReady(function () {
  const bingLogo = new Ext.BoxComponent({
    height: 52,
    width: 132,
    style: {
      backgroundImage: `url('https://cn.bing.com/sa/simg/hpc26.png')`,
      marginRight: `21px`
    },
    autoEl: {
      tag: 'div',
    }
  });


  function getSearchBar(renderTo) {
    return new Ext.Container({
      layout: 'hbox',
      height: 47,
      width: 'auto',
      cls: 'search-bar-container',
      style: {
        position: `relative`,
        border: `1px #ccc solid`,
        borderRadius: `0 6px 6px 6px`,
        background: `#FFF`,
      },
      renderTo: renderTo,
      items: [
        new Ext.form.TextField({
          width: 486,
          height: 45,
          style: {
            border: `none`,
            background: `none`,
            fontSize: `16px`,
            marginLeft: `10px`
          }
        }),
        new Ext.BoxComponent({
          height: 45,
          width: 45,
          style: {
            border: `8px solid transparent`,
            backgroundImage: `url('https://cn.bing.com/sa/simg/hpc26.png')`,
            backgroundPosition: `-169px -63px`,
            cursor: 'pointer'
          },
          autoEl: {
            tag: 'div',
          }
        }),
      ]
    });
  }

  getSearchBar('cn-search-bar')
  getSearchBar('en-search-bar')

  const searchBarTabs = new Ext.TabPanel({
    activeTab: 0,
    tabCls: 'search-bar-tabs-tab',
    baseCls: 'search-bar-tabs',
    ctCls: 'search-bar-container',
    width: 535,
    style: {
      position: `relative`,
      marginLeft: `21px`
    },
    items: [{
      title: '国内版',
      contentEl: 'cn-search-bar'
    }, {
      title: '国际版',
      contentEl: 'en-search-bar'
    }],
  });


  const searchBarWrapper = new Ext.Container({
    pageY: 190,
    pageX: 140,
    width: '100%',
    layout: 'hbox',
    layoutConfig: {
      padding: '36px 0 0 0'
    },
    style: {
      position: 'absolute',
    },
    items: [
      bingLogo,
      searchBarTabs
    ]
  });


  new Ext.Viewport({
    cls: 'view-point',
    items: [
      searchBarWrapper
    ]
  })
});
