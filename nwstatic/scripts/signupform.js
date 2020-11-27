function signUpFormAjaxSubmit(form) {
	var url = jQuery(form).attr('action');
	var data = jQuery(form).serialize() + "&validation=true";
	jQuery.ajax(url,
		{
			type:"POST",
			data: data,
			dataType: 'json',
			success: function(data){
				var success = (data['success'] && data['success'] == true);
				if (success) {
					form.submit();
				} else {
					displaySignUpFormValidation(form,data);
				}
			}
		}
	);
	return false;
}

function displaySignUpFormValidation(form,data) {
	$(".nw-form-incomplete").removeClass("nw-form-incomplete");
	var validationHtml = "";
	var incompleteFields = data['incompleteFields'];
	var firstMessage = true;
	if (incompleteFields != null) {
		for (var i=0; i<incompleteFields.length; i++) {
			var incompleteField = incompleteFields[i];
			if (!firstMessage) {
				validationHtml += "<br/>";
			} else {
				firstMessage = false;
			}
			validationHtml += incompleteField['validationMessage'];
			jQuery(form).find("[name='nw-form-"+jqReplaceSpaceInFieldName(incompleteField)+"']").addClass("nw-form-incomplete");
		}
	}
	var invalidFields = data['invalidFields'];
	if (invalidFields != null) {
		for (var i=0; i<invalidFields.length; i++) {
			var invalidField = invalidFields[i];
			if (!firstMessage) {
				validationHtml += "<br/>";
			} else {
				firstMessage = false;
			}
			validationHtml += invalidField['validationMessage'];
			jQuery(form).find("[name='nw-form-"+jqReplaceSpaceInFieldName(invalidField)+"']").addClass("nw-form-incomplete");
		}
	}
	jQuery("#"+form.id+"-validation").html(validationHtml).show();
}

function jqReplaceSpaceInFieldName(field) {
    return field['fieldName'].replace(/\s+/g,"-");
}