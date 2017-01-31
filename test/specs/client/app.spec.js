import Vue from 'vue';
import Resource from 'vue-resource';
import App from '../../../client/app.vue';

Vue.use(Resource);
Vue.http.options.root = '/api';

describe('App', () => {

  describe('Instance methods', () => {
    const vm = new Vue(App).$mount();

    beforeEach(() => {
      vm.tasks = [{
        title: 'Test task',
        done: false,
        createdAt: new Date()
      }];
    });

    it('should set the initial tasks', () => {
      vm.setTasks([{
        title: 'First',
        done: false,
        createdAt: new Date()
      }, {
        title: 'Second',
        done: true,
        createdAt: new Date()
      }]);

      expect(vm.tasks.length).to.equal(2);
    });

    it('should add a new task', () => {
      vm.addTask({
        title: 'Test task'
      });

      expect(vm.tasks.length).to.equal(2);
    });

    it('should remove the selected task', () => {
      vm.removeTask(0);

      expect(vm.tasks.length).to.equal(0);
    });
  });

  describe('AJAX calls', () => {

    describe('Initial call on mount', () => {

      it('should fetch the tasks on mount', (done) => {
        Vue.http.interceptors.push((request, next) => {
          const data = [{
            title: 'First',
            done: false,
            createdAt: new Date()
          }, {
            title: 'Second',
            done: true,
            createdAt: new Date()
          }];

          next(request.respondWith(data, {
            status: 200,
            statusText: 'Ok'
          }));
        });

        const vm = new Vue(App).$mount();

        Vue.nextTick(() => {
          expect(vm.tasks.length).to.equal(2);
          done();
        });
      });

    });

  });

});
