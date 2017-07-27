import Vue from 'vue'
import AV from 'leancloud-storage'
var APP_ID = 'oLmflbM2xuKHX3nyaei3N6wv-gzGzoHsz';
var APP_KEY = 'wbUXmTG1bb5asEMJpLBdpus2';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


var app = new Vue({
  el: '#app',
  data: {
    actionType:'signUp',
    newTodo: '',
    todoList: [],
    currentUser:null,
    formData: {
        username:'',
        password:'',
    }
  },
  created:function(){
    //获取用户的数据
    this.currentUser = this.getCurrentUser(); 
    // if(this.currentUser){
    //     var query = new AV.Query("Alltodos");
    //     query.find().then((todos)=>{
    //         let todoAlls = todos[0];
    //         this.todoList.id = todoAlls.id;
    //         this.todoList = JSON.parse(todoAlls.attributes.content);
    //     })
    // }

  
    window.onbeforeunload =()=>{
        let data = JSON.stringify(this.todoList);
        window.localStorage.setItem("data",data);
        window.localStorage.setItem("oldTodo",this.newTodo);
    }

    // let data_string = window.localStorage.getItem("data");
    // let oldTodo = window.localStorage.getItem("oldTodo");
    // let data = JSON.parse(data_string);
    // this.todoList = data||[];
    // this.newTodo = oldTodo;
    // this.currentUser = this.getCurrentUser();
    // let oldTodo = windo.localStorage.getItem("oldTodo");
    
    
  },
  methods: {
        fetchTodos : function(){
            this.currentUser = this.getCurrentUser(); 
            if(this.currentUser){
                var query = new AV.Query("Alltodos");
                query.find().then((todos)=>{
                    let todoAlls = todos[0];
                    this.todoList.id = todoAlls.id;
                    this.todoList = JSON.parse(todoAlls.attributes.content);
                })
            }
        },
        updateTodos: function(){
            let data_string = JSON.stringify(this.todoList);
            let todo = AV.Object.createWithoutData("Alltodos",this.todoList.id);
            todo.set("content",data_string);
            todo.save().then(()=>{
                console.log("更新成功");
            })
        },
        saveTodos: function(){
            let data_string = JSON.stringify(this.todoList);
            let AVTodos = AV.Object.extend("Alltodos");
            let avtodos = new AVTodos();
            //设置access control list

            var acl = new AV.ACL();
            acl.setReadAccess(AV.User.current(),true);
            acl.setWriteAccess(AV.User.current(),true);
            avtodos.setACL(acl);

            avtodos.set("content",data_string);
            avtodos.save().then((todo)=>{
                this.todoList.id = todo.id;
                console.log("保存成功");
            },function(error){
                console.log("保存失败");
            });
        },
        saveorUpdateTodos: function(){
            if(this.todoList.id){
                this.updateTodos();
            }
            else {
                this.saveTodos();
            }
        },
        addTodo:function(event){
            this.todoList.push({
                title:this.newTodo,
                createdAt:new Date().toLocaleString(),
                done:false,
            });
            console.log(this.todoList);
            this.newTodo='';
            this.saveorUpdateTodos();
        },
        deleteTodo:function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1);
            this.saveorUpdateTodos();
        },
        signUp:function(){
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser)=> {
                this.currentUser = this.getCurrentUser();
            }, function (error) {
                alert("注册失败");
            });
        },
        login: function(){
            // let user = new AV.User();
            //AVuser不能用new 
            AV.User.logIn(this.formData.username,this.formData.password).then((loginedUser)=>{
                this.fetchTodos();               
            },function(error){
                alert("登陆失败");
            });
        },
        getCurrentUser:function(){
            let current = AV.User.current();
            if(current){
                let {id,createdAt,attributes:{username}} =  AV.User.current();
                return {id,createdAt,username};
            }
            else {
                return null;
            }
        },
        logout: function(){
            AV.User.logOut();
            this.currentUser=null;
        }
  }
})                 