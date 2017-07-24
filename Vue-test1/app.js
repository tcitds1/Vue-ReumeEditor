import Vue from 'vue'
var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
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
    
    

    // let oldTodo = windo.localStorage.getItem("oldTodo");
    
  },
  methods: {
        addTodo:function(event){
            this.todoList.push({
                title:this.newTodo,
                createdAt:new Date().toLocaleString(),
                done:false
            });
            console.log(this.todoList);
            this.newTodo='';
        },
        deleteTodo:function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1);
        }
     
  }
})                 