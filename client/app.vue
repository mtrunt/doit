<template>
    <div class="container-fluid text-center">
        <div class="row header">
            <div class="col-xs-12">
                <h1>Simple TO-DO <i class="fa fa-check" aria-hidden="true"></i></h1>
                <task-reader @task:add="addTask"></task-reader>
            </div>
            <div class="col-xs-12">
               <div v-show="tasks.length > 0" class="filters">
                    View:
                    <label :class="{ off: !filters.inProgress }">
                        <input v-model="filters.inProgress" type="checkbox">
                        <span>In Progress</span>
                    </label><!--
                     --><label :class="{ off: !filters.completed }">
                        <input v-model="filters.completed" type="checkbox">
                        <span>Completed</span>
                    </label>
               </div>
            </div>
        </div>

        <div v-if="tasks.length <= 0" class="starter">
            Add some tasks to get started!
        </div>

        <div class="row content">
            <div class="col-xs-12">
                <div class="task-list">
                    <ul>
                        <task-item v-for="(task, index) in tasks" v-show="filterTask(task)" :item="task" @item:remove="removeTask(index)"></task-item>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TaskReader from './components/taskReader.vue';
    import TaskItem from './components/taskItem.vue';

    export default {
        data() {
            return {
                tasks: [],
                filters: {
                    completed: true,
                    inProgress: true
                }
            };
        },
        mounted() {
            // Get all the tasks
            this.$http.get('tasks')
            .then((response) => {
                this.setTasks(response.body);
            }, (reason) => {
                // TODO: Handle rejection
                console.log(reason);
            });
        },
        components: {
            TaskReader,
            TaskItem
        },
        methods: {
            setTasks(tasks) {
                this.tasks = tasks;
            },
            addTask(task) {
                this.tasks.push(task);
            },
            removeTask(index) {
                this.tasks.splice(index, 1);
            },
            filterTask(task) {
                if(task.done === this.filters.completed
                    || task.done === !this.filters.inProgress) {
                    return true;
                }

                return false;
            }
        }
    };
</script>
