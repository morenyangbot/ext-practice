Ext.onReady(function () {

  const data = {name: 'Xiaoming', age: 10}

  const template = new Ext.Template([
    `<div>{name} is {age} year old!</div>`
  ])

  template.compile()
  template.apply(data)

  // console.log(template.apply(data))

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

  // console.log(xtpl.apply(xdata))

  const xpanel = new Ext.Panel({
    tpl: xtpl,
    data: xdata.contents
  })
  // xtpl.overwrite(xpanel.body, xdata.contents)

  const xtpl1 = new Ext.XTemplate(
    `<tpl for="4"><span>{#}</span></tpl>`
  )

  const tableXTemplate = new Ext.XTemplate(
    `<table>`,
    `<tpl for="rows">`,
    `<tr>`,
    `<tpl for="cols">`,
    `<td></td>`,
    `</tpl>`,
    `</tr>`,
    `</tpl>`,
    `</table>`,
  )

  const _data = {
    rows: [{cols: [0, 0, 0]}, {cols: [0, 0, 0]}, {cols: [0, 0, 0]}],
  }

  console.log(tableXTemplate.apply(_data))

  console.log(xtpl1.apply({}))

  new Ext.Viewport({
    items: [xpanel]
  })
})