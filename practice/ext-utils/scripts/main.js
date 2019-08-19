Ext.onReady(function () {
  const now = new Date();
  console.log(Ext.util.Format.date(now, 'Y-m-d H:m:s'))
  console.log(Ext.util.Format.trim(`   AA  BB   `))
  console.log(Ext.util.Format.usMoney(10000))

  const delayTask = new Ext.util.DelayedTask(() => {
    Ext.MessageBox.alert("Delay", "This is a delay task")
  })
  delayTask.delay(1000)

  var task = {
    run: function(){
      Ext.query("#id1").forEach(item => {
        Ext.get(item).highlight("#FFCCDD")
      })
    } ,
    interval: 1000
  }
  new Ext.util.TaskRunner().start(task);//
})