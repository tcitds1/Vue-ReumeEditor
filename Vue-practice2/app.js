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
    window.onbeforeunload =()=>{
        let data = JSON.stringify(this.todoList);
        window.localStorage.setItem("data",data);
        window.localStorage.setItem("oldTodo",this.newTodo);
    }
    let data_string = window.localStorage.getItem("data");
    let oldTodo = window.localStorage.getItem("oldTodo");
    let data = JSON.parse(data_string);
    this.todoList = data||[];
    this.newTodo = oldTodo;
    this.currentUser = this.getCurrentUser();
    // let oldTodo = windo.localStorage.getItem("oldTodo");
    
  },
  methods: {
        addTodo:function(event){
            this.todoList.push({
                title:this.newTodo,
                createdAt:new Date().toLocaleString(),
                done:false,
            });
            console.log(this.todoList);
            this.newTodo='';
        },
        deleteTodo:function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1);
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
            AV.User.logIn(this.formData.username, this.formData.password).then( (loginedUser)=>{
                    this.currentUser = this.getCurrentUser();
                    console.log("hello");
                    console.log(AV.User.current());
            }, function (error) {
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