namespace myapp.Controllers {

    export class HomeController {
        public message;
        public local;



        constructor(
            $window: ng.IWindowService
        ) {
            let msg = $window.localStorage.setItem('item', this.local);
            this.message = $window.localStorage.getItem('item');

        }

    }
    export class ListController {
        public lists;
        public list;
        public show = false;

        public showTask() {
            this.show? this.show = false: this.show = true;
        }

        public save() {
            this.taskListService.save(this.list).then(() => {
                this.lists = this.taskListService.list(); // redisplay list
                this.list = {};  // clear form
            }).catch((err) => {
                console.error(err);
            })
        }

        public remove(listId) {
            this.taskListService.remove(listId).then(() => {
                this.lists = this.taskListService.list(); // redisplay list
            }).catch((err) => {
                console.error(err);
            });
        }

        constructor(
            private taskListService: myapp.Services.TaskListService
            ) {
            this.lists = this.taskListService.list();
        }
    }

    export class EditController {
        public list;

        public save() {
            this.taskListService.save(this.list).then(() => {
                this.$state.go('tasks'); // navigate back to tasks
            }).catch((err) => {
                console.log(err);
            });
        }

        constructor(
            private taskListService: myapp.Services.TaskListService,
            private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ) {
            let listId = $stateParams['id'];
            this.list = this.taskListService.get(listId);
        }
    }

    export class TaskController {

    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
