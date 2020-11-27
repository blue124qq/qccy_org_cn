//http://stackoverflow.com/questions/9229005/how-to-handle-jquery-ajax-post-error-when-navigating-away-from-a-page
function isErrorDueToNavigation(jqXHR) {
	return jqXHR.status == 0;
}

/* Article votes */

function contentItemVoteChangeImages(contentItemDataId,score) {
	for (var i=1;i<=5;i++) {
		var img = jQuery("#nw_articleVoteImage_"+contentItemDataId+"_"+i);
		if (img == null || img.attr("src") == null) {
			return;
		}
		if (i<=score) {
			img.attr("src",img.attr("src").replace("rate-off.gif","rate-on.gif"));
		} else {
			img.attr("src",img.attr("src").replace("rate-on.gif","rate-off.gif"));
		}
	}
}

function contentItemVoteHover(contentItemDataId,score) {
	contentItemVoteChangeImages(contentItemDataId,score);
}

function contentItemVoteOut(contentItemDataId) {
	var score = jQuery("#nw_articleAvgScore_"+contentItemDataId).val();
	contentItemVoteChangeImages(contentItemDataId,score);			
}

function detectVotingFromEmail() {
	var anchor = location.hash;
	if (!!anchor && /#nw-vote-\d+\?\d/.test(anchor)) {
		var contentItemDataId = anchor.substring(9,anchor.indexOf("?"));
		var score = anchor.substring(anchor.indexOf("?")+1);
		var voteLinkId = "#nw_articleVoteLink_"+contentItemDataId+"_"+score;
		jQuery.scrollTo(voteLinkId);
		jQuery(voteLinkId).click();
		jQuery("#nw-vote-"+contentItemDataId).effect("highlight", { }, 3000);
	}
}

function contentItemVoteAction(contentItemDataId,score) {
	var voteUrl = jQuery("#nw_articleVoteUrl_"+contentItemDataId).val();
	if (voteUrl != '#') {
		var url = voteUrl+"&r="+score+"&json=true";
		jQuery.ajax(url,
			{
				dataType: 'json',
				success: function(data){
	    			if (data['error'] != null) {
	    				alert(data['error']);
	    			} else {
	    				jQuery("#nw_articleNumberOfVotes_"+contentItemDataId).text("("+data['numberOfVotes']+")");
	    				jQuery("#nw_articleAvgScore_"+contentItemDataId).val(data['contentItemAvgScore']);
	    				contentItemVoteOut(contentItemDataId);
	    			}
		  		}
			}
		);
	}
}

function bindContentItemVotes() {
	// Bind stars images
	var articleVoteLinks = jQuery('a[id^="nw_articleVoteLink_"]');
	articleVoteLinks.each(function(index,articleVoteLink) {
		var match = /nw_articleVoteLink_(\-?[0-9]+)_([1-5])/.exec(articleVoteLink.id);
		var articleId = match[1];
		var score = match[2];
		jQuery(articleVoteLink).mouseover(function() { contentItemVoteHover(articleId,score); });
		if (parseInt(articleId) > 0) {
			jQuery(articleVoteLink).click(function() { contentItemVoteAction(articleId,score); return false; });
		}
	});
	
	// Bind wrapper
	var articleVoteWrappers = jQuery('span[id^="nw_articleVoteWrapper_"]');
	articleVoteWrappers.each(function(index,articleVoteWrapper) {
		var match = /nw_articleVoteWrapper_(\-?[0-9]+)/.exec(articleVoteWrapper.id);
		var articleId = match[1];
		jQuery(articleVoteWrapper).mouseout(function() { contentItemVoteOut(articleId); });
	});
}

/* Printer Friendly */
function outerHTML(node) {
    return node.outerHTML || new XMLSerializer().serializeToString(node);
}

function detectPrinterFriendly() {
        if (jQuery("#nw_printer_friendly").val() == "true") {
            jQuery(".nw-article-options").html("");
            var articleDisplayElement = jQuery(".ArticleDisplay");
            jQuery("#wrapper").html(outerHTML(articleDisplayElement[0]));
            jQuery("#wrapper").css("display", "block");
            jQuery("*").css("background-color", "#ffffff");
            document.bgColor = "#ffffff";
        }
}


/* Sharing */

function bindArticleSharing() {
	var articleSharingLinks = jQuery('a[id^="nw_articleSharing_share_"]');
	articleSharingLinks.each(function(index,articleSharingLink) { 
		var match = /nw_articleSharing_share_(\-?[0-9]+)/.exec(articleSharingLink.id);
		var articleId = match[1];
		jQuery(articleSharingLink).click(function() { toggleSharingLinks(articleId); return false; });
	});
	var articleSharingSiteLinks = jQuery('a[id^="nw_articleSharing_site_"]');
	articleSharingSiteLinks.each(function(index,articleSharingSiteLink) { 
		var match = /nw_articleSharing_site_(\-?[0-9]+).*/.exec(articleSharingSiteLink.id);
		var articleId = match[1];
		jQuery(articleSharingSiteLink).click(function() { toggleSharingLinks(articleId); });
	});
	var articleSharingCloseLinks = jQuery('a[id^="nw_articleSharing_close_"]');
	articleSharingCloseLinks.each(function(index,articleSharingCloseLink) { 
		var match = /nw_articleSharing_close_(\-?[0-9]+)/.exec(articleSharingCloseLink.id);
		var articleId = match[1];
		jQuery(articleSharingCloseLink).click(function() { toggleSharingLinks(articleId); return false; });
	});	
}

function toggleSharingLinks(articleId) {
	var linkList = jQuery('#nw_articleSharing_list_'+articleId);
	if (linkList.length) {
		var articleSharingLink = jQuery('#nw_articleSharing_share_'+articleId);
		var position = jQuery(articleSharingLink).offset();
		var height = jQuery(articleSharingLink).height();
		linkList.css("left", position.left);
		linkList.css("top", position.top+height);
		jQuery('#nw_articleSharing_list_'+articleId).fadeToggle(250);
	}
}

function bindSocialSharing() {
	var socialTriggers = jQuery('a[id^="nw-social-"]');
	socialTriggers.each(function(index,socialTrigger) { 
		jQuery(socialTrigger).fancyZoom();
	});
}

var socialRegExp = new RegExp("^#nw-social-(facebookLike|googlePlus|tweet|linkedIn)-(0|1|2)$");
var articleShareRegExp = new RegExp("^#nw-share-(\\d+)$");
function detectSharingFromEmail() {
    var anchor = location.hash;
    if (!!anchor) {
        if (socialRegExp.test(anchor)) {
            // Social widgets
            var match = socialRegExp.exec(anchor);
            var site = match[1];
            var param = match[2];
            setTimeout("openSharing('"+site+"',"+param+")", 200);
        } else if (articleShareRegExp.test(anchor)) {
            // Article Sharing
            var match = articleShareRegExp.exec(anchor);
            var articleId = match[1];
            setTimeout("toggleSharingLinks("+articleId+")", 1000);
        }
    }
}

//iframe used instead of Ajax. NTSA-23357
function openSharing(site,param) {
	var socialPageUrl = jQuery("#nw-social-pageurl").val();
	var linkUrl = "sharingFromEmail.html?link="+socialPageUrl+"&param="+param+"&site="+site;
	var fancyBoxOptions = {
		'minWidth': 500,
		'minHeight': (site == 'facebookLike')?150:100,
		'maxHeight' : 150,
		type:'iframe',
		padding:0,
		margin:0,
		autoResize: true,
		autoCenter: true
	};
	jQuery("<a></a>").hide().attr("href",linkUrl).fancybox(fancyBoxOptions).click();
}

/* Article Gallery */

function showImage(index) {
    jQuery('#nw_articleGallery_indexDiv'+index).show();
    jQuery('div[id^="nw_articleGallery_indexDiv"]').not('#nw_articleGallery_indexDiv'+index).hide();
	try {
		parent.dyniframesize('previewPageHtml');
	} catch(ex) { }
}

function bindArticleGallery() {
	var articleGalleryNavLinks = jQuery('a[id^="nw_articleGallery_"]');
	articleGalleryNavLinks.each(function(index,articleGalleryNavLink) { 
		var match = /nw_articleGallery_[a-z]+_([0-9]+)/.exec(articleGalleryNavLink.id);
		var imageIndex = match[1];
		jQuery(articleGalleryNavLink).click(function() { showImage(imageIndex); return false; });
	});	
}

/* Article comments */
(function($, window) {
	
	window.MICROSITE_COMMENTS = {
		bindCommentsForm : _bindCommentsForm,
		bindCommentsScrolling : _bindArticleCommentsInfiniteScrolling,
		bindArticleCommentsSort: function () {
			$("#nw-comments-sort").each(function(index,sortSelect) {
				$(sortSelect).off().on("change", function() { _refreshComments(); return false; });
			});
		},
		showCommentsInCurrentBatch : function(currentBatch) {
			_showCommentsInCurrentBatch(currentBatch);
		},
		getPageTitle: function() {
			return document.title;
		},
		getCanonicalUrlFromHiddenField: function() {
			var pu = document.getElementById("nana-dc-pu");
			return pu !== null ? pu.value : "";
		},
		getCanonicalUrlFromHeadLink: function() {
			var link = document.querySelector("head link[rel=canonical]");
			return link !== null ? link.href : "";
		},
		getCanonicalUrl: function() {
			var url = this.getCanonicalUrlFromHiddenField();
			return url.length ? url : this.getCanonicalUrlFromHeadLink();
		},
		postComment: function(button) {
			var $submitButton = $(button);
			var $form = $submitButton.parents('form:first');
			$submitButton.prop('disabled',true);
			var url = "comments/postComment.html";
			_cleanupBeforePostingComment($form);
			var params = "title=" + this.getPageTitle() + "&pu=" + this.getCanonicalUrl() + "&" + $form.serialize();
			$.ajax({
				url: url,
				type:"POST",
				data: params,
				dataType: 'json'
			}).done(function(data) {
                if (data.success) {
    				_displayNewComment($form, data);
                	_resetOrRemoveForm($form);
    				_showThankYouForComment($form);
    				if (data.approved) {
    					_incrementCommentsNumber($form);
                	}
    			} else {    				  				
    				_showCommentErrors(data, $form);
    			}
                $submitButton.prop('disabled',false);
			});
		},
		previewComment: function(button) {
			var $previewButton = $(button);
			var $form = $previewButton.parents('form:first');
			var url = "comments/previewComment.html";
			var params = $form.serialize();
			_cleanupBeforePostingComment($form);
			$.ajax({
				url: url,
				type:"POST",
				data: params,
				dataType: 'json'
			}).done(function(data) {
				$form.children("div[name=nw_comments_preview]").hide();
    			if (data.success) {
    				_displayPreviewComment($form);
    			} else {
    				_showCommentErrors(data, $form);
    			}
			});
		},
		displayReplyToCommentForm : function(link) {
			var replyToLink = $(link);
			var articleCommentLink = replyToLink.data("url");
			var articleCommentId = replyToLink.data("articlecommentid");
    		var replyToFormDiv = $('#commentForm_' + articleCommentId);
    		if (replyToFormDiv.has("form").is("*")) {
    			replyToFormDiv.empty();
    			return;
    		}
			var url = articleCommentLink + "&displayComments=false";			
			$.ajax({
				url: url
			}).done(function(data) {
				replyToFormDiv.html(data);
				replyToFormDiv.fadeIn();
				_setFocusOnCommentFormElements(replyToFormDiv);
				_bindReplyToForm();
			});
		},		
		closeCommentForm : function(button) {
			var closeFormButton = $(button);
			var form = closeFormButton.parents('form:first');		
			form.parent().empty();
		},		
		displayComments: function(elementId, articleCommentLink, showForm) {
			var contentItemDataId = elementId.split("-")[0];
			var $commentsDiv = $('#commentsList_' + contentItemDataId);
			articleCommentLink += "&displayComments=true";
			if (!$commentsDiv.is("*")) {
				_showCommentsForm(elementId, articleCommentLink, showForm);
			} else {
				var sort = $('select[id="nw-comments-sort"]').val();
				var url = articleCommentLink;
				if (!!sort) {
					url += "&sort=" + sort;
				}	
				
				$.ajax({
					url: url
				}).done(function(data) {
					_showAndBindComments($commentsDiv, data, showForm);
				});
			}
		}
	};
	
	function _showCommentsForm(elementId, originalUrl, showForm) {
		var url = originalUrl.replace("comments.html", "comments/showCommentsForm.html");
		$.ajax({
			url: url
		}).done(function(data) {
			var contentItemDataId = elementId.split("-")[0];
			var contentObjectReferenceId = elementId.split("-")[1];
			var $commentsDiv = $("#commentsDiv" + contentItemDataId + "-" + contentObjectReferenceId);
			_showAndBindComments($commentsDiv, data, showForm);
		});
	}
	
	function _showAndBindComments($commentsDiv, data, showForm) {
		$commentsDiv.html(data);
		_bindCommentsForm();
		if (showForm) {
			window.location.href = '#commentFormAnchor_main';
			_setFocusOnCommentFormElements($commentsDiv);
		}
	}
	
	function _bindCommentsForm() {
		jQuery("#nw_comments_form").each(function(index,commentsForm) {
			jQuery(commentsForm).submit(function() { return false; });
		});
		jQuery('a[id^="commentsNumber"]').each(function(index,commentsNumberLink) { 
			var url = jQuery(commentsNumberLink).attr("href");
			if (/\/comments\.html\?/.test(url)) {
				if (url.indexOf("#") == 0) {
					jQuery(commentsNumberLink).unbind("click").click(function() { return false; });
				} else {
					var match = /commentsNumber([0-9]+)-([0-9]+)/.exec(commentsNumberLink.id);
					var contentItemDataId = match[1];
					var contentObjectReferenceId = match[2];
					jQuery(commentsNumberLink).click(function() { MICROSITE_COMMENTS.displayComments(contentItemDataId+'-'+contentObjectReferenceId, url); return false; });
				}
			}
		});
		
		_bindReplyToForm();
		_bindReplyToButtons();
		MICROSITE_COMMENTS.bindArticleCommentsSort();
		MICROSITE_COMMENTS.bindCommentsScrolling();
	}
	
	function _bindReplyToForm() {
		$("input[name=commentButton]").each(function(index,commentButton) {
			jQuery(commentButton).off().on("click", function(event) { MICROSITE_COMMENTS.postComment(event.target); });
		});
		$(".nw-comments-close").each(function(index,closeButton) {
			$(closeButton).off().on("click", function(event) { MICROSITE_COMMENTS.closeCommentForm(event.target); });
		});
		$("input[name=previewButton]").each(function(index,previewButton) {
			$(previewButton).off().on("click", function(event) { MICROSITE_COMMENTS.previewComment(event.target); });
		});
	}
	
	function _bindReplyToButtons() {
		$(".nw-comments-reply-button").each(function(index,commentButton) {
			$(commentButton).off().on("click", function(event) { MICROSITE_COMMENTS.displayReplyToCommentForm(event.target); });
		});	
	}
	
	function _incrementCommentsNumber(form) {
		var articleId = form.find("input[name=a]").val();
		var numberSpan = $("#articleCommentsNumber" + articleId);
		if (numberSpan.is("*")) {
			var currentNumber = parseInt(numberSpan.text());
			currentNumber++;
			numberSpan.text(currentNumber);
		}
	}
	
	function _cleanupBeforePostingComment(form) {
		form.siblings('.nw-article-comment-validation-error').hide();
		form.siblings('.nw-article-comment-validation-thanks').hide();
		form.siblings('.nw-comments-commentsList').hide();
		form.siblings('.nw-comments-post').hide();
		form.children("input[name='name']").removeClass('nw-error');
		form.children("input[name='emailaddress']").removeClass('nw-error');
		form.children("input[name='comment']").removeClass('nw-error');
	}
	
	function _refreshComments() {
		var contentItemDataId = $("#nw_comments_contentitemdata_id").val();
		var contentObjectReferenceId = $("#nw_comments_co").val();
		var mailingUniqueIdentifier = $("#nw_comments_muid").val();
		var subscriberUniqueIdentifier = $("#nw_comments_suid").val();
		var commentsHeading = $("#nw_comments_heading").val();
		MICROSITE_COMMENTS.displayComments(contentItemDataId+'-'+contentObjectReferenceId,'comments.html?a='+contentItemDataId+'&m='+mailingUniqueIdentifier+'&t='+contentObjectReferenceId+'&s='+subscriberUniqueIdentifier,commentsHeading);
	}
	
	function _setFocusOnCommentFormElements(parent) {
		parent.children("input[name='name']").focus();
		parent.children("input[name='emailaddress']").focus();
		parent.children("input[name='comment']").focus();
	}
	
	function _displayPreviewComment(form) {
		var url = "comments/displayNewComment.html?preview=true";	
		$.ajax({
			url: url,
			type:"POST",
			data: form.serialize(),
			dataType: 'html'
		}).done(function(data) {
			form.siblings("div[name=nw_comments_preview]").html(data).show();
		});
	}
	
	function _displayNewComment(form, data) {
    	var articleId = form.find("input[name=a]").val();
    	var parentId = form.find("input[name=parentId]").val();
		var url = "comments/displayNewComment.html";
		if (data.commentId) {
			url += "?commentId=" + data.commentId;
		}
		$.ajax({
			url: url,
			type:"POST",
			data: form.serialize(),
			dataType: 'html'
		}).done(function(data) {
	    	var $newCommentDiv = $("<div>");
	    	$newCommentDiv.html(data);
			var newCommentParentDiv = null;
	    	if (parentId) {
	    		newCommentParentDiv = $("#commentChildren_" + parentId);
	    		$newCommentDiv.addClass("nw-comments-children");
	    	} else {
	    		newCommentParentDiv = $("#commentsList_" + articleId);
	    	}
	    	newCommentParentDiv.prepend($newCommentDiv);
		});
	}
	
	function _resetOrRemoveForm(form) {
		if (form.find("input[name=parentId]").is("*")) {
	    	form.remove(); 
		} else {
			form.find("textarea[name='comment']").val('');
		}
	}

	function _showThankYouForComment(form) {
		var formMessageThanks = form.children(".nw_comments_form_message_thanks");
		formMessageThanks.show(); 
	}
	
	function _showCommentErrors(data, form) {
		var formMessageError = form.children(".nw-comments-post-form").children(".nw-article-comment-validation-error");
		if (!formMessageError.is("*")) {
			formMessageError = form.siblings(".nw-article-comment-validation-error");
		}
		formMessageError.empty();
		var $list = $('<ul>');
		formMessageError.append($list);
		$.each(data['error'], function(index, message) {  
			$list.append($('<li>').text(message)); 
			formMessageError.append($list);
			
			if (message.indexOf('comment') !== -1) {
				$('#comment').addClass('nw-error');
			}
			if (message.indexOf('Email') !== -1) {
				$('#emailaddress').addClass('nw-error');
			}
			if (message.indexOf('Name') !== -1) {
				$('#name').addClass('nw-error');
			}
		});
		formMessageError.show();
	}
	
	function _bindArticleCommentsInfiniteScrolling() {
		$('button[class^="nw-comments-infinite-scroll"]').each(function(index, showMoreCommentsLink) {
			$(showMoreCommentsLink).off().on("click", function() {
				var match = /nw_comments_([0-9a-zA-Z]+)/.exec(showMoreCommentsLink.id);
				var currentBatchStartIndex = match[1];
				$(this).remove();
				_showCommentsInCurrentBatch(currentBatchStartIndex);
			});
		});
	}
	
	function _showCommentsInCurrentBatch(batchStartIndex) {
		_checkForNewCommentsAndShowNextBatch(batchStartIndex);
	}
	
	function _doShowCommentsInCurrentBatch(batchStartIndex, areNewComments) {
		var contentItemDataId = $("#nw_comments_contentitemdata_id").val();
		var contentObjectReferenceId = $("#nw_comments_co").val();
		var url = "comments/comments.html";
		var locale = $('#language_tag').val();
		var params = {
			a : contentItemDataId,
			b : batchStartIndex,
			t : contentObjectReferenceId,
			areNewComments: areNewComments,
            lang: locale
		};
		
		var subscriberUniqueIdentifier = $("#nw_comments_suid").val();
		if (subscriberUniqueIdentifier != '') {
			params.s = subscriberUniqueIdentifier;
		}
		
		var mailingUniqueIdentifier = $("#nw_comments_muid").val();
		if (mailingUniqueIdentifier != '') {
			params.m = mailingUniqueIdentifier;
		}
		
		$.ajax({
			url: url,
			data: params,
			type: "GET",
			dataType: 'html'
		}).done(function(data) {
			$('#nw-comments-infinite-scroll-button').hide();
			if (areNewComments) {
				$('#commentsList_' + contentItemDataId).html(data);
			} else {
				$('#commentsList_' + contentItemDataId).append(data);
			}			
			_bindArticleCommentsInfiniteScrolling();
			_bindReplyToButtons();
		});
	}
	
	function _checkForNewCommentsAndShowNextBatch(batchStartIndex) {
		var totalNumberOfComments = $("#nw_comments_total").val() || 0;
		var contentItemDataId = $("#nw_comments_contentitemdata_id").val();
		var url = "comments/getTotalNumberOfComments.html";
		var params = {
			a : contentItemDataId
		};			
		$.ajax({
			url: url,
			data: params,
			type: "GET",
			dataType: 'json'
		}).done(function(data) {
			var areNewComments = data.totalNumberOfComments !== totalNumberOfComments;
			_doShowCommentsInCurrentBatch(batchStartIndex, areNewComments);
		});
	}
})(window.jQuery, window);


function likeArticleComment(commentId, subscriberUniqueId) {
	var url = "comments/likeComment.html";
	var params = {
		c: commentId,
		s: subscriberUniqueId
	};
	jQuery.ajax(url,
		{
			type:"POST",
			data: params,
			dataType: 'json',
			success: function(data){
				jQuery('a[id="likeComment_' + commentId + '"]').hide();
				jQuery('a[id="unlikeComment_' + commentId + '"]').show();
				var span = jQuery('span[id="nw_commentNumberOfLikes_'+commentId+'"]');
				span.html("(" + data['numberOfLikes'] + ")");
	  		}
		}
	);
}

function unlikeArticleComment(commentId, subscriberUniqueId) {
	var url = "comments/unlikeComment.html";
	var params = {
		c: commentId,
		s: subscriberUniqueId
	};
	jQuery.ajax(url,
		{
			type:"POST",
			data: params,
			dataType: 'json',
			success: function(data){
				jQuery('a[id="likeComment_' + commentId + '"]').show();
				jQuery('a[id="unlikeComment_' + commentId + '"]').hide();
				var span = jQuery('span[id="nw_commentNumberOfLikes_'+commentId+'"]');
				span.html("(" + data['numberOfLikes'] + ")");
	  		}
		}
	);
}

function detectArticleComments() {
	var articleCommentsOpcs = jQuery('input[id^="nw_articleComments_suid_"]');
	articleCommentsOpcs.each(function(i,articleCommentsOpc) {
		var match = /nw_articleComments_suid_([0-9]+\-[0-9]+)/.exec(articleCommentsOpc.id);
		var elementId = match[1];
		var viewCommentsLink = jQuery('#nw_articleCommentsUrl_'+elementId).val();
		var suid = jQuery('#nw_articleComments_suid_'+elementId).val();
		MICROSITE_COMMENTS.displayComments(elementId,viewCommentsLink+'&s='+suid);
	});
}

/* Surveys */
function bindSurveysLegacy() {
	// Paging
	var surveyNavs = jQuery('input[id^="nw_survey_nav_"]');
	surveyNavs.each(function(i,surveyNav) {
		var match = /nw_survey_nav_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)/.exec(surveyNav.id);
		var surveyId = match[1];
		var contentObjectId = match[2];
		var hidePageId = match[3];
		var showPageId = match[4];
		jQuery(surveyNav).click(function() { showSurveyPage('surveyQuestionsPage'+surveyId+'_'+contentObjectId+'_'+hidePageId,'surveyQuestionsPage'+surveyId+'_'+contentObjectId+'_'+showPageId); return false; });
	});
	var surveySubmitButtons = jQuery('input[id^="nw_survey_submit_"]');
	surveySubmitButtons.each(function(i,surveySubmitButton) {
		var match = /nw_survey_submit_([0-9]+)_([0-9a-zA-Z]+)/.exec(surveySubmitButton.id);
		var surveyId = match[1];
		var contentObjectId = match[2];
		jQuery(surveySubmitButton).click(function() { postSurveyLegacy(surveyId,contentObjectId); return false; });
	});
	var surveyResults = jQuery('a[id^="nw_survey_results_"]');
	surveyResults.each(function(i,surveyResult) {
		var match = /nw_survey_results_([0-9]+)_([0-9]+)_([0-9a-zA-Z]+)_([0-9a-zA-Z]+)/.exec(surveyResult.id);
		if (match == null) {
			return null;
		}
		var surveyId = match[1];
		var contentObjectId = match[2];	
		var srp = match[3];
		var mailingUniqueIdentifier = match[4];	
		var url = "survey.html?srp=" + srp + "&mailingRecord=" + mailingUniqueIdentifier + "&sv=" + surveyId + "&tC=" + contentObjectId + "&results=true";
		var resultsContainer = "surveyResults" + surveyId + "_" + contentObjectId+srp;
		jQuery(surveyResult).click(function() { viewSurveyResults(resultsContainer, url); return false; });
	});
}

function bindSurveys() {
	// Click in "Other" input
	var otherQuestions = jQuery('input[name^="questionOther"]');
	otherQuestions.each(function(i,otherQuestion) {
		var match = /questionOther([0-9]+)/.exec(otherQuestion.id);
		var questionId = match[1];
		jQuery(otherQuestion).click(function() { jQuery('input[name="question'+questionId+'"][id*="other"]').prop("checked",true);});
	});
	
	var surveyComponents = jQuery('input[id^="nwSurveyComponentIdentification"]');
	if (surveyComponents.length == 0) {
		bindSurveysLegacy();
		return;
	}
	jQuery.each(jQuery(surveyComponents), function( index, surveyComponent) {
		var surveyElementIdSuffix = jQuery(surveyComponent).val();
		bindSurveyPagingButtons(surveyElementIdSuffix);
		bindSurveySubmitButtons(surveyElementIdSuffix);
		bindSurveysResults(surveyElementIdSuffix);		
	});
}

function bindSurveyPagingButtons(surveyElementIdSuffix) {
	var surveyNavs = jQuery('input[id^="nw_survey_nav-' + surveyElementIdSuffix + '"]');
	surveyNavs.each(function(i,surveyNav) {
		var parts = surveyNav.id.split("-");
		var currentPageIndex = parts[2];
		var showPageIndex = parts[3];
		jQuery(surveyNav).click(function() {
			var currentPageId = 'surveyQuestionsPage-' + surveyElementIdSuffix + '-' + currentPageIndex;
			var showPageId = 'surveyQuestionsPage-' + surveyElementIdSuffix + '-' + showPageIndex;
			var showPageValidationId = 'surveyQuestionsPageValidation-' + surveyElementIdSuffix;
			var validationDiv = jQuery("#" + showPageValidationId);
			var goToPreviousPage = parseInt(showPageIndex) < parseInt(currentPageIndex);
			if (goToPreviousPage || isLegacySurveyDisplay(validationDiv) || validateSurveyPage(currentPageId)) {
				validationDiv.hide();
				showSurveyPage(currentPageId, showPageId);
			} else {
				validationDiv.show();
			}	
			return false;
		});
	});
}

function isLegacySurveyDisplay(validationDiv) {
	return !validationDiv.is("*");
}

function validateSurveyPage(surveyPageId) {
	var isValid = true;
	jQuery("#" + surveyPageId + " div.nw-survey-question").each(function(i, surveyQuestionDivId) {
		var surveyQuestionDiv = jQuery(surveyQuestionDivId);
		var isMandatory = surveyQuestionDiv.find("span.nw-survey-question-mandatory").length > 0;
		if (isMandatory
				&& surveyQuestionDiv.find('input:checked').length === 0
				&& surveyQuestionDiv.find('input[type="text"], textarea').filter(function() { return $(this).val() !== ""; }).length === 0) {
			isValid = false;
		}
	});
	return isValid;
}

function bindSurveySubmitButtons(surveyElementIdSuffix) {
	var surveySubmitButtons = jQuery('input[id="nw_survey_submit-' + surveyElementIdSuffix + '"]');
	surveySubmitButtons.each(function(i, surveySubmitButton) {
		var $button = jQuery(surveySubmitButton);
		$button.click(function() {
			$button.prop('disabled', true);
			var $request = postSurvey(surveyElementIdSuffix); 
			$request.always(function() {
				$button.prop('disabled', false);
			});
			return false; 
		});
	});
}

function bindSurveysResults(surveyElementIdSuffix) {
	var surveyResults = jQuery('a[id^="nw_survey_results-' + surveyElementIdSuffix + '"]');
	surveyResults.each(function(i,surveyResult) {
		var parts = surveyResult.id.split("-");
		var mailingUniqueIdentifier = parts[2];	
		parts = surveyElementIdSuffix.split("_");
		var surveyId = parts[0];
		var contentObjectId = parts[1];
		var url = _determineSurveyResource() + "?mailingRecord=" + mailingUniqueIdentifier + "&sv=" + surveyId + "&tC=" + contentObjectId + "&results=true";
		jQuery(surveyResult).click(function() { viewSurveyResults("surveyResults-" + surveyElementIdSuffix, url); return false; });
	});
}

function _determineSurveyResource() {
    var $version = jQuery('input[name="scv"]');
    if ($version.val() === 'V3') {
        return 'survey3.html';
    }

    return 'survey2.html';
}

function postSurvey(surveyElementIdSuffix) {
	return doPostSurvey(
		"surveyForm-" + surveyElementIdSuffix, 
		"surveyValidationResults-" + surveyElementIdSuffix, 
		"surveyResults-" + surveyElementIdSuffix);
}

function postSurveyLegacy(surveyId,contentObjectId) {
	return doPostSurvey(
			"surveyForm" + surveyId + "_" + contentObjectId, 
			"surveyValidationResults" + surveyId + "_" + contentObjectId, 
			"surveyResults" + surveyId + "_" + contentObjectId);
}

function doPostSurvey(formId, validationResultsId, surveyResultsId) {
	var $form = jQuery("#" + formId);
	var $request = jQuery.ajax($form.attr("action"), {
		type:"POST",
		data: $form.serialize(),
		dataType: 'html'
	});
	$request.done(function(data){
		if (data.indexOf('nw-survey-validation-error') > 0) {
			jQuery("#" + validationResultsId).html(data).get(0).scrollIntoView();
		} else {
			jQuery("#" + surveyResultsId).html(data);
		}
	});
	return $request;
}


function viewSurveyResults(resultsContainer,url) {
    jQuery.ajax({
        url: url,
        type: 'GET',
        dataType: 'html'
    }).done(function(data) {
        jQuery('#' + resultsContainer).html(data);
    });
}

function showSurveyPage(hidePage, showPage) {
	if (hidePage != null && jQuery("#" + hidePage).is('*')) {
		jQuery("#" + hidePage).hide();
	}
	if (showPage != null && jQuery("#" + showPage).is('*')) {
		jQuery("#" + showPage).show();
		jQuery('html, body').animate({
			scrollTop: jQuery("#" + showPage).offset().top
		}, 1000);
		try {
			parent.dyniframesize('previewPageHtml');
		} catch(ex) { }					
	}
}

/* Subscribe forms */
function bindSignupForms() {
	var signupForms = jQuery('form[id^="nw-signupform-"]');
	signupForms.each(function(i,signupForm) {
		var signUpFormAction = jQuery(signupForm).attr("action");
		if (window.location.protocol == "https:" && signUpFormAction.indexOf("http://") == 0) {
			signUpFormAction = signUpFormAction.replace("http://","https://");
			jQuery(signupForm).attr("action", signUpFormAction);
		}
		jQuery(signupForm)[0].onsubmit = null;
		jQuery(signupForm).submit(function() { return signUpFormAjaxSubmit(signupForm); });
	});
}


function recordArticleClick(mailingRecordId,articleId,subscriberUniqueId) {
	var url = "log/logArticleClick.html";
	var params = {
		m: mailingRecordId,
		s: subscriberUniqueId,
		a: articleId
	};
	jQuery.ajax(url,
		{
			type:"POST",
			data: params,
			dataType: 'json',
			success: function(data){
	  		}
		}
	);
	return true;
}

/* Utils */
function bindDateInputs() {
	if (jQuery.datepicker) {
		jQuery("input.nw-form-date").datepicker({ dateFormat: 'dd/mm/yy' });
	}
}

/* Video */
function playVideo(videoId) {
	jQuery("[id='"+videoId+"-thumbnail'], span[name='"+videoId+"-thumbnail-forPlayer']").hide(); // (<79)
	jQuery("span[name='"+videoId+"-thumbnail']").hide();
	
	var videoPlayer = jQuery("#" + videoId + "-player");
	var videoFrame = videoPlayer.find("iframe");
	var videoUrl = videoFrame.attr("src");
	var embedUrl = videoUrl;
	if (window.location.protocol == "https:" && embedUrl.indexOf("http://") == 0) {
		embedUrl = embedUrl.replace("http://","https://");
	}
	videoFrame.attr("src", embedUrl + "?autoplay=1");
	videoPlayer.show();
	logVideoPlay(videoUrl, jQuery(location).attr('href'));
}

function logVideoPlay(videoUrl,pageUrl) {
	var url = "log/logVideoPlay.html";
	var params = {
		videoUrl: videoUrl,
		pageUrl: pageUrl
	};
	jQuery.ajax(url,
		{
			type:"POST",
			data: params,
			dataType: 'json',
			async: true,
			success: function(data){
	  		}
		}
	);
	return true;
}

function bindPlayVideoLinks() {
	jQuery("a[name^='playVideo']").each(function(index,playVideoLink) {
		var match = /playVideo-(.*)/.exec(playVideoLink.name);
		var videoId = match[1];
		jQuery(playVideoLink).click(function() { playVideo(videoId); return false; });
	});
}

function detectAutoPlayVideo() {
	var autoPlay = jQuery.getUrlVar('autoPlay');
	if (autoPlay && autoPlay != '') {
		var firstPlayerId = jQuery("span[id^='"+autoPlay+"'][id$='-player']").attr("id");
		var match = /(.*)-player/.exec(firstPlayerId);
		var videoId = match[1];
		playVideo(videoId);
		jQuery.scrollTo("[id='"+videoId+"-player'] iframe");
	}
}

function pollPdfStatus(pageId, mailingId) {
	var params = { 
		p: pageId,
		m: mailingId 
	};
	
    jQuery.ajax("checkPdfStatus.html", {
            type: "POST",
            data: params,
            dataType: 'json',
            success: function(data) {
                var status = data.status;
                if(status === 'IN_PROGRESS') {
                    setTimeout(function() { 
                    	pollPdfStatus(pageId, mailingId); 
                    }, 1000);
                } else if(status === 'READY') {
                	jQuery("#spinner").hide();
                	jQuery("#pleaseWait").hide();
                	jQuery("#finished").show();
                	jQuery("#location").click(function() { 
                		window.location = data.location; 
                	});
                	window.location = data.location;
                } else {
                	// TODO: This generates an extra click...
                	window.location.reload();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
    			if(!isErrorDueToNavigation(jqXHR)) {
            		alert("A problem occurred when checking if the PDF was finished");
            	}
            }
        }
    );
}

function bindPdfPolling() {
	var pageId = jQuery("#pdfPageId");
	if (pageId.length > 0) {
		var mailingId = jQuery("#pdfMailingId");
		pollPdfStatus(pageId.val(), mailingId.val());
	}
}

/* Utilities */
jQuery.extend({
	getUrlVars: function(){
		var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++) {
	    	hash = hashes[i].split('=');
	    	vars.push(hash[0]);
	    	vars[hash[0]] = hash[1];
	    }
	    return vars;
	},
	getUrlVar: function(name){
		return jQuery.getUrlVars()[name];
	},
	scrollTo: function(id) {
		if (jQuery(id).offset()) {
			jQuery('html, body').animate({scrollTop: jQuery(id).offset().top}, 200);
		}
	}
});

function bindRecordArticleClick() {
	var articleAnchorLinks = jQuery('a[id^="nw_article_link_anchor_"]');
	articleAnchorLinks.each(function(index,articleAnchorLink) { 
		var match = /nw_article_link_anchor_([0-9a-zA-Z]+)_([0-9]+)_([0-9a-zA-Z]+)/.exec(articleAnchorLink.id);
		var mailingUniqueIdentifier = match[1];
		var articleId = match[2];
		var subscriberUniqueIdentifier = match[3];
		jQuery(articleAnchorLink).click(function() { recordArticleClick(mailingUniqueIdentifier, articleId, subscriberUniqueIdentifier); return true; });
	});
}

function bindPrintAll() {
	var printAllButtons = jQuery('#nw_print_all_button');
	printAllButtons.each(function(index,printAllButton) { 
		jQuery(printAllButton).click(function() { window.print(); return false; });
	});
}

function bindSearchBox() {
	jQuery("a[id^='searchboxLink']").each(function(index,searchboxLink) {
		var match = /searchboxLink([0-9]+)/.exec(searchboxLink.id);
		var searchboxId = match[1];
		jQuery(searchboxLink).click(function() {
			jQuery("form[name='searchbox"+searchboxId+"']").submit();			
		});
	});
}

/* Opt-out Form */
function bindAdvancedOptOutForm() {
	if (jQuery('#nw_optOutForm').is("*")) {
		jQuery('#nw_optOutForm')[0].onsubmit = null;
		jQuery('#nw_optOutForm').submit(function() {
			return advancedOptOutFormAjaxSubmit();
		});
		jQuery('a[id^="nw_optOutForm_undoLink"]').each(function(i,undoLink) {
			var match = /nw_optOutForm_undoLink([0-9]+)/.exec(undoLink.id);
			var audienceId = match[1];
			jQuery(undoLink).click(function() {
				jQuery("input[name='nw_optOutForm_audiences'][value='"+audienceId+"']").prop("checked",true);
				jQuery("#nw_optOutForm_undo"+audienceId).hide();
			});
		});
	}
}

function advancedOptOutFormAjaxSubmit() {
	jQuery.ajax({
		url: "/unsubscribe/submit.html",
		data: jQuery('#nw_optOutForm').serialize(),
		type: "POST",
		dataType: "json",
		success: function(data) {
			if (data.message) {
				jQuery("#nw_optOutForm").hide();
				jQuery("#nw_optOutFormMessage").html(data.message).show();
			} else if(data.redirect) {
				location.href = data.redirect;
			}
		}
	});
	return false;
}

function _initLegacyTracking(accountId, enterpriseId, dcScriptUrl) {
	(function (w, d, t, u, v, s, p) {
		w['NewsweaverObject'] = v;
		w[v] = w[v] || function () {
			(w[v].q = w[v].q || []).push(arguments)
		}, s = d.createElement(t), p = d.getElementsByTagName(t)[0];
		s.async = 1;
		s.src = u;
		s.id = 'nw-dc-script';
		p.parentNode.insertBefore(s, p);
	})(window, document, 'script', dcScriptUrl, 'nw');

	nw('init', enterpriseId + '-' + accountId);
	nw('track');
}

function _initTrackingUsingMicrositeIntegration(accountId, enterpriseId, dcScriptUrl, micrositeIntegrationScriptUrl) {
    (function (w, d, t, u, v, vt, s, p) {
        v = 'poppulo';
        vt = 'tracking';
        w[v] = w[v] || {};
        w[v][vt] = w[v][vt] || function () {
            (w[v][vt].q = w[v][vt].q || []).push(arguments);
        }, s = d.createElement(t), p = d.getElementsByTagName(t)[0];
        s.async = 1;
        s.src = u;
        s.id = 'poppulo-tc-script';
        p.parentNode.insertBefore(s, p);
    })(window, document, 'script', dcScriptUrl);

    poppulo.tracking('init', enterpriseId + '-' + accountId);
    poppulo.tracking('require','@poppulo-tracking/integration-microsite', micrositeIntegrationScriptUrl);
    poppulo.tracking('track');
}

function _initTracking() {
    var $aid = jQuery("#nana-dc-aid");
    if ($aid.is('*')) {
        var accountId = $aid.val();
        var enterpriseId = jQuery("#nana-dc-eid").val();
        var dcScriptUrl = jQuery("#nana-dc-scriptUrl").val();
        var $integrationScriptUrl = jQuery("#nana-dc-integrationMicrositeScriptUrl");

        if ($integrationScriptUrl.is("*")) {
            _initTrackingUsingMicrositeIntegration(accountId, enterpriseId, dcScriptUrl, $integrationScriptUrl.val());
        } else {
            _initLegacyTracking(accountId, enterpriseId, dcScriptUrl);
        }
    }
}

/* Binders and triggers on load */

jQuery(document).ready(function() {
	bindContentItemVotes();
	bindArticleSharing();
	bindArticleGallery();
	bindSurveys();
	bindSignupForms();
	bindSocialSharing();
	detectVotingFromEmail();
	detectSharingFromEmail();
	detectPrinterFriendly();
	detectAutoPlayVideo();
	bindPlayVideoLinks();
	bindDateInputs();
	bindPdfPolling();
	MICROSITE_COMMENTS.bindCommentsForm();
	bindRecordArticleClick();
	bindPrintAll();
	bindSearchBox();
	bindAdvancedOptOutForm();
    _initTracking();
});
