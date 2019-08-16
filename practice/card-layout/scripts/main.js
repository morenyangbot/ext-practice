Ext.onReady(function () {

  const questionForm1RadioGroup = new Ext.form.RadioGroup({
    id: 'question1',
    columns: 1,
    msgTarget: 'under',
    items:
      [{
        name: 'question1',
        inputValue: 1,
        boxLabel: '湿垃圾'
      }, {
        name: 'question1',
        inputValue: 2,
        boxLabel: '干垃圾'
      }, {
        name: 'question1',
        inputValue: 3,
        boxLabel: '有害垃圾'
      }, {
        name: 'question1',
        inputValue: 4,
        boxLabel: '可回收物'
      }],
  })

  const questionForm1 = new Ext.FormPanel({
    id: 'questionForm1',
    frame: true,
    labelWidth: 0,
    title: '番茄酱属于以下哪种垃圾（单选）',
    items: [
      questionForm1RadioGroup
    ],
  })

  questionForm1RadioGroup.on('change', function (group, item) {
    console.log(item.inputValue)
  })

  const questionForm2CheckboxGroup = new Ext.form.CheckboxGroup({
    name: 'question2',
    msgTarget: 'under',
    columns: 1,
    items:
      [{
        name: 'cb1',
        inputValue: 1,
        boxLabel: '把粑粑用废报纸包好带回家冲掉'
      }, {
        name: 'cb2',
        inputValue: 2,
        boxLabel: '受污染的报纸按有害垃圾处理'
      }, {
        name: 'cb3',
        inputValue: 3,
        boxLabel: '没污染的报纸按可回收垃圾处理'
      }, {
        name: 'cb4',
        inputValue: 4,
        boxLabel: '受污染的报纸浸水后当湿垃圾处理'
      }],
  })

  const questionForm2 = new Ext.FormPanel({
    id: 'questionForm2',
    frame: true,
    labelWidth: 0,
    title: '王大叔出门遛狗后，哪些是正确处理狗粑粑的方法？（多选）',
    items: [questionForm2CheckboxGroup]
  })

  const resultForm1RadioGroup = new Ext.form.RadioGroup({
    id: 'result1',
    columns: 1,
    msgTarget: 'under',
    disabled: true,
    fieldLabel: '番茄酱属于以下哪种垃圾（单选）',
    items:
      [{
        name: 'result1',
        inputValue: 1,
        boxLabel: '湿垃圾'
      }, {
        name: 'result1',
        inputValue: 2,
        boxLabel: '干垃圾'
      }, {
        name: 'result1',
        inputValue: 3,
        boxLabel: '有害垃圾'
      }, {
        name: 'result1',
        inputValue: 4,
        boxLabel: '可回收物'
      }],
  })

  const resultForm2CheckboxGroup = new Ext.form.CheckboxGroup({
    name: 'result2',
    msgTarget: 'under',
    // height: 100,
    columns: 1,
    disabled: true,
    fieldLabel: '王大叔出门遛狗后，哪些是正确处理狗粑粑的方法？（多选）',
    items:
      [{
        name: 'cb1',
        inputValue: 1,
        boxLabel: '把粑粑用废报纸包好带回家冲掉'
      }, {
        name: 'cb2',
        inputValue: 2,
        boxLabel: '受污染的报纸按有害垃圾处理'
      }, {
        name: 'cb3',
        inputValue: 3,
        boxLabel: '没污染的报纸按可回收垃圾处理'
      }, {
        name: 'cb4',
        inputValue: 4,
        boxLabel: '受污染的报纸浸水后当湿垃圾处理'
      }],
  })

  function navHandler(direction) {

    function getActiveCardId() {
      return cards.layout.activeItem.id;
    }

    const prev = Ext.getCmp('prev');
    const next = Ext.getCmp('next')
    console.log(getActiveCardId())
    if (direction === 1) {
      if (getActiveCardId() === 'page1') {
        if (!questionForm1RadioGroup.getValue()) {
          questionForm1RadioGroup.markInvalid("请选择选项")
          return
        }
        resultForm1RadioGroup.setValue(questionForm1RadioGroup.getValue().inputValue)
        cards.layout.setActiveItem(1)
        prev.setDisabled(false)
      } else if (getActiveCardId() === 'page2') {
        if (!questionForm2CheckboxGroup.getValue().length) {
          questionForm2CheckboxGroup.markInvalid("请选择至少一项")
          return;
        }
        resultForm2CheckboxGroup.reset()
        questionForm2CheckboxGroup.getValue().forEach(item => {
          resultForm2CheckboxGroup.setValue(item.name, item.checked)
        })
        cards.layout.setActiveItem(2)
        next.setDisabled(true)
      }

    } else if (direction === -1) {
      if (getActiveCardId() === 'page3') {
        cards.layout.setActiveItem(1)

      } else if (getActiveCardId() === 'page2') {
        cards.layout.setActiveItem(0)


      }

    }
  }


  const cards = new Ext.Panel({
    layout: 'card',
    id: 'card',
    height: 500,
    activeItem: 0,
    title: '调查问卷',
    defaults: {
      // applied to each contained panel
      border: false
    },
    bbar: [
      {
        text: '上一步',
        id: 'prev',
        handler: navHandler.createDelegate(this, [-1]),
        disabled: true
      },
      '->',
      {
        text: '下一步',
        id: 'next',
        handler: navHandler.createDelegate(this, [1])
      }
    ],
    items: [{
      id: 'page1',
      layout: 'fit',
      items: [
        questionForm1
      ]
    }, {
      id: 'page2',
      layout: 'fit',
      items: [
        questionForm2
      ]
    }, {
      id: 'page3',
      items: [
        new Ext.FormPanel({
          id: 'resultForm1',
          frame: false,
          labelWidth: 150,
          title: '您填写的内容',
          items: [
            resultForm1RadioGroup,
            resultForm2CheckboxGroup
          ],
          buttons: [
            {
              text: '提交',
              handler: function () {
                Ext.MessageBox.alert("问卷", "您已成功提交");
              }
            }
          ]
        })
      ]
    }]
  })

  new Ext.Viewport({
    items: [cards]
  })

})