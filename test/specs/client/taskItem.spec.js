import Vue from 'vue';
import Resource from 'vue-resource';
import TaskItem from '../../../client/components/taskItem.vue';

Vue.use(Resource);
Vue.http.options.root = '/api';

describe('TaskItem', () => {
  const Comp = Vue.extend(TaskItem);
  // const vm = new Vue(TaskItem).$mount();

  describe('AJAX calls', () => {

    describe('updating an item', () => {

      describe('successful update', () => {
        Vue.http.interceptors.push((request, next) => {
          let data = {
            title: 'Update task',
            done: true,
            createdAt: '2017-01-31T16:30:51.657Z',
            id: 0
          };

          next(request.respondWith(data, {
            status: 200,
            statusText: 'Ok'
          }));
        });

        const vm = new Comp({
          propsData: {
            item: {
              title: 'Update task',
              done: false,
              createdAt: '2017-01-31T16:30:51.657Z',
              id: 0
            }
          }
        }).$mount();

        beforeEach(() => {
          vm.item.done = false;
        });

        it('should set done to true', () => {
          return vm.update().then((status) => {
            expect(status).to.be.true;
          });
        });

      });

    });

    describe('deleting an item', () => {

      describe('successful deletion', () => {
        Vue.http.interceptors.push((request, next) => {

          next(request.respondWith({}, {
            status: 200,
            statusText: 'Ok'
          }));
        });

        const vm = new Comp({
          propsData: {
            item: {
              title: 'Update task',
              done: false,
              createdAt: '2017-01-31T16:30:51.657Z',
              id: 0
            }
          }
        }).$mount();

        it('should remove the task', () => {
          return vm.remove().then((status) => {
            expect(status).to.be.true;
          });
        });

      });

    });

  });

});
