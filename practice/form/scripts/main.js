Ext.onReady(function () {

  const testFormNameField = new Ext.form.TextField({
    id: 'nameField',
    fieldLabel: 'name',
    msgTarget: 'under'
  })
  const testFormNameFieldQtip = new Ext.form.TextField({
    id: 'nameFieldQtip',
    fieldLabel: 'Qtip',
    msgTarget: 'qtip'
  })
  const testFormNameFieldTitle = new Ext.form.TextField({
    id: 'nameFieldTitle',
    fieldLabel: 'Title',
    msgTarget: 'title'
  })
  const testFormNameFieldUnder = new Ext.form.TextField({
    id: 'nameFieldUnder',
    fieldLabel: 'Under',
    msgTarget: 'under'
  })
  const testFormNameFieldSide = new Ext.form.TextField({
    id: 'nameFieldSide',
    fieldLabel: 'side',
    msgTarget: 'side'
  })
  const testFormNameFieldElid = new Ext.form.TextField({
    id: 'nameFieldElid',
    fieldLabel: 'Elid',
    msgTarget: 'displayField'
  })

  const displayField = new Ext.form.DisplayField({
    id: 'displayField'
  })

  const testFormResetBtn = new Ext.Button({
    text: 'Reset',
    listeners: {
      'click': function (btn, form) {
        Ext.getCmp('testForm').getForm().reset()
      }
    }
  })
  Ext.QuickTips.init()
  const testFormSubmitBtn = new Ext.Button({
    text: 'Submit',
    listeners: {
      'click': function (btn, form) {
        Ext.getCmp('testForm').getForm().markInvalid([
          {
            id: 'nameFieldQtip', msg: 'Field is required'
          }, {
            id: 'nameFieldTitle', msg: 'Field is required'
          }, {
            id: 'nameFieldUnder', msg: 'Field is required'
          }, {
            id: 'nameFieldSide', msg: 'Field is required'
          }, {
            id: 'nameFieldQtip', msg: 'Field is required'
          }, {
            id: 'nameFieldElid', msg: 'Field is required'
          },
        ])
      }
    }
  })

  const testForm = new Ext.FormPanel({
    id: 'testForm',
    labelWidth: 50,
    width: 500,
    frame: true,
    title: 'Test Form',
    items: [testFormNameField,
      testFormNameFieldQtip,
      testFormNameFieldTitle,
      testFormNameFieldSide,
      testFormNameFieldUnder,
      testFormNameFieldElid,
      displayField],
    buttons: [testFormResetBtn, testFormSubmitBtn,]
  })

  const fullFormTextField = new Ext.form.TextField({
    id: 'fftext',
    fieldLabel: 'Name',
    msgTarget: 'under',
    minLength: 1,
    maxLength: 50,
    emptyText: 'Please input your name',
    width: 300
  })

  const fullFormTextArea = new Ext.form.TextArea({
    id: 'fftextarea',
    fieldLabel: 'description',
    msgTarget: 'under',
    emptyText: 'Please input your description',
    width: 300
  })

  const fullFormDateField = new Ext.form.DateField({
    id: 'ffdate',
    fieldLabel: 'Birthday',
    msgTarget: 'under',
    emptyText: 'Please input your birthday',
    width: 300
  })

  const fullFormTileField = new Ext.form.TimeField({
    id: 'fftime',
    fieldLabel: 'Time',
    msgTarget: 'under',
    emptyText: 'Please input your time',
    width: 300
  })

  const fullFormEditor = new Ext.form.HtmlEditor({
    id: 'ffeditor',
    fieldLabel: 'Story',
    msgTarget: 'under',
    width: 600
  })

  const fullFormHidden = new Ext.form.Hidden({
    id: 'ffhidden'
  })

  const fullFormCheckboxSet = new Ext.form.FieldSet({
    id: 'checkboxset',
    title: 'Checkbox',
    defaultType: 'checkbox',
    items: [{
      value: 0,
      boxLabel: 'Apple'
    }, {
      value: 1,
      boxLabel: 'Xiaomi'
    }, {
      value: 2,
      boxLabel: 'Huawei'
    }]
  })

  const fullFormRadioSet = new Ext.form.FieldSet({
    id: 'radioSet',
    title: 'Radio',
    defaultType: 'radio',
    items: [{
      value: 0,
      boxLabel: 'Apple',
      name: 'radio'
    }, {
      value: 1,
      boxLabel: 'Xiaomi',
      name: 'radio'

    }, {
      value: 2,
      boxLabel: 'Huawei',
      name: 'radio'
    }]
  })

  const fullFormFileUpload = new Ext.form.TextField({
    id: 'fffile',
    fieldLabel: 'File',
    inputType: 'file'
  })

  const fullFormSubmitButton = new Ext.Button({
    text: 'Submit',
    handler: function () {
      const values = Ext.getCmp('fullForm').getForm().getValues(false);
      Ext.MessageBox.alert("Values", JSON.stringify(values))
    }
  })

  fullFormHidden.setValue("Hello World")

  const fullForm = new Ext.FormPanel({
    id: 'fullForm',
    labelWidth: 100,
    width: 800,
    frame: true,
    title: 'Full Form',
    labelAlign: 'center',
    fileUpload: true,
    url: '/',
    items: [
      fullFormTextField,
      fullFormTextArea,
      fullFormDateField,
      fullFormTileField,
      fullFormEditor,
      fullFormHidden,
      fullFormCheckboxSet,
      fullFormRadioSet,
      fullFormFileUpload
    ],
    buttons: [fullFormSubmitButton]
  })

  const provinceCity = [
    {
      province: 'GuangDong',
      cities: ['GuangZhou', 'ZhuHai']
    }, {
      province: 'Fujian',
      cities: ['FuZhou', 'XiaMen']
    }
  ]

  const getProvinces = () => provinceCity.map((data, index) => [index, data.province])

  const getCityByIndex = (index) => provinceCity[index].cities.map((city, _index) => ({id: _index, name: city}))

  const comboFormProvince = new Ext.form.ComboBox({
    id: 'province',
    fieldLabel: 'Province',
    mode: 'local',
    store: new Ext.data.ArrayStore({
      id: 0,
      fields: ['id', 'name'],
      data: getProvinces(),
    }),
    valueField: 'id',
    displayField: 'name'
  })

  const cityStore = new Ext.data.ArrayStore({
    id: 1,
    fields: ['id', 'name'],
    data: [],
  })

  const comboFormCity = new Ext.form.ComboBox({
    id: 'city',
    fieldLabel: 'City',
    mode: 'local',
    store: cityStore,
    valueField: 'id',
    displayField: 'name'
  })

  comboFormProvince.on('select', function (comboBox) {
    cityStore.removeAll(false);
    cityStore.add(getCityByIndex(comboBox.getValue()).map(city =>
      new Ext.data.Record(city)
    ))
  })

  const comboForm = new Ext.FormPanel({
    id: 'comboForm',
    labelWidth: 100,
    width: 800,
    title: 'Combo Form',
    items: [comboFormProvince, comboFormCity]
  })

  const readerFormDateField = new Ext.form.DateField({
    id: 'rdate',
    fieldLabel: 'Birthday',
    msgTarget: 'under',
    emptyText: 'Please input your birthday',
    width: 300
  })

  const readerFormComboBox = new Ext.form.ComboBox({
    id: 'rcombobox',
    fieldLabel: 'ComboBox',
    mode: 'local',
    store: new Ext.data.ArrayStore({
      id: 0,
      fields: ['id', 'name'],
      data: getProvinces(),
    }),
    valueField: 'id',
    displayField: 'name'
  })

  const readerFormLoadBtn = new Ext.Button({
    text: 'Load',
    handler: function () {
      Ext.getCmp("readerForm").getForm().load({url: 'data.json'})
    }
  })

  const readerFormReader = new Ext.data.JsonReader({
    fields: [
      {name: 'rtext', type: 'string'},
      {name: 'rnumber', type: 'int'},
      {name: 'rdate', type: 'date', dateFormat: 'Y-m-d'},
      {name: 'rcombobox', type: 'int'},
    ]
  })

  const readerForm = new Ext.FormPanel({
    title: 'Reader Form',
    id: 'readerForm',
    defaultType: 'textfield',
    width: 500,
    labelWidth: 100,
    frame: true,
    reader: readerFormReader,
    items: [
      {
        fieldLabel: 'Text',
        id: 'rtext'
      },
      {
        fieldLabel: 'number',
        id: 'rnumber'
      },
      readerFormDateField,
      readerFormComboBox
    ],
    buttons: [
      readerFormLoadBtn
    ]
  })

  const wrapper = new Ext.Container({
    items: [
      // testForm,
      // fullForm,
      // comboForm,
      readerForm
    ]
  });

  new Ext.Viewport({
    cls: 'view-point',
    items: [
      wrapper
    ]
  })
})