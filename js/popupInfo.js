///PopUPInfo
	var $j = jQuery.noConflict();
	$j(document).ready(function() {
		$j('[data-toggle="popover"]').popover({
			html: true,
			content: function(){return '<img src="images/qrcode.JPG" />';}
		});
		getGitHubState();
	});

	$j(document).ready(function() {
		$j('[data-toggle="qqpopover"]').popover({
			html: true,
			content: function(){return '<img src="images/qqqrcode.JPG" />';}
		});
	});