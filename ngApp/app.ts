namespace myapp {

    angular.module('myapp', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: myapp.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('tasks', {
                url: '/tasks',
                templateUrl: '/ngApp/views/tasks.html',
                controller: myapp.Controllers.ListController,
                controllerAs: 'controller'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/views/edit.html',
                controller: myapp.Controllers.EditController,
                controllerAs: 'controller'
            })
            .state('list', {
                url: '/list/:tasks',
                templateUrl: '/ngApp/views/oneList.html',
                controller: myapp.Controllers.TaskController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: myapp.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: myapp.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('profile', {
                url: '/profile/:username',
                templateUrl: '/ngApp/views/profile.html',
                controller: myapp.Controllers.ProfileController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: myapp.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
