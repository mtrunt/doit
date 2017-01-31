<template>
    <li class="list-item">
        <div class="controls">
            <span class="timestamp">{{ createdAt }}</span>
            <i class="fa fa-trash" @click="remove"></i>
        </div>
        <label>
            <input type="checkbox" v-model="item.done" @click.prevent.stop="update">
            <span class="title">{{ item.title }}</span>
        </label>
        <div class="update" v-if="updating"><span>Updating...</span></div>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                updating: false
            }
        },
        props: ['item'],
        methods: {
            remove() {
                return this.$http.delete(`tasks/${this.item.id}`,
                {
                    before() {
                        this.updating = true;
                    }
                })
                .then((response) => {
                    this.$emit('item:remove', this.item.id);

                    return true;
                }, (reason) => {
                    // TODO: Handle rejection
                    console.log(reason);

                    return false;
                })
                .then((status) => {
                    this.updating = false;

                    return status;
                });
            },
            update() {
                let newStatus = this.item.done;

                return this.$http.patch(`tasks/${this.item.id}`,
                    {
                        done: newStatus
                    },
                    {
                        before() {
                            // Set the done status as the previous one
                            // to prevent the checkbox from changing state
                            this.item.done = !newStatus;

                            this.updating = true;
                        }
                    })
                    .then((response) => {
                        // Update the status if successful
                        this.item.done = newStatus;

                        return true;
                    }, (reason) => {
                        // TODO: Handle rejection
                        console.log(reason);

                        return false;
                    })
                    .then((status) => {
                        this.updating = false;

                        return status;
                    });
            }
        },
        computed: {
            createdAt() {
                return new Date(this.item.createdAt).toLocaleDateString();
            }
        }
    };
</script>
