function test_overlay(sOverlaidElementId, sTogglerElementId) {
	var overlay = $(sOverlaidElementId).QkOverlay();
	$(sTogglerElementId).on('click', function (e) {
		if(overlay.is_shown()) {
			overlay.hide_overlay();
		}
		else {
			overlay.show_overlay('Please wait while background task finishes');
		}
	})
}
