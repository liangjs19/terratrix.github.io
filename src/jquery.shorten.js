/*
 * jQuery Shorten plugin 1.1.0
 *
 * Copyright (c) 2014 Viral Patel
 * http://viralpatel.net
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

/*
** updated by Jeff Richardson
** Updated to use strict,
** IE 7 has a "bug" It is returning underfined when trying to reference string characters in this format
** content[i]. IE 7 allows content.charAt(i) This works fine in all modern browsers.
** I've also added brackets where they werent added just for readability (mostly for me).
*/
(function($){$.fn.shorten=function(settings){"use strict";var config={showChars:100,ellipsesText:"...",moreText:"more",lessText:"less",errMsg:null,force:false};if(settings){$.extend(config,settings);}
if($(this).data('jquery.shorten')&&!config.force){return false;}
$(this).data('jquery.shorten',true);$(document).off("click",'.morelink');$(document).on({click:function(){var $this=$(this);if($this.hasClass('less')){$this.removeClass('less');$this.html(config.moreText);$this.parent().prev().prev().show();$this.parent().prev().hide();}else{$this.addClass('less');$this.html(config.lessText);$this.parent().prev().prev().hide();$this.parent().prev().show();}
return false;}},'.morelink');return this.each(function(){var $this=$(this);var content=$this.html();var contentlen=$this.text().length;if(contentlen>config.showChars){var c=content.substr(0,config.showChars);if(c.indexOf('<')>=0)
{var inTag=false;var bag='';var countChars=0;var openTags=[];var tagName=null;for(var i=0,r=0;r<=config.showChars;i++){if(content[i]=='<'&&!inTag){inTag=true;tagName=content.substring(i+1,content.indexOf('>',i));if(tagName[0]=='/'){if(tagName!='/'+openTags[0]){config.errMsg='ERROR en HTML: the top of the stack should be the tag that closes';}else{openTags.shift();}}else{if(tagName.toLowerCase()!='br'){openTags.unshift(tagName);}}}
if(inTag&&content[i]=='>'){inTag=false;}
if(inTag){bag+=content.charAt(i);}
else{r++;if(countChars<=config.showChars){bag+=content.charAt(i);countChars++;}else
{if(openTags.length>0)
{for(j=0;j<openTags.length;j++){bag+='</'+openTags[j]+'>';}
break;}}}}
c=$('<div/>').html(bag+'<span class="ellip">'+config.ellipsesText+'</span>').html();}else{c+=config.ellipsesText;}
var html='<div class="shortcontent">'+c+'</div><div class="allcontent">'+content+'</div><span><a href="javascript://nop/" class="morelink">'+config.moreText+'</a></span>';$this.html(html);$this.find(".allcontent").hide();$('.shortcontent p:last',$this).css('margin-bottom',0);}});};})(jQuery);