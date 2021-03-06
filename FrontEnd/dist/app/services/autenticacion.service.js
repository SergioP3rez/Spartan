System.register(['angular2/core', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AutenticacionService;
    function utf8_to_b64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AutenticacionService = (function () {
                function AutenticacionService(http) {
                    this.http = http;
                }
                AutenticacionService.prototype.req_isLogged = function () {
                    var _this = this;
                    var headers = new http_1.Headers({
                        'X-Requested-With': 'XMLHttpRequest'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.get('logIn', options).subscribe(function (response) { return _this.processLogInResponse(response); }, function (error) {
                        if (error.status != 401) {
                            console.error("Error when asking if logged: " +
                                JSON.stringify(error));
                        }
                    });
                };
                AutenticacionService.prototype.processLogInResponse = function (response) {
                    console.log(response);
                    // localStorage.setItem("login", "SPARTAN"); // ERROR: Machea si existe una pagina la cual si existe
                    this.user = response.json();
                    if (this.user.roles.indexOf("ROLE_ADMIN") !== -1) {
                        localStorage.setItem("rol", "ADMIN");
                        localStorage.setItem("login", "SPARTAN"); // BORRAR EN UN FUTURO
                    }
                    if (this.user.roles.indexOf("ROLE_USER") !== -1) {
                        localStorage.setItem("rol", "USER");
                        localStorage.setItem("login", "SPARTAN"); // BORRAR EN UN FUTURO
                    }
                    if (this.user.roles.indexOf("ROLE_STUDENT") !== -1) {
                        localStorage.setItem("rol", "STUDENT");
                        localStorage.setItem("login", "SPARTAN"); // BORRAR EN UN FUTURO
                    }
                };
                AutenticacionService.prototype.logIn = function (user, pass) {
                    var _this = this;
                    console.log("LOGIN");
                    if (user == "DEV") {
                        this.modoDesarrollo();
                    }
                    var userPass = user + ":" + pass;
                    var headers = new http_1.Headers({
                        'Authorization': 'Basic ' + utf8_to_b64(userPass),
                        'X-Requested-With': 'XMLHttpRequest'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.get('logIn', options).map(function (response) {
                        _this.processLogInResponse(response);
                        return _this.user;
                    });
                };
                AutenticacionService.prototype.esAlumno = function () {
                    return this.isLogIn() && this.checkLS("STUDENT");
                };
                AutenticacionService.prototype.esProfesor = function () {
                    return this.isLogIn() && this.checkLS("USER");
                };
                AutenticacionService.prototype.isAdmin = function () {
                    return this.isLogIn() && this.checkLS("ADMIN");
                };
                AutenticacionService.prototype.isLogIn = function () {
                    console.log("Login:" + localStorage.getItem('login'));
                    return localStorage.getItem('login') == "SPARTAN";
                };
                AutenticacionService.prototype.logOut = function () {
                    localStorage.clear();
                    console.log("LOGOUT LLAMADO");
                    return this.http.get('logOut').map(function (response) {
                        console.log("LOGOUT LLEGO");
                        return response;
                    }, function (error) {
                        console.log("LOGOUT NO LLEGO");
                    });
                };
                AutenticacionService.prototype.checkLS = function (rol) {
                    return localStorage.getItem('rol') == rol;
                };
                // BORRAR EN UN FUTURO
                AutenticacionService.prototype.modoDesarrollo = function () {
                    localStorage.setItem("rol", "USER");
                    localStorage.setItem("login", "SPARTAN");
                };
                AutenticacionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AutenticacionService);
                return AutenticacionService;
            })();
            exports_1("AutenticacionService", AutenticacionService);
            ;
        }
    }
});
//# sourceMappingURL=../../../../app/services/autenticacion.service.js.map