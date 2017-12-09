var app = angular.module('indexApp', []);

// var User = require('/User');
// var jwt = require('jwt-simple');

app.controller('indexCtrl', function($scope, $http, $window) {
    $scope.signUp = function() {
        console.log("hello");
        if ($scope.pass1 == $scope.pass2) {
            $http.post("https://whatnext.site/api/get_user", {
                email: $scope.email
            }).then(function(response) {
                if (response.data.count >= 1 ? false : true) {
                    $http.post("https://whatnext.site/api/add_user", {
                        firstname: $scope.fName,
                        lastname: $scope.lName,
                        email: $scope.email,
                        password: $scope.pass1
                    }).then(function(status) {
                        console.log(status);
                    }).catch((e) => {
                        console.log("e");
                        console.log("something isn't right");
                    });
                    document.cookie = "email=" + $scope.email;
                    $('#signUpModal').modal('hide');
                    $('#passwordMatch').css('visibility', 'hidden')
                    $('#accountExists').css('visibility', 'hidden');
                    $scope.fName = "";
                    $scope.lName = "";
                    $scope.email = "";
                    $scope.pass1 = "";
                    $scope.pass2 = "";
                    $window.location.href = 'https://whatnext.site/test';
                } else {
                    console.log("account exists");
                    $('#accountExists').css('visibility', 'visible');
                }
            }).catch((e) => console.log(e));
        } else {
            $('#passwordMatch').css('visibility', 'visible')
            $('#accountExists').css('visibility', 'hidden');
        }
    }

    $scope.login = function() {
        document.cookie = "email=" + $scope.loginEmail;

        $http.post("https://whatnext.site/api/get_user", {
            email: $scope.loginEmail
        }).then(function(response) {
            if (response.data.count != 1) {
                $("#invalidLogin").css('visibility', 'visible');
            } else {
                $http.post("https://whatnext.site/api/check_login", {
                    email: $scope.loginEmail,
                    password: $scope.password
                }).then(function(status) {
                    console.log(status.data);
                    console.log(status.data.authenticated);
                    if (status.data.authenticated) {
                        $("#invalidLogin").css('visibility', 'hidden');
                        $window.location.href = 'https://whatnext.site/test';
                    } else {
                        $("#invalidLogin").css('visibility', 'visible');
                    }
                });
            }
        });



    }

    // function createToken(user) {
    //     var payload = {
    //         sub: user._id,
    //         iat: moment().unix,
    //         exp: moment().add(1, 'days').unix()
    //     };
    // }
    // }
    // }
});