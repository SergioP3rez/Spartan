System.register(['angular2/core', 'angular2/router', '../dashboard-alumno/dashboard-alumno', '../inicio/inicio', '../perfil/perfil', '../mensajes/mensajes', '../ejercicios/ejercicios', '../calentadas/calentadas', '../autenticacion/router', '../login/login', '../registroEntrenador/registroEntrenador', '../resgistroAlumno/registroAlumno'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, dashboard_alumno_1, inicio_1, perfil_1, mensajes_1, ejercicios_1, calentadas_1, router_2, login_1, registroEntrenador_1, registroAlumno_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_alumno_1_1) {
                dashboard_alumno_1 = dashboard_alumno_1_1;
            },
            function (inicio_1_1) {
                inicio_1 = inicio_1_1;
            },
            function (perfil_1_1) {
                perfil_1 = perfil_1_1;
            },
            function (mensajes_1_1) {
                mensajes_1 = mensajes_1_1;
            },
            function (ejercicios_1_1) {
                ejercicios_1 = ejercicios_1_1;
            },
            function (calentadas_1_1) {
                calentadas_1 = calentadas_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (registroEntrenador_1_1) {
                registroEntrenador_1 = registroEntrenador_1_1;
            },
            function (registroAlumno_1_1) {
                registroAlumno_1 = registroAlumno_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                }
                AppComponent.prototype.logOut = function () {
                    // Eliminar localstorage
                    localStorage.removeItem('spartan');
                    this.router.navigateByUrl("/login");
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'spartan',
                        templateUrl: 'app/main/app.main.html',
                        styleUrls: ['app/main/app.main.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, router_2.LoggedInRouterOutlet],
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({ path: '/inicio', component: inicio_1.Inicio, name: 'Inicio' }),
                        new router_1.Route({ path: '/alumno', component: dashboard_alumno_1.DashboardAlumno, name: 'DashboardAlumno', useAsDefault: true }),
                        new router_1.Route({ path: '/perfil', component: perfil_1.Perfil, name: 'Perfil' }),
                        new router_1.Route({ path: '/ejercicios', component: ejercicios_1.Ejercicios, name: 'Ejercicios' }),
                        new router_1.Route({ path: '/mensajes', component: mensajes_1.Mensajes, name: 'Mensajes' }),
                        new router_1.Route({ path: '/calentadas', component: calentadas_1.Calentadas, name: 'Calentadas' }),
                        new router_1.Route({ path: '/login', component: login_1.Login, name: 'Login' }),
                        new router_1.Route({ path: '/registroEntrenador', component: registroEntrenador_1.RegistroEntrenador, name: 'RegistroEntrenador' }),
                        new router_1.Route({ path: '/registroAlumno', component: registroAlumno_1.RegistroAlumno, name: 'RegistroAlumno' }),
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=../../../../app/main/app.component.js.map