namespace myapp.Controllers {
    export class HomeController {

    }
    export class ProfileController {
        public info;

        public getInfo() {
            this.userService.getInfo().then((user) => {
                this.info = user;
                console.log(user);
            });
        }

        constructor(private userService: myapp.Services.UserService) {
            this.getInfo();
        }
    }
    export class SignupController {
        // Required user information to signup
        // Values coming from the 'signup' page
        public username;
        public email;
        public password;
        // Message to display to user if error
        public message;

        // Function for new user signup located on the 'signup' page
        // calls the $auth.signup method with user information
        // to add to database and loads the login page
        public signup() {
            this.$auth.signup({username: this.username, email: this.email, password: this.password}).then((res) => {
                // On success, load the login page
                this.$state.go('login');
            }).catch((err) => {
                // display an error message
                this.message = err.message;
            });
        }

        constructor(
            private $auth,
            private $state: ng.ui.IStateService
        ) {}
    }
    export class LoginController {
        // Collect user information from the login views
        // email and password will be used to login after
        // the user has already signed up
        public username;
        public password;
        // A message to display to the user if there are any errors loging in
        public message;

        // Function to call the $authProvider $auth.login method
        // This will return a JWT and be stored in localStorage
        // User will have access to all protected pages now.
        public login() {
            this.$auth.login({username: this.username, password: this.password}).then((res) => {
                // If successful, load the profile view
                this.$state.go('profile');
            }).catch((err) => {
                // Display message if something goes worng
                this.message = err.message;
            });
        }

        constructor(
            private $auth,
            private $state: ng.ui.IStateService
        ) {

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

        // is user logged in?
        //uses the $auth.isAthenticated method
        public isAthenticated() {
            return this.$auth.isAuthenticated();
        }
        constructor(
            private taskListService: myapp.Services.TaskListService,
            private $auth
            ) {
            this.lists = this.taskListService.list();
            // this.isAthenticated();
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
