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
    export class UserService {
        private UserResource;
        private username;
        private password;

        public getInfo() {
            return this.UserResource.get().$promise;
        }

        constructor($resource: ng.resource.IResourceService) {
            this.UserResource = $resource('/user/profile');
        }
    }
    angular.module('myapp').service('userService', UserService);

    angular.module('myapp').service("taskListService", TaskListService);
}
