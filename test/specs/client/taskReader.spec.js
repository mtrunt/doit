import Vue from 'vue';
import Resource from 'vue-resource';
import TaskReader from '../../../client/components/taskReader.vue';

Vue.use(Resource);
Vue.http.options.root = '/api';

describe('TaskReader', () => {
  const vm = new Vue(TaskReader).$mount();

  describe('Instance methods', () => {

    beforeEach(() => {
      vm.task.title = 'Initial title';
    });

    it('should reset the task\'s title', () => {
      vm.reset();

      expect(vm.task.title).to.equal('');
    });
  });

  describe('AJAX calls', () => {

    describe('adding a new task', () => {

      Vue.http.interceptors.push((request, next) => {
        const data = {
          title: 'New task',
          done: false,
          createdAt: '2017-01-31T16:30:51.657Z',
          id: 0
        };

        next(request.respondWith(data, {
          status: 200,
          statusText: 'Ok'
        }));
      });

      it('should add a task if the title is not empty', () => {
        vm.task.title = 'New task';

        return vm.add().then((status) => {
          expect(status).to.be.true;
        });
      });

      it('should not add a task if the title is empty', () => {
        vm.task.title = '';

        expect(vm.add()).to.not.exist;
      });

    });

  });

});
