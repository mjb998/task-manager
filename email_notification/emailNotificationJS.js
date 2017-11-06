function EmailController($scope) {
	$scope.isPopupVisible = false;
	$scope.isComposePopupVisible = false;
	$scope.composeEmail = {};
	$scope.activeTab = "inbox";

	$scope.showPopup = function (email) {
		$scope.isPopupVisible = true;
		$scope.selectedEmail = email;
	};

	$scope.closePopup = function () {
		$scope.isPopupVisible = false;
	}

	$scope.showComposePopup = function () {
		$scope.isComposePopupVisible = true;
		$scope.composeEmail = {};
	};

	$scope.closeComposePopup = function () {
		$scope.isComposePopupVisible = false;
	}

	$scope.sendEmail = function () {
		$scope.isComposePopupVisible = false;
		/*alert($scope.composeEmail.to
			+ " " + $scope.composeEmail.subject
			+ " " + $scope.composeEmail.body);*/

			$scope.sentEmails.push($scope.composeEmail);
			$scope.composeEmail.date = new Date();
			$scope.composeEmail.from = "Me";
	};

	$scope.emails = [
		{
			from: 'John',
			to: "Me",
			subject: 'I love angular',
			date: 'Jan 1',
			body: 'hello world!'
		},
		{
			from: 'Jack',
			to: "Me",
			subject: 'Angular and I are just friends',
			date: 'Feb 15',
			body: 'just kidding'
		},
		{
			from: 'Ember',
			to: "Me",
			subject: 'I hate you Angular!',
			date: 'Dec 8',
			body: 'wassup dude'
		}
	];

	$scope.sentEmails = [];
}