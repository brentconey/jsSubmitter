$(function () {
        $(".ajax-submit").on("click", function (e) {
            e.preventDefault();
            var $form = $(this).parent("form");
            var isEditForm = $form.hasClass("edit-form");
            var dataToSend = GetDataFromForm('#' + $form.attr("id"));
            if (dataToSend.errorCount == 0) {
                dataHelper.postData($form.attr("action"), dataToSend, function (data) {
                    if (isEditForm) {
                        AjaxSuccess(data, $form.data("success"), false);
                    } else {
                        AjaxSuccess(data, $form.data("success"), true);
                    }
                });
            }
        });
    });

function GetDataFromForm(formSelector) {
    var dataToSend = {};
    dataToSend.errorCount = 0;
    $.each($(formSelector + ' :input:not([type=submit])'), function (index, input) {
        var $input = $(input);
        if ($input.hasClass("required") && !$input.val()) {
            dataToSend.errorCount = dataToSend.errorCount + 1;
            if ($input.parent(".form-group").length > 0) {
                $input.parent(".form-group").addClass("has-error");
            } else {
                $input.addClass("has-error");
            }
        }
        if ($input.attr("name")) {
            dataToSend[$input.attr("name")] = $input.val();
        } else {
            dataToSend[$input.attr("id")] = $input.val();
        }
    });
    if (dataToSend.errorCount > 0) {
        toastr.error("Please fill out fields in red");
    }
    return dataToSend;
}

function AjaxSuccess(data, successMessage, clearInputs) {
    if (clearInputs) {
        $("input, textarea").each(function (index) {
            $(this).val('');
            $(this).parent(".form-group").removeClass("has-error");
        });
    }
    toastr.success(successMessage);
}

