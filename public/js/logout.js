$(document).ready(function() {

	$(".btn-logout").on("click", function (event) {
		event.preventDefault();
		window.location.href = "/logout";
	});
	
});