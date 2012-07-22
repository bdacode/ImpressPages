"use strict";




$(function() {
    $('#content').delegate('.actProceed', 'click', proceed);
    $('#content').delegate('.actResetLock', 'click', resetLock);
    
    getStatus();
    
    
    if (document.images) {
        var preload_image = new Image(); 
        preload_image.src="public/cms_button_hover.gif"; 
    }    
});



var getStatus = function() {
    loading();
    $.ajax({
        type: 'POST',
        url: '?controller=Update&action=getStatus',
        success: successResponse
    });
};


var proceed = function(event) {
    loading();
    $.ajax({
        type: 'POST',
        url: '?controller=Update&action=proceed',
        success: successResponse,
        error: errorResponse
    });
}

var resetLock = function(event) {
    loading();
    $.ajax({
        type: 'POST',
        url: '?controller=Update&action=resetLock',
        success: successResponse,
        error: errorResponse
    });
}



var successResponse = function(response) {
    if (response && response.html) {
        $('#content').html(response.html);
    }
    
    if (response && response.action) {
        switch(response.action) {
            case 'reload':
                window.location = window.location;
            break;
        }
    }
    
};

var errorResponse = function(response) {
    console.log('error');
    document.location = document.location;
};


var loading = function() {
    $('#content').html('');
    $('#content').append($('.noDisplay .loading').clone());
}
