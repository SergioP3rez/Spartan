System.register(['angular2/core', '../../../services/user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1;
    var StudentSignUp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            StudentSignUp = (function () {
                function StudentSignUp(userService) {
                    this.userService = userService;
                }
                StudentSignUp.prototype.registrar = function () {
                    if (this.pass1 === this.pass2) {
                        console.log("HAS PULSADO SUBMIT!!!!");
                        console.log(this.toJSON());
                        // var aux= JSON.parse(localStorage.getItem('usuarios'));
                        // aux.push({user:this.model.user,pass:this.model.pass1,rol:"2"});
                        // localStorage.removeItem('usuarios');
                        // localStorage.setItem('usuarios', JSON.stringify(aux));
                        this.userService.newUser(this.toJSON());
                    }
                };
                StudentSignUp.prototype.toJSON = function () {
                    return {
                        trainerId: 1,
                        name: this.name,
                        lastname: this.lastname,
                        roles: ["ROLE_STUDENT"],
                        email: this.email,
                        gender: this.gender,
                        birthday: 1360006343670,
                        registrationDate: Date.now(),
                        goals: [],
                        img_url: ""
                    };
                };
                StudentSignUp = __decorate([
                    core_1.Component({
                        selector: 'registroAlumno',
                        templateUrl: 'app/components/session/student-signUp/student-signUp.html',
                        providers: [user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService])
                ], StudentSignUp);
                return StudentSignUp;
            })();
            exports_1("StudentSignUp", StudentSignUp);
            ;
        }
    }
});
//# sourceMappingURL=../../../../../../app/components/session/student-signUp/student-signUp.component.js.map