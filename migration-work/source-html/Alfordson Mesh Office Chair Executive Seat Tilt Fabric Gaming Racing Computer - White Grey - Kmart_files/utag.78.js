//tealium universal tag - utag.78 ut4.0.202605270019, Copyright 2026 Tealium.com Inc. All Rights Reserved.
var braze=braze||{};var brazeQueue=brazeQueue||[];+function(a,p,P,b,y){a.braze={};a.brazeQueue=[];for(var s="BrazeSdkMetadata DeviceProperties Card Card.prototype.dismissCard Card.prototype.removeAllSubscriptions Card.prototype.removeSubscription Card.prototype.subscribeToClickedEvent Card.prototype.subscribeToDismissedEvent Card.fromContentCardsJson Banner CaptionedImage ClassicCard ControlCard ContentCards ContentCards.prototype.getUnviewedCardCount Feed Feed.prototype.getUnreadCardCount ControlMessage InAppMessage InAppMessage.SlideFrom InAppMessage.ClickAction InAppMessage.DismissType InAppMessage.OpenTarget InAppMessage.ImageStyle InAppMessage.Orientation InAppMessage.TextAlignment InAppMessage.CropType InAppMessage.prototype.closeMessage InAppMessage.prototype.removeAllSubscriptions InAppMessage.prototype.removeSubscription InAppMessage.prototype.subscribeToClickedEvent InAppMessage.prototype.subscribeToDismissedEvent InAppMessage.fromJson FullScreenMessage ModalMessage HtmlMessage SlideUpMessage User User.Genders User.NotificationSubscriptionTypes User.prototype.addAlias User.prototype.addToCustomAttributeArray User.prototype.addToSubscriptionGroup User.prototype.getUserId User.prototype.incrementCustomUserAttribute User.prototype.removeFromCustomAttributeArray User.prototype.removeFromSubscriptionGroup User.prototype.setCountry User.prototype.setCustomLocationAttribute User.prototype.setCustomUserAttribute User.prototype.setDateOfBirth User.prototype.setEmail User.prototype.setEmailNotificationSubscriptionType User.prototype.setFirstName User.prototype.setGender User.prototype.setHomeCity User.prototype.setLanguage User.prototype.setLastKnownLocation User.prototype.setLastName User.prototype.setPhoneNumber User.prototype.setPushNotificationSubscriptionType InAppMessageButton InAppMessageButton.prototype.removeAllSubscriptions InAppMessageButton.prototype.removeSubscription InAppMessageButton.prototype.subscribeToClickedEvent FeatureFlag FeatureFlag.prototype.getStringProperty FeatureFlag.prototype.getNumberProperty FeatureFlag.prototype.getBooleanProperty automaticallyShowInAppMessages destroyFeed hideContentCards showContentCards showFeed showInAppMessage toggleContentCards toggleFeed changeUser destroy getDeviceId initialize isPushBlocked isPushPermissionGranted isPushSupported logCardClick logCardDismissal logCardImpressions logContentCardImpressions logContentCardClick logContentCardsDisplayed logCustomEvent logFeedDisplayed logInAppMessageButtonClick logInAppMessageClick logInAppMessageHtmlClick logInAppMessageImpression logPurchase openSession requestPushPermission removeAllSubscriptions removeSubscription requestContentCardsRefresh requestFeedRefresh refreshFeatureFlags requestImmediateDataFlush enableSDK isDisabled setLogger setSdkAuthenticationSignature addSdkMetadata disableSDK subscribeToContentCardsUpdates subscribeToFeedUpdates subscribeToInAppMessage subscribeToSdkAuthenticationFailures toggleLogging unregisterPush wipeData handleBrazeAction subscribeToFeatureFlagsUpdates getAllFeatureFlags".split(" "),i=0;i<s.length;i++){for(var m=s[i],k=a.braze,l=m.split("."),j=0;j<l.length-1;j++)k=k[l[j]];k[l[j]]=(new Function("return function "+m.replace(/\./g,"_")+"(){window.brazeQueue.push(arguments); return true}"))()}window.braze.getCachedContentCards=function(){return new window.braze.ContentCards};window.braze.getCachedFeed=function(){return new window.braze.Feed};window.braze.getUser=function(){return new window.braze.User};window.braze.getFeatureFlag=function(){return new window.braze.FeatureFlag};}(window,document,'script');try{(function(id,loader){var u={"id":id};utag.o[loader].sender[id]=u;if(utag.ut===undefined){utag.ut={};}
var match=/ut\d\.(\d*)\..*/.exec(utag.cfg.v);if(utag.ut.loader===undefined||!match||parseInt(match[1])<41){u.loader=function(o,a,b,c,l,m){utag.DB(o);a=document;if(o.type=="iframe"){m=a.getElementById(o.id);if(m&&m.tagName=="IFRAME"){b=m;}else{b=a.createElement("iframe");}o.attrs=o.attrs||{};utag.ut.merge(o.attrs,{"height":"1","width":"1","style":"display:none"},0);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";}if(o.id){b.id=o.id;}for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l]);}b.setAttribute("src",o.src);if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){this.onreadystatechange=null;o.cb();}};}}if(o.type!="img"&&!m){l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}}};}else{u.loader=utag.ut.loader;}
if(utag.ut.typeOf===undefined){u.typeOf=function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
u.ev={"view":1,"link":1};u.initialized=false;u.scriptrequested=false;u.queue=[];u.map_func=function(arr,obj,item){var i=arr.shift();obj[i]=obj[i]||{};if(arr.length>0){u.map_func(arr,obj[i],item);}else{obj[i]=item;}};u.clearEmptyKeys=function(object){for(var key in object){if(object[key]===""||object[key]===undefined){delete object[key];}}
return object;};u.hasOwn=function(o,a){return o!=null&&Object.prototype.hasOwnProperty.call(o,a);};u.isEmptyObject=function(o,a){for(a in o){if(u.hasOwn(o,a)){return false;}}return true;};u.map={"braze_api_key":"api_key","hashed_email":"customer_id","tealium_visitor_id":"Alias.alias","_sm_78_4":"Alias.label","BrazeEventTrigger:Add User Alias":"Alias","qp.external_id":"customer_id"};u.extend=[function(a,b){try{b['_sm_78_4']="Tealium Visitor ID";}catch(e){utag.DB(e);}},function(a,b){try{if(1){utag.debugConsoleLog("hello");const campaignName="Braze Content Cards Homepage PLP Banner";var safetyCallback=0;var refreshCallback=0;var newrelic=window.newrelic;function sendErrorToNewRelic(error=new Error("Uncaught Error"),errorLevel="Critical"){utag.debugConsoleLog("sendErrorToNewRelic: ",error);newrelic.noticeError(error,{message:"PERSO Tealium"+errorLevel+"Error","Request Uri":location.pathname,"op-exp-name":campaignName,});}
function sendActionToNewRelic(action){utag.debugConsoleLog("sendActionToNewRelic: ",action);newrelic.addPageAction(action,{message:"PERSO Tealium"+campaignName+"Action","Request Uri":location.pathname,"op-exp-name":campaignName,});}
function waitForElement(selector){return new Promise((resolve)=>{if(document.querySelector(selector)){return resolve(document.querySelector(selector));}
const observer=new MutationObserver((mutations)=>{if(document.querySelector(selector)){observer.disconnect();resolve(document.querySelector(selector));}});observer.observe(document.body,{childList:true,subtree:true,});});}
function injectBrazeContentCards(){if(window.braze){if(braze.ContentCards.length>0){if(refreshCallback==0){refreshCallback+=1;let cards;braze.subscribeToContentCardsUpdates(function(event){cards=event.cards;});braze.requestContentCardsRefresh(function(){window.brazeRefreshed=true;getContentCards();},function(){sendActionToNewRelic("Subscribe to content cards refresh fail in Braze PLP Banner");});}}else{if(safetyCallback<=20){safetyCallback+=1;setTimeout(function(){injectBrazeContentCards();},500);}else{sendErrorToNewRelic("Braze functions does not load properly","Warning");}}}else{if(safetyCallback<=20){safetyCallback+=1;setTimeout(function(){injectBrazeContentCards();},500);}else{sendActionToNewRelic("Braze is not available on the window");}}}
let getContentCards=()=>{let url;let cards=braze.getCachedContentCards().cards;if(cards){cards=cards.filter((a)=>a.extras&&a.extras.content_card_location=="plp_middle");if(cards.length){cards.some((card)=>{card.extras.content_card_background_colour?(card.background_colour=card.extras.content_card_background_colour):(card.background_colour="rgb(244, 244, 244)");url=card.extras.content_card_url;if(url){utag.debugConsoleLog(url);if(window.location.pathname.split("/").includes(url)){return waitForElement("[data-testid='product-image']").then(()=>{renderRecommendations([card]);return true;});}else{utag.debugConsoleLog("location is different");}}});}else{utag.debugConsoleLog("No cards found with content_card_location 'PLP_middle'.");if(safetyCallback<=30){safetyCallback+=1;setTimeout(function(){injectBrazeContentCards();},1000);}else{utag.debugConsoleLog("Content cards location 'plp_middle' is not found");}}}else{if(safetyCallback<=30){safetyCallback+=1;setTimeout(function(){injectBrazeContentCards();},1000);}else{utag.debugConsoleLog("Content cards are not found in Braze hero banner");}}};function renderRecommendations(cards){let html;let cardBanner=cards.filter((a)=>a.Mc=="ab-banner");if(cardBanner.length>0){html='<li class="braze-content-card-hero-image-banner braze-banner-button" style="background:white;">\
    				<a href="'+
cardBanner[0].url+
'">\
            <img src="'+
cardBanner[0].imageUrl+
'" alt="'+
cardBanner[0].title+
'" class="braze-content-card-hero-image" 	style="height:auto"></a> </li>';}else{html='<!-- Desktop Content -->\
<div class="braze-content-card-hero-banner-desktop">\
    <!-- Image Section -->\
\
        <div class="braze-content-card-hero-image-container" style="background:'+
cards[0].background_colour+
'">\
            <img src="'+
cards[0].imageUrl+
'" alt="'+
cards[0].title+
'" class="braze-content-card-hero-image">\
        </div>\
\
\
    <!-- Frame Section -->\
    <div class="braze-content-card-hero-frame-section" style="background:'+
cards[0].background_colour+
'">\
        <!-- Title Section -->\
        <div class="braze-content-card-hero-title-container">\
            <div class="hero-braze-title">\
                '+
cards[0].title+
'\
            </div> <!-- Placeholder for title -->\
        </div>\
\
        <!-- Description Section -->\
        <div class="braze-content-card-bottom-hero-container">\
            <div class="braze-content-card-description-hero-container">\
                <div class="braze-content-card-copy-text-hero">\
                 '+
cards[0].description+
'\
                </div>\
            </div>\
            <div class="braze-content-card-link-container-hero braze-banner-button">\
                <a href="'+
cards[0].url+
'">\
                    <div class = "braze-content-card-link-text-hero">\
                        '+
cards[0].linkText+
"\
                    </div>\
                </a>\
            </div>\
        </div>\
    </div>\
</div>";}
waitForElement("[data-testid='plp-grid-item']").then(()=>{let onepassBanner=document.querySelector("[data-testid='plp-grid-advantage-promo-card']");let holder=document.querySelectorAll("[data-testid='plp-grid-item']")[8];if(holder==null||holder==undefined){sendActionToNewRelic("HTML holder is null or undefined");}else{var styleSheet=document.createElement("style");styleSheet.textContent=styles;document.head.appendChild(styleSheet);holder.insertAdjacentHTML("afterend",html);if(onepassBanner){onepassBanner.remove();};applyGATracking(cards);sendActionToNewRelic("Content Cards Hero banner activated succesfully on homepage ");braze.logContentCardImpressions([cards[0]]);let bannerButton=document.querySelector(".braze-banner-button");if(bannerButton){bannerButton.onclick=function(e){braze.logContentCardClick(cards[0]);e.stopPropagation();e.preventDefault();dataLayer.push({event:"content_card",action:"click",content_card_campaign:cards[0].extras.content_card_campaign,content_card_audience:cards[0].extras.content_card_audience,content_card_cta:cards[0].extras.content_card_cta,});window.location.href=cards[0].url;};}}});return true;}
let applyGATracking=(cards)=>{cards.forEach((card)=>{dataLayer.push({event:"content_card",action:"impression",content_card_campaign:card.extras.content_card_campaign,content_card_audience:card.extras.content_card_audience,content_card_cta:card.extras.content_card_cta,});});};utag.debugConsoleLog("injecting PLP content card");let re=new RegExp("https://(dev|nonprod|www).kmart.com.au/category/.*");let urlLocation=location.href;if(urlLocation.match(re)){injectBrazeContentCards();}
var styles="@media screen and (min-width: 1600px) {\
  .braze-content-card-hero-banner-desktop {\
    display: flex;\
    max-width: 1180px;]\
    align-items: flex-start;\
    flex-direction: column;\
    grid-column-start: 5;\
  }\
  \
  .braze-content-card-hero-image-container {\
    max-width: 300px;\
    max-height: 300px;\
    flex-shrink: 0;\
  }\
\
  .braze-content-card-hero-image-banner {\
    max-width: 100%;\
    max-height: 100%;\
    grid-column-start: 5;\
    flex-shrink: 0;\
  }\
  .braze-content-card-hero-image {\
    width: 100%;\
    height: 100%;\
    flex-shrink: 0;\
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;\
  }\
\
  .braze-content-card-hero-frame-section {\
    padding: 12px;\
    flex-direction: column;\
    align-items: flex-start;\
    gap: 8px;\
    flex: 1 0 0;\
    align-self: stretch;\
    flex: 1 1 0;\
    background: #F7F7F7;\
    flex-direction: column;\
    justify-content: flex-start;\
    display: inline-flex;\
    text-align: center;\
  }\
\
  .braze-content-card-hero-title-container {\
    justify-content: center;\
    align-items: center;\
    align-content: center;\
    gap: 10px;\
    align-self: stretch;\
    flex-wrap: wrap;\
    align-self: stretch;\
    display: inline-flex;\
  }\
\
  .hero-braze-title{\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222222));\
    font-family: AnkoModerat;\
    font-size: 16px;\
    font-style: normal;\
    font-weight: 700;\
    line-height: 24px;\
    letter-spacing: 0.48px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-bottom-hero-container {\
    align-self: stretch;\
    max-height: 112px;\
    flex-direction: column;\
    justify-content: flex-start;\
    align-items: flex-start;\
    gap: 10px;\
    display: flex;\
  }\
\
  .braze-content-card-description-hero-container {\
    flex-direction: column;\
    align-self: stretch;\
    align-self: stretch;\
    justify-content: center;\
    gap: 10px;\
    display: inline-flex;\
  }\
\
  .braze-content-card-copy-text-hero {\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222));\
    font-family: AnkoModerat;\
    font-size: 16px;\
    font-style: normal;\
    font-weight: 400;\
    line-height: 24px;\
    letter-spacing: 0.032px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-link-container-hero {\
    padding-top: 10px;\
    padding-bottom: 10px;\
    border-radius: 2px;\
    justify-content: flex-start;\
    align-items: center;\
    gap: 8px;\
    display: flex;\
    margin: 0 auto;\
  }\
\
  .braze-content-card-link-text-hero {\
    color: #222222;\
    font-size: 16px;\
    font-family: AnkoModerat;\
    font-weight: 700;\
    line-height: 24px;\
    letter-spacing: 0.03px;\
    word-wrap: break-word;\
    text-decoration: underline;\
  }\
}\
\
@media screen and (max-width: 1599px) and (min-width: 1024px) {\
  .braze-content-card-hero-banner-desktop {\
    display: flex;\
    max-width: 1180px;]\
    align-items: flex-start;\
    flex-direction: column;\
    grid-column-start: 4;\
  }\
  \
  .braze-content-card-hero-image-container {\
    max-width: 300px;\
    max-height: 300px;\
    flex-shrink: 0;\
  }\
\
  .braze-content-card-hero-image-banner {\
    max-width: 100%;\
    max-height: 100%;\
    flex-shrink: 0;\
    grid-column-start: 4;\
  }\
  .braze-content-card-hero-image {\
    width: 100%;\
    height: 100%;\
    flex-shrink: 0;\
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;\
  }\
\
  .braze-content-card-hero-frame-section {\
    padding: 12px;\
    flex-direction: column;\
    align-items: flex-start;\
    gap: 8px;\
    flex: 1 0 0;\
    align-self: stretch;\
    flex: 1 1 0;\
    background: #F7F7F7;\
    flex-direction: column;\
    justify-content: flex-start;\
    display: inline-flex;\
    text-align: center;\
  }\
\
  .braze-content-card-hero-title-container {\
    justify-content: center;\
    align-items: center;\
    align-content: center;\
    gap: 10px;\
    align-self: stretch;\
    flex-wrap: wrap;\
    align-self: stretch;\
    display: inline-flex;\
  }\
\
  .hero-braze-title{\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222222));\
    font-family: AnkoModerat;\
    font-size: 16px;\
    font-style: normal;\
    font-weight: 700;\
    line-height: 24px;\
    letter-spacing: 0.48px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-bottom-hero-container {\
    align-self: stretch;\
    max-height: 112px;\
    flex-direction: column;\
    justify-content: flex-start;\
    align-items: flex-start;\
    gap: 10px;\
    display: flex;\
  }\
\
  .braze-content-card-description-hero-container {\
    flex-direction: column;\
    align-self: stretch;\
    align-self: stretch;\
    justify-content: center;\
    gap: 10px;\
    display: inline-flex;\
  }\
\
  .braze-content-card-copy-text-hero {\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222));\
    font-family: AnkoModerat;\
    font-size: 16px;\
    font-style: normal;\
    font-weight: 400;\
    line-height: 24px;\
    letter-spacing: 0.032px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-link-container-hero {\
    padding-top: 10px;\
    padding-bottom: 10px;\
    border-radius: 2px;\
    justify-content: flex-start;\
    align-items: center;\
    gap: 8px;\
    display: flex;\
    margin: 0 auto;\
  }\
\
  .braze-content-card-link-text-hero {\
    color: #222222;\
    font-size: 16px;\
    font-family: AnkoModerat;\
    font-weight: 700;\
    line-height: 24px;\
    letter-spacing: 0.03px;\
    word-wrap: break-word;\
    text-decoration: underline;\
  }\
}\
\
@media screen and (max-width: 1023px) and (min-width: 767px) {\
\
  .braze-content-card-hero-banner-desktop {\
    display: flex;\
    max-width: 1180px;\
    align-items: flex-start;\
    flex-direction: column;\
    grid-column-start: 3;\
  }\
\
  .braze-content-card-hero-image-container {\
    flex-shrink: 0;\
  }\
  \
  .braze-content-card-hero-image-banner {\
    max-width: 100%;\
    max-height: 100%;\
    flex-shrink: 0;\
    grid-column-start: 3;\
  }\
\
  .braze-content-card-hero-image {\
    width: 100%;\
    flex-shrink: 0;\
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;\
  }\
\
  .braze-content-card-hero-frame-section {\
    padding: 8px;\
    flex-direction: column;\
    align-items: flex-start;\
    gap: 4px;\
    flex: 1 0 0;\
    align-self: stretch;\
    flex: 1 1 0;\
    background: #F7F7F7;\
    flex-direction: column;\
    justify-content: flex-start;\
    display: inline-flex;\
    text-align: center;\
  }\
\
  .braze-content-card-hero-title-container {\
    justify-content: center;\
    align-items: center;\
    align-content: center;\
    gap: 10px;\
    align-self: stretch;\
    flex-wrap: wrap;\
    align-self: stretch;\
    display: inline-flex;\
  }\
\
  .hero-braze-title {\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222222));\
    font-family: AnkoModerat;\
    font-size: 16px;\
    font-style: normal;\
    font-weight: 700;\
    line-height: 24px;\
    letter-spacing: 0.40px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-bottom-hero-container {\
    align-self: stretch;\
    flex-direction: column;\
    justify-content: flex-start;\
    align-items: flex-start;\
    gap: 10px;\
    display: flex;\
  }\
\
  .braze-content-card-description-hero-container {\
    flex-direction: column;\
    align-self: stretch;\
    align-self: stretch;\
    justify-content: center;\
    gap: 10px;\
    display: inline-flex;\
  }\
\
  .braze-content-card-copy-text-hero {\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222));\
    font-family: AnkoModerat;\
    font-size: 14px;\
    font-style: normal;\
    font-weight: 400;\
    line-height: 20px;\
    letter-spacing: 0.032px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-link-container-hero {\
    padding-top: 10px;\
    padding-bottom: 10px;\
    border-radius: 2px;\
    justify-content: flex-start;\
    align-items: center;\
    gap: 8px;\
    display: inline-flex;\
    margin: 0 auto;\
  }\
\
  .braze-content-card-link-text-hero {\
    color: #222222;\
    font-size: 14px;\
    font-family: AnkoModerat;\
    font-weight: 700;\
    line-height: 20px;\
    letter-spacing: 0.03px;\
    word-wrap: break-word;\
    text-decoration: underline;\
    margin: 0 auto;\
  }\
\
}\
\
@media screen and (max-width: 767px) {\
\
  .braze-content-card-hero-banner-desktop {\
    display: flex;\
    max-width: 1180px;\
    align-items: flex-start;\
    flex-direction: column;\
  }\
\
  .braze-content-card-hero-image-container {\
    flex-shrink: 0;\
  }\
  \
    .braze-content-card-hero-image-banner {\
    max-width: 100%;\
    max-height: 100%;\
    flex-shrink: 0;\
    grid-column-start: 2;\
  }\
\
  .braze-content-card-hero-image {\
    width: 100%;\
    flex-shrink: 0;\
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;\
  }\
\
  .braze-content-card-hero-frame-section {\
    padding: 8px;\
    flex-direction: column;\
    align-items: flex-start;\
    gap: 4px;\
    flex: 1 0 0;\
    align-self: stretch;\
    flex: 1 1 0;\
    background: #F7F7F7;\
    flex-direction: column;\
    justify-content: flex-start;\
    display: inline-flex;\
    text-align: center;\
  }\
\
  .braze-content-card-hero-title-container {\
    justify-content: center;\
    align-items: center;\
    align-content: center;\
    gap: 10px;\
    align-self: stretch;\
    flex-wrap: wrap;\
    align-self: stretch;\
    display: inline-flex;\
  }\
\
  .hero-braze-title {\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222222));\
    font-family: AnkoModerat;\
    font-size: 14px;\
    font-style: normal;\
    font-weight: 700;\
    line-height: 24px;\
    letter-spacing: 0.40px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-bottom-hero-container {\
    align-self: stretch;\
    flex-direction: column;\
    justify-content: flex-start;\
    align-items: flex-start;\
    gap: 10px;\
    display: flex;\
  }\
\
  .braze-content-card-description-hero-container {\
    flex-direction: column;\
    align-self: stretch;\
    align-self: stretch;\
    justify-content: center;\
    gap: 10px;\
    display: inline-flex;\
  }\
\
  .braze-content-card-copy-text-hero {\
    color: var(--Primary-Dark, var(--Public-Facing-Primary-Dark, #222));\
    font-family: AnkoModerat;\
    font-size: 14px;\
    font-style: normal;\
    font-weight: 400;\
    line-height: 20px;\
    letter-spacing: 0.032px;\
    flex: 1 1 0;\
    word-wrap: break-word;\
  }\
\
  .braze-content-card-link-container-hero {\
    padding-top: 10px;\
    padding-bottom: 10px;\
    border-radius: 2px;\
    justify-content: flex-start;\
    align-items: center;\
    gap: 8px;\
    display: inline-flex;\
        margin: 0 auto;\
  }\
\
  .braze-content-card-link-text-hero {\
    color: #222222;\
    font-size: 14px;\
    font-family: AnkoModerat;\
    font-weight: 700;\
    line-height: 20px;\
    letter-spacing: 0.03px;\
    word-wrap: break-word;\
    text-decoration: underline;\
\
  }\
\
};";}}catch(e){utag.DB(e)}},function(a,b){try{if((typeof b['hashed_email']=='undefined'&&b['cp.utag_main__pn'].toString().toLowerCase()=='1'.toLowerCase())){b['BrazeEventTrigger']='Add User Alias'}}catch(e){utag.DB(e);}},function(a,b,c,d,e,f,g){if(1){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'nonprod.kmart.com.au':'e4f08860-e148-4b46-89c7-982ec5121eb1'},{'www.kmart.com.au':'7a07460e-32c2-420e-979b-3ad707d14b33'},{'dev.kmart.com.au':'e4f08860-e148-4b46-89c7-982ec5121eb1'}];var m=false;for(e=0;e<c.length;e++){for(f in utag.loader.GV(c[e])){if(d==f){b['braze_api_key']=c[e][f];m=true};};if(m)break};}}];u.loader_cb=function(){utag.DB("send:78:CALLBACK");u.initialized=true;var g={},i,_event,p;if(!u.isEmptyObject(u.data.initOpt)){var config={};if(u.data.initOpt.allow_crawler){config.allowCrawlerActivity=u.toBoolean(u.data.initOpt.allow_crawler);}
if(u.data.initOpt.allow_user_supplied_javascript){config.allowUserSuppliedJavascript=u.toBoolean(u.data.initOpt.allow_user_supplied_javascript);}
if(u.data.initOpt.app_ver){config.appVersion=u.data.initOpt.app_ver;}
if(u.data.initOpt.base_url){config.baseUrl=u.data.initOpt.base_url;}
if(u.data.initOpt.no_cookies){config.noCookies=u.toBoolean(u.data.initOpt.no_cookies);}
if(u.data.initOpt.no_fntawsm){config.doNotLoadFontAwesome=u.toBoolean(u.data.initOpt.no_fntawsm);}
if(u.data.initOpt.enable_logging){config.enableLogging=u.toBoolean(u.data.initOpt.enable_logging);}
if(u.data.initOpt.localization){config.localization=u.data.initOpt.localization;}
if(u.data.initOpt.min_trggrinterval){config.minimumIntervalBetweenTriggerActionsInSeconds=u.data.initOpt.min_trggrinterval;}
if(u.data.initOpt.msg_innewtab){config.openInAppMessagesInNewTab=u.toBoolean(u.data.initOpt.msg_innewtab);}
if(u.data.initOpt.card_innewtab){config.openNewsFeedCardsInNewTab=u.data.initOpt.card_innewtab;}
if(u.data.initOpt.explicit_dissmisal){config.requireExplicitInAppMessageDismissal=u.toBoolean(u.data.initOpt.explicit_dissmisal);}
if(u.data.initOpt.safari_pushid){config.safariWebsitePushId=u.data.initOpt.safari_pushid;}
if(u.data.initOpt.srvcewrkr_location){config.serviceWorkerLocation=u.data.initOpt.srvcewrkr_location;}
if(u.data.initOpt.session_timeout){config.sessionTimeoutInSeconds=u.data.initOpt.session_timeout;}
if(u.data.initOpt.devicePropertyAllowlist){config.devicePropertyAllowlist=u.data.initOpt.devicePropertyAllowlist;}
if(u.data.initOpt.enableSdkAuthentication){config.enableSdkAuthentication=u.toBoolean(u.data.initOpt.enableSdkAuthentication);}
if(u.data.initOpt.content_security_nonce){config.contentSecurityNonce=u.data.initOpt.content_security_nonce;}
if(u.data.initOpt.disable_push_token_maintenance){config.disablePushTokenMaintenance=u.toBoolean(u.data.initOpt.disable_push_token_maintenance);}
if(u.data.initOpt.in_app_message_zindex){config.inAppMessageZIndex=u.data.initOpt.in_app_message_zindex;}
if(u.data.initOpt.manage_service_worker_externally){config.manageServiceWorkerExternally=u.toBoolean(u.data.initOpt.manage_service_worker_externally);}
if(u.data.initOpt.open_cards_in_new_tab){config.openCardsInNewTab=u.toBoolean(u.data.initOpt.open_cards_in_new_tab);}
if(u.data.initOpt.custom){Object.keys(u.data.initOpt.custom).map(function(param){config[param]=u.data.initOpt.custom[param];});}
braze.initialize(u.data.api_key,config);}else{braze.initialize(u.data.api_key);}
braze.addSdkMetadata([braze.BrazeSdkMetadata.TEALIUM]);braze.automaticallyShowInAppMessages();if(u.data.customer_id){braze.changeUser(u.data.customer_id);}
braze.subscribeToContentCardsUpdates(function(event){window.contentCardsForUser=event.cards;utag.debugConsoleLog("subscribing to content card updates 2");});utag.debugConsoleLog("subscribing to content card updates 1");braze.openSession();if(u.data.order_id){for(i=0;i<u.data.event.length;i++){if(u.data.event[i]==="Purchase"){p=true;}}
if(!p){u.data.event.push("Purchase");}}
for(i=0;i<u.data.event.length;i++){_event=u.data.event[i];g=u.data[_event]=u.data[_event]||{};if(_event==="Purchase"){if(!u.isEmptyObject(g.purchase_properties)){braze.logPurchase(g.product_id||u.data.product_id[0],g.order_subtotal||u.data.order_subtotal,g.order_currency||u.data.order_currency,g.product_quantity||u.data.product_quantity[0],g.purchase_properties);}else{braze.logPurchase(g.product_id||u.data.product_id[0],g.order_subtotal||u.data.order_subtotal,g.order_currency||u.data.order_currency,g.product_quantity||u.data.product_quantity[0]);}}else if(_event==="Alias"){braze.getUser().addAlias(g.alias,g.label);}else if(_event==="AddAtt"){braze.getUser().addToCustomAttributeArray(g.key,g.value);}else if(_event==="addToSubscriptionGroup"){braze.getUser().addToSubscriptionGroup(g.subscriptionGroupId);}else if(_event==="IncAtt"){braze.getUser().incrementCustomUserAttribute(g.key,g.inc_value);}else if(_event==="RmvAtt"){braze.getUser().removeFromCustomAttributeArray(g.key,g.value);}else if(_event==="SetAtt"){braze.getUser().setCustomUserAttribute(g.key,g.value);}else if(_event==="SetLoc"){braze.getUser().setLastKnownLocation(g.latitude,g.longitude,g.accuracy,g.altitude,g.altitude_accuracy);}else if(_event==="SetDOB"){braze.getUser().setDateOfBirth(g.year,g.month,g.day);}else if(_event==="SetEmail"){braze.getUser().setEmail(g.email);}else if(_event==="SetEmailSub"){braze.getUser().setEmailNotificationSubscriptionType(g.notification_type);}else if(_event==="SetPushSub"){braze.getUser().setPushNotificationSubscriptionType(g.notification_type);}else if(_event==="SetFirst"){braze.getUser().setFirstName(g.first_name);}else if(_event==="SetLast"){braze.getUser().setLastName(g.last_name);}else if(_event==="SetCity"){braze.getUser().setHomeCity(g.customer_city||u.data.customer_city);}else if(_event==="SetCountry"){braze.getUser().setCountry(g.customer_country||u.data.customer_country);}else if(_event==="SetLang"){braze.getUser().setLanguage(g.language);}else if(_event==="SetPhone"){braze.getUser().setPhoneNumber(g.phone_number);}else if(_event==="SetGender"){braze.getUser().setGender(g.gender);}else if(_event){if(!u.isEmptyObject(u.data[_event])){braze.logCustomEvent(_event,u.data[_event]);}else{braze.logCustomEvent(_event);}}}
utag.DB("send:78:CALLBACK:COMPLETE");};u.callBack=function(){var data={};while(data=u.queue.shift()){u.loader_cb();}};u.toBoolean=function(val){val=val||"";return val===true||val.toLowerCase()==="true"||val.toLowerCase()==="on";};u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){utag.DB("send:78");utag.DB(b);var c,d,e,f,h;u.data={"qsp_delim":"&","kvp_delim":"=","base_url":"https:/"+"/js.appboycdn.com/web-sdk/##utag_code_version##/braze.no-amd.min.js","code_version":"4.8","api_key":"e4f08860-e148-4b46-89c7-982ec5121eb1","cst_url":"sdk.iad-05.braze.com","enable_logging":"false","initOpt":{},"product_id":[],"product_quantity":[],"event":[],"custom":{}};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};utag.DB("send:78:EXTENSIONS");utag.DB(b);c=[];for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.map_func(e[f].split("."),u.data,b[d]);}}else{h=d.split(":");if(h.length===2&&b[h[0]]===h[1]){if(u.map[d]){u.data.event=u.data.event.concat(u.map[d].split(","));}}}}
utag.DB("send:78:MAPPINGS");utag.DB(u.data);u.data.order_id=u.data.order_id||b._corder||"";u.data.order_subtotal=u.data.order_subtotal||b._csubtotal||"";u.data.order_currency=u.data.order_currency||b._ccurrency||"";u.data.customer_id=u.data.customer_id||b._ccustid||"";u.data.customer_city=u.data.customer_city||b._ccity||"";u.data.customer_country=u.data.customer_country||b._ccountry||"";if(u.data.product_id.length===0&&b._cprod!==undefined){u.data.product_id=b._cprod.slice(0);}
if(u.data.product_quantity.length===0&&b._cquan!==undefined){u.data.product_quantity=b._cquan.slice(0);}
if(u.data.event.length===0&&b._cevent!==undefined){u.data.event=(u.typeOf(b._cevent)==="array")?b._cevent.slice(0):[b._cevent];}
if(!u.data.api_key){utag.DB(u.id+": Tag not fired: Required attribute 'API Key' not populated");return;}
if(!u.data.cst_url){utag.DB(u.id+": Tag not fired: Required attribute 'Base URL' not populated");return;}
u.data.code_version=u.data.code_version.split(".").slice(0,2).join(".");u.data.base_url=u.data.base_url.replace("##utag_code_version##",u.data.code_version);if(u.data.cst_url&&!u.data.initOpt.base_url){u.data.initOpt.base_url=u.data.cst_url;}
if(u.data.initOpt.enable_logging===undefined&&u.data.enable_logging==="true"){u.data.initOpt.enable_logging=u.data.enable_logging;}
if(u.initialized){u.loader_cb();}else{u.queue.push({"data":u.data,"a":a,"b":b,"c":c});if(!u.scriptrequested){u.scriptrequested=true;u.loader({"type":"script","src":u.data.base_url,"cb":u.callBack,"loc":"script","id":"utag_78","attrs":{}});}}
utag.DB("send:78:COMPLETE");}};utag.o[loader].loader.LOAD(id);}("78","kmart.main"));}catch(error){utag.DB(error);}
