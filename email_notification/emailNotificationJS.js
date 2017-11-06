function EmailController($scope) {
	$scope.isPopupVisible = false;
	$scope.isComposePopupVisible = false;
	$scope.composeEmail = {};

	$scope.showPopup = function () {
		$scope.isPopupVisible = true;
		$scope.selectedEmail = email;
	};

	$scope.closePopup = function () {
		$scope.isPopupVisible = false;
	}

	$scope.showComposePopup = function () {
		$scope.isComposePopupVisible = true;
	};

	$scope.closeComposePopup = function () {
		$scope.isComposePopupVisible = false;
	}

	$scope.sendEmail = function () {
		alert($scope.composeEmail.to
			+ " " + $scope.composeEmail.subject
			+ " " + $scope.composeEmail.body);
	};

	$scope.emails = [
		{
			from: 'John',
			subject: 'I love angular',
			date: 'Jan 1',
			body: 'hello world!'
		},
		{
			from: 'Jack',
			subject: 'Angular and I are just friends',
			date: 'Feb 15',
			body: 'just kidding'
		},
		{
			from: 'Ember',
			subject: 'I hate you Angular!',
			date: 'Dec 8',
			body: 'wassup dude'
		}
	];
}