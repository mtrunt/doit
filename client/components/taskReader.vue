<template>
    <div class="reader">
        <input ref="reader" v-model="task.title" @keyup.enter="add" placeholder="What are you gonna do today?">
        <button v-show="task.title && !loading" @click="add" class="btn btn-success"><i class="fa fa-fw fa-plus"></i></button>
        <button v-show="loading" class="btn btn-default"><i class="fa fa-spinner fa-spin fa-fw"></i></button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                task: {
                    title: ''
                },
                loading: false
            }
        },
        mounted() {
            this.$refs.reader.focus();
        },
        methods: {
            reset() {
                this.task.title = '';
            },
            add() {
                let title = this.task.title;

                // Trim whitespace and replace multiple spaces with one
                title = title.replace(/\s+/gi, ' ').trim();

                if(title.length > 0) {
                    return this.$http.post('tasks', {
                            title
                        },
                        {
                            before() {
                                this.loading = true;
                            }
                        })
                        .then((response) => {
                            // Pass the task to the list
                            this.$emit('task:add', response.body);

                            // Reset the model
                            this.reset();

                            return true;
                        }, (reason) => {
                            // TODO: Handle rejection
                            console.log(reason);

                            return false;
                        })
                        .then((status) => {
                            this.loading = false;

                            return status;
                        });

                }
            }
        }
    };
</script>
