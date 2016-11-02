namespace myapp.Services {
    export class TaskListService {
        private ListResource;
        private Task;

        public get(id) {
            return this.ListResource.get({ id: id });
        }

        public list() {
            return this.ListResource.query();
        }

        public save(list) {
            return this.ListResource.save({ id: list._id }, list).$promise;
        }

        public remove(listId) {
            return this.ListResource.remove({ id: listId }).$promise;
        }

        public getTasks(id) {
            return this.Task = this.ListResource.get({ id: id}).then((res) => {
                return res.tasks;
            })
        }



        constructor($resource: ng.resource.IResourceService) {
            this.ListResource = $resource('/tasks/:id/:tasks');
        }
    }

    angular.module('myapp').service("taskListService", TaskListService);
}
