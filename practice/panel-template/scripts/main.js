Ext.onReady(function () {

  const data = {name: 'Xiaoming', age: 10}

  const template = new Ext.Template([
    `<div>{name} is {age} year old!</div>`
  ])

  template.compile()
  template.apply(data)

  console.log(template.apply(data))

  const panel = new Ext.Panel({
    tpl: template,
    data: data
  })


  const xdata = {
    contents: [
      {active: true, name: 'Xiaoming', age: 18},
      {active: true, name: 'Xiaozhang', age: 17},
      {active: false, name: 'Xiaohong', age: 20},
      {active: true, name: 'Xiaotong', age: 22},
    ]
  };

  const xtpl = new Ext.XTemplate(
    `<ul>`,
    `<tpl for=".">`,
    `<tpl if="active">`,
    `<li>{name} is {age} years old</li>`,
    `</tpl>`,
    `</tpl>`,
    `</ul>`,
  )

  const xpanel = new Ext.Panel({
    tpl: xtpl,
    data: xdata.contents
  })
  // xtpl.overwrite(xpanel.body, xdata.contents)

  new Ext.Viewport({
    items: [xpanel]
  })
})