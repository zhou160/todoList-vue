const vm = new Vue({
    el: '#app',
    data: {
        todoList: [],
        editInput: '',
        editFlag: false,
        removeFlag: false,
        removeIndex: 0,
        kinds: [
            {
                id: 1,
                content: '全部',
                style: 'btn-primary'
            },
            {
                id: 2,
                content: '已完成',
                style: 'btn-warning'
            }, {
                id: 3,
                content: '未完成',
                style: 'btn-danger'
            }
        ],
        type: '全部'
    },
    methods: {
        openEdit() {
            this.editFlag = true;
        },
        closeEdit() {
            this.editFlag = false;
            this.editInput = '';
        },
        checkNull() {
            if (this.editInput == '') {
                alert('输入内容不可为空');
            } else {
                this.todoList.push({
                    id: this.todoList.length + 1,
                    todoTask: this.editInput,
                    todoFlag: false
                })
                this.closeEdit();
            }
        },
        checkFinish(index, flag) {
            if (flag) {
                this.removeTask(index);
            } else {
                this.removeFlag = true;
                removeIndex = index;
            }
        },
        removeTask(index) {
            this.todoList.splice(index, 1);
            this.removeFlag = false;
        },
        reserver(newList) { 
            //这种方式走不通，冒泡
            for (let i = 0; i < newList.length-1; i++) { 
                if (newList[i].todoID > newList[i+1].todoID) { 
                    let temp = newList[i];
                    newList[i] = newList[i + 1];
                    newList[i + 1] = temp;
                }
            }
            console.log(newList);
            return newList;
        }
    },
    computed: {
        newtodoList() { 
            switch (this.type) { 
                case '全部':
                    return this.reserver(this.todoList);
                    break;
                case '已完成':
                    let newList = this.todoList.filter(item => {
                        return item.todoFlag == true;
                    });
                    return this.reserver(newList);
                    break;
                case '未完成':
                    let newList1 = this.todoList.filter(item => { 
                        return item.todoFlag == false;
                    })
                    return this.reserver(newList1);
                    break;
                default:
                    return this.reserver(this.todoList);
                    break;
            }
        }
    }
})