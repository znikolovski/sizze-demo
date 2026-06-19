
if (typeof (window) !== 'undefined' && window.performance && window.performance.mark) {
  window.performance.mark('yotpo:loader:loaded');
}
if (typeof document !== 'undefined') {
    (function removeYotpoAeoElement(retries) {
        var els = document.querySelectorAll('#yotpo-reviews-section-data');
        if (!els.length) {
            if (retries > 0) {
                requestAnimationFrame(function() { removeYotpoAeoElement(retries - 1); });
            } else if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() { removeYotpoAeoElement(0); });
            }
            return;
        }
        for (var i = 0; els.length > i; i++) {
            if (els[i].parentNode) {
                els[i].parentNode.removeChild(els[i]);
            }
        }
    })(10);
}
var yotpoWidgetsContainer = yotpoWidgetsContainer || { guids: {} };
(function(){
    var guid = "SzVy7lws56AxMwq47Ufx69XAHnIA3zd0fBJNcbBG";
    var loader = {
        loadDep: function (link, onLoad, strategy) {
            var script = document.createElement('script');
            script.onload = onLoad || function(){};
            script.src = link;
            if (strategy === 'defer') {
                script.defer = true;
            } else if (strategy === 'async') {
                script.async = true;
            }
            script.setAttribute("type", "text/javascript");
            script.setAttribute("charset", "utf-8");
            document.head.appendChild(script);
        },
        config: {
            data: {
                guid: guid
            },
            widgets: {
            
                "915283": {
                    instanceId: "915283",
                    instanceVersionId: "656672211",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-reviews-main-widget/app.v0.116.2-7261.js",
                    cssOverrideAssetUrl: "https://staticw2.yotpo.com/widget-assets/ReviewsMainWidget/SzVy7lws56AxMwq47Ufx69XAHnIA3zd0fBJNcbBG/css-overrides/css-overrides.2025_11_25_17_39_21_442.css",
                    customizationCssUrl: "",
                    customizations: {
                      "abstract-user-icon-aria": "Abstract user icon",
                      "active-filter-label": "Selected filter: {{selectedValue}}",
                      "added-file-communicate-aria": "Added {{addedFiles}} file.",
                      "added-files-communicate-aria": "Added {{addedFiles}} files.",
                      "ai-generated-text": "AI-generated from customer reviews.",
                      "all-files-size-text": "{{amountFiles}} MB",
                      "all-ratings-text": "All ratings",
                      "anonymous-user": "Anonymous User",
                      "anonymous-user-icon-aria": "Anonymous user icon",
                      "bottom-line-custom-questions-enable": "true",
                      "bottom-line-enable": true,
                      "bottom-line-show-text": true,
                      "bottom-line-syndication-settings-text": "({{syndicated_reviews_count}} in other languages)",
                      "bottom-line-syndication-settings-text-one-language-review": "(1 in another language)",
                      "bottom-line-text": "Based on {{reviews_count}} reviews",
                      "bottom-line-text-one-review": "Based on 1 review",
                      "cancel-text": "Cancel",
                      "carousel-aria-text": "carousel",
                      "clear-all-filters-popup-text": "Clear all filters",
                      "clear-filters-text": "Clear filters",
                      "close-filters-modal-aria": "Close filters modal",
                      "close-modal-aria": "Close modal",
                      "close-summary-modal-aria": "Close summary modal",
                      "close-tooltip-aria": "Close tooltip",
                      "comments-by-store-owner-aria": "Comments by Store Owner on Review by {{reviewerName}} on {{date}}",
                      "comments-by-store-owner-text": "Comments by Store Owner on Review by {{reviewer_name}} on",
                      "content-date-enable": true,
                      "content-date-format": "DD/MM/YY",
                      "content-pagination-per-page": 5,
                      "content-pagination-per-page-boldLayout": 9,
                      "default-sorting-order": "Most relevant||Rating||With media||Most recent||Verified purchase",
                      "default-sorting-order-smart-score": "Most relevant||Most recent||With media||Verified purchase||Rating",
                      "delete-button-text": "Delete",
                      "delete-file-aria": "Delete file {{file_name}}",
                      "detailed-ratings-aria-label": "Detailed Ratings",
                      "dropdown-default-title-text": "All",
                      "dropdown-filter-by-media-aria-label": "Filter with media",
                      "duplicate-review-body-text": "We only allow one review per day. Please come back tomorrow to share more feedback.",
                      "duplicate-review-headline-text": "You've already submitted a review today!",
                      "empty-state-body-text": "Let us know what you think",
                      "empty-state-button-text": "Be the first to write a review!",
                      "empty-state-enable": true,
                      "empty-state-title-text": "We’re looking for stars!",
                      "example-background-color": "#3184ed",
                      "feature-reviews-filter-by-media-onsite-enable": "true",
                      "feature-reviews-filter-by-smart-topics-onsite-enable": "false",
                      "feature-reviews-filter-by-star-rating-onsite-enable": "true",
                      "feature-reviews-search-onsite-enable": "true",
                      "feature-reviews-smart-topics-minimum": 2,
                      "feature-reviews-sorting-onsite-enable": true,
                      "feature-reviews-star-distribution-onsite-enable": "true",
                      "file-selected-aria": "{{getAmountOfFiles}} file selected, total size {{getAllFilesSize}} MB",
                      "file-selected-text": "{{amountFiles}} file",
                      "file-size-unit-label": "MB",
                      "files-selected-aria": "{{getAmountOfFiles}} files selected, total size {{getAllFilesSize}} MB",
                      "files-selected-text": "{{amountFiles}} files",
                      "filter-by-country-text": "Country",
                      "filter-by-media-text": "With media filter",
                      "filter-reviews-by-all-scores-form-control-aria": "Filter reviews by all ratings",
                      "filter-reviews-by-one-score-form-control-aria": "Filter reviews by {{score}} star",
                      "filter-reviews-by-score-form-control-aria": "Filter reviews by {{score}} stars",
                      "filters-text": "Filters",
                      "found-matching-reviews-text": "We found {{total_reviews}} matching reviews",
                      "general-error-body-text": "Something went wrong while submitting your feedback.",
                      "general-error-headline-text": "We couldn't submit your review",
                      "go-to-next-page-aria": "Navigate to next page",
                      "go-to-page-with-index-aria": "Navigate to page {{index}} of comments",
                      "go-to-prev-page-aria": "Navigate to previous page",
                      "got-it-text": "Got it",
                      "grouped-products-enable": false,
                      "image-media-type-aria": "Image:",
                      "image-of-customer": "Image of customer.",
                      "image-of-customer-with-info": "Image of review by {{description}} on {{review_date}} number {{number_element}}",
                      "incentivized-badge-color": "#373330",
                      "incentivized-badge-details-enable": false,
                      "incentivized-badge-enable": false,
                      "incentivized-badge-title": "Incentivized review",
                      "incentivized-coupon-text": "This shopper received a coupon for submitting a review",
                      "incentivized-employee-review": "This review was written by a company employee",
                      "incentivized-free-product": "The shopper received this product for free in exchange for a review",
                      "incentivized-loyalty-points-text": "This shopper received loyalty points for submitting a review",
                      "incentivized-other-text": "This shopper received an incentive for submitting a review",
                      "incentivized-paid-promotion": "This shopper received a discount for submitting a review",
                      "info-not-support-browser-label": "Your browser does not support the video tag.",
                      "item-description-aria-text": "Slide {{current_slide_index}} of {{number_of_slides}}.",
                      "language-code": "en",
                      "language-detection-failed-text": "Language detection failed.",
                      "load-font-customizations": "view-primary-font, view-secondary-font",
                      "load-more-reviews-button-text": "Load more reviews",
                      "media-error-body-text": "Your feedback was posted, but we couldn’t upload your media due to a connection issue.",
                      "media-error-headline-text": "Your review was submitted!",
                      "media-filter-placeholder-text": "With media",
                      "media-gallery-enable": false,
                      "media-gallery-headline-text": "Reviews with images",
                      "media-gallery-minimum-images": 5,
                      "media-list-aria": "Selected files",
                      "media-list-aria-label": "Selected files",
                      "mobile-dropdown-default-title-text": "Please select",
                      "mobile-filters-button-text": "Filters",
                      "mode-show-only-add-review-button": false,
                      "more-review-loaded-aria-alert": "{{newReviews}} new reviews loaded",
                      "more-review-loading-aria-alert": "Loading more reviews",
                      "next-button-aria-text": "Next review media slide",
                      "no-added-files-communicate-aria": "No files added.",
                      "no-files-selected-aria": "No files selected",
                      "no-matching-reviews-text": "No matching reviews",
                      "ocean-button-style": 1,
                      "ocean-enable": false,
                      "old-widget-class-name": "yotpo yotpo-main-widget",
                      "onsite-sorting": "",
                      "open-media-gallery-modal-aria": "Open media gallery, {{amountMedia}} items total.",
                      "optional-form-field-label": "(Optional)",
                      "paragraph-summary-aria": "Click to view detailed reviews summary",
                      "paragraph-summary-button-text": "Read summary by topics",
                      "paragraph-summary-title": "Customers say",
                      "pills-active-filters-aria-label": "Active Filters",
                      "popular-topics-show-less-text": "Show less",
                      "popular-topics-show-more-text": "Show more",
                      "popular-topics-text": "Popular topics",
                      "prev-button-aria-text": "Previous review media slide",
                      "primary-font-name-and-url": "Montserrat@600|https://staticw2.yotpo.com/web-fonts/css/montserrat/v1/montserrat_600.css",
                      "primary-font-size": "14",
                      "privacy-policy-consent-settings-link-text": "Privacy Policy",
                      "privacy-policy-consent-settings-text": "I agree to the",
                      "published-date-text": "Published date",
                      "qna-tab-aria-label": "Questions \u0026 Answers",
                      "qna-tab-text": "Q\u0026A",
                      "rating-placeholder-text": "Rating",
                      "rating-text": "Rating",
                      "read-less-text": "Read less",
                      "read-less-text-review-aria-label": "Read less about {{reviewTitle}} review by {{reviewerName}}",
                      "read-more-text": "Read more",
                      "read-more-text-review-aria-label": "Read more about {{reviewTitle}} review by {{reviewerName}}",
                      "read-only-enable": true,
                      "related-product-link-aria": "{{productName}} opens in a new window.",
                      "remove-filter-pill-aria-label": "Remove filter: {{title}}: {{value}}",
                      "removed-files-communicate-aria": "File removed.",
                      "reply-title": "Store Owner",
                      "required-error-message-text": "required",
                      "required-fields-text": "required fields",
                      "revievs-tab-text": "Reviews",
                      "review-content-error-message-text": "Review content is required",
                      "review-content-headline-text": "Write a review",
                      "review-content-placeholder-text": "Tell us what you like or dislike",
                      "review-continue-shopping-text": "Continue shopping",
                      "review-customer-free-text-error-message-text": "This field is mandatory",
                      "review-customer-free-text-placeholder-message-text": "Tell us about your buying experience",
                      "review-email-default-message-text": "We'll send you an email to verify this review came from you.",
                      "review-email-error-message-text": "A valid email address is required",
                      "review-email-headline-text": "Your email address",
                      "review-feedback-ask-text": "Your feedback helps other shoppers make better decisions.",
                      "review-headline-error-message-text": "Review headline is required",
                      "review-headline-headline-text": "Add a headline",
                      "review-headline-placeholder-text": "Summarize your experience",
                      "review-images-default-message-text": "Upload up to 10 images and 3 videos (max. file size 2 GB)",
                      "review-images-error-message-text": "You can upload a maximum of 10 images and 3 videos",
                      "review-images-error-second-message-text": "Your file is too big. Max. file size is 2 GB.",
                      "review-images-error-third-message-text": "Unsupported file format: HEIC/HEIF files are not allowed.",
                      "review-images-headline-text": "Add media",
                      "review-images-mobile-default-message-text": "Upload up to 3 images (max. 5 MB each) and 1 video (max. 100 MB).",
                      "review-images-mobile-error-message-text": "You can upload a maximum of 3 images and 1 video",
                      "review-images-mobile-error-second-message-text": "Your file is too big. Max. video size is 100 MB. Max. image size is 5 MB.",
                      "review-item-group-aria-label": "Review by {{name}} Rating: {{rating}} out of 5 stars.",
                      "review-multiple-choice-default-message-text": "Choose all that apply",
                      "review-multiple-choice-error-message-text": "This field is mandatory - choose at least 1 that applies",
                      "review-name-default-message-text": "This will appear publicly with your review",
                      "review-name-error-message-text": "A name is required",
                      "review-name-headline-text": "Your name",
                      "review-not-translated": "This review can't be translated",
                      "review-product-free-text-error-message-text": "This field is mandatory",
                      "review-product-free-text-placeholder-message-text": "Tell us about your buying experience",
                      "review-rating-average-text": "Average",
                      "review-rating-default-message-text": "Choose 1",
                      "review-rating-error-message-text": "This field is mandatory - choose 1 that applies",
                      "review-rating-good-text": "Good",
                      "review-rating-great-text": "Great!",
                      "review-rating-poor-text": "Poor",
                      "review-rating-very-poor-text": "Very poor",
                      "review-single-choice-default-message-text": "Choose 1 ",
                      "review-single-choice-error-message-text": "This field is mandatory - choose 1 that applies",
                      "review-size-default-message-text": "Choose 1",
                      "review-size-error-message-text": "This field is mandatory - choose 1 that applies",
                      "review-thanks-text": "Thanks, {{name}}!",
                      "reviews-clear-all-filters-text": "Clear all filters",
                      "reviews-filtering-reviews-text": "Filtering reviews",
                      "reviews-headline-enable": "false",
                      "reviews-headline-text": "Customer Reviews",
                      "reviews-no-matching-reviews-text": "No matching reviews",
                      "reviews-pagination-aria-label": "Reviews pagination",
                      "reviews-product-custom-questions-color": "#2e4f7c",
                      "reviews-product-custom-questions-enable": "true",
                      "reviews-product-custom-questions-filters-enable": "true",
                      "reviews-product-custom-questions-placement": "Right",
                      "reviews-product-reviewed": "Product reviewed:",
                      "reviews-product-variant-enable": false,
                      "reviews-reviewer-country-flag-enable": true,
                      "reviews-reviewer-custom-questions-enable": "true",
                      "reviews-reviewer-custom-questions-filters-enable": false,
                      "reviews-show-tab-title": false,
                      "reviews-summary-banner-button-text": "Take me there",
                      "reviews-summary-banner-headline": "A lot to digest?",
                      "reviews-summary-banner-primary-color": "#000000",
                      "reviews-summary-banner-text": "Read an AI-generated summary of recent customer reviews by topic",
                      "reviews-summary-banner-text-color": "#000000",
                      "reviews-summary-banner-toggle-enable": false,
                      "reviews-summary-toggle-enable": "false",
                      "reviews-try-clearing-filters-text": "Try clearing or changing the filters.",
                      "reviews-vote-down-confirmation-message": "You voted down for this review",
                      "reviews-vote-removed-confirmation-message": "You removed your vote from this review",
                      "reviews-vote-submitting-message": "Submitting your vote",
                      "reviews-vote-up-confirmation-message": "You voted up for this review",
                      "reviews-votes-enable": true,
                      "reviews-votes-text": "Was this review helpful?",
                      "rtl": false,
                      "score-filter-label-aria": "Select a rating for filtering reviews, from 1 star (lowest) to 5 stars (highest)",
                      "screen-a-header-text": "Hello Live Widget!",
                      "search-reviews-placeholder-text": "Search reviews",
                      "search-reviews-with-media-form-control-aria": "Search reviews with media",
                      "see-less-text": "See less",
                      "see-more-text": "See more",
                      "see-next-media-aria": "See Next Media",
                      "see-original-text": "See original",
                      "see-previous-media-aria": "See Previous Media",
                      "send-button-text": "Send",
                      "share-your-thoughts-text": "Share your thoughts",
                      "shopper-avatar-enable": true,
                      "shopper-avatar-enable-boldLayout": false,
                      "shopper-avatar-format": "icon",
                      "shopper-badge-enable": true,
                      "shopper-name-format": "firstNameWithInitial",
                      "should-lazy-load": false,
                      "show-less-text-aria-label": "Show less popular topics",
                      "show-more-text-aria-label": "Show more popular topics",
                      "show-reviews-amount-plural-text": "Show {{total_reviews_amount}} reviews",
                      "show-reviews-amount-singular-text": "Show {{total_reviews_amount}} review",
                      "slide-aria-text": "slide",
                      "slide-controls-aria-text": "Slide Controls",
                      "smart-score-sort-enable": false,
                      "sort-by-text": "Sort by",
                      "sorting-highest-rating-text": "Highest rating",
                      "sorting-lowest-rating-text": "Lowest rating",
                      "sorting-most-recent-text": "Most recent",
                      "sorting-most-relevant-text": "Most relevant",
                      "sorting-verified-purchase-text": "Verified purchase",
                      "sorting-with-media-text": "With media",
                      "star-distribution-aria": "{{row}} star by {{value}} reviews",
                      "star-icon-aria-label": "Score {{index}} {{ratingText}}",
                      "star-rating-error-message-text": "A star rating is required",
                      "star-rating-headline-text": "Rate your experience",
                      "star-rating-image-label": "{{score_average}} out of 5 stars",
                      "star-rating-info": "{{rating}} star rating",
                      "star-rating1": "1 star",
                      "star-rating2": "2 stars",
                      "star-rating3": "3 stars",
                      "star-rating4": "4 stars",
                      "star-rating5": "5 stars",
                      "store-owner-text": "Store Owner",
                      "submit-review-loading-aria-alert": "Submitting your review",
                      "summary-banner-quote-author-aria": "Author",
                      "summary-banner-review-summary-aria": "Review Summary",
                      "summary-button-style": 2,
                      "summary-button-text": "See reviews summary",
                      "summary-coverage-text": "Mentioned in {{coverage}} of reviews",
                      "summary-footer-read-all-reviews-text": "Read all reviews",
                      "summary-header-text": "These are the topics customers are talking about based on {{reviews_count}} customer reviews.",
                      "summary-hide-logo-enable": false,
                      "summary-icon-neutral-feedback-aria": "Neutral feedback",
                      "summary-icon-neutral-sentiment-aria": "Neutral sentiment",
                      "summary-icon-positive-feedback-aria": "Positive feedback",
                      "summary-icon-positive-sentiment-aria": "Positive sentiment",
                      "summary-min-star-rating": 3,
                      "summary-reviews-highlight-title": "Reviews Highlights:",
                      "summary-show-button-icon": true,
                      "summary-show-topic-emoji": true,
                      "summary-title": "Customers say",
                      "summary-topic-emoji": "thumbs",
                      "syndication-enable": false,
                      "terms-and-conditions-settings-link-text": "Terms \u0026 Conditions",
                      "terms-and-conditions-settings-text": "I agree to the",
                      "this-review-was-helpful": "This review was helpful",
                      "this-review-was-helpful-singular": "This review was helpful, {{votes_count}} person voted",
                      "this-review-was-helpful-zero": "This review was helpful, no votes yet",
                      "this-review-was-not-helpful": "This review was not helpful",
                      "this-review-was-not-helpful-singular": "This review was not helpful, {{votes_count}} person voted",
                      "this-review-was-not-helpful-zero": "This review was not helpful, no votes yet",
                      "translate-from-known-language-text": "Translated from {{language}} by AI",
                      "translate-from-unknown-language-text": "Translated by AI",
                      "translate-to-text": "Translate to English",
                      "translation-disclaimer-text": "free search may not identify translated content.",
                      "trusted-reviews-by": "Trusted reviews by",
                      "trusted-reviews-by-text-aria": "Trusted reviews by Yotpo. Opens in a new window",
                      "try-again-text": "Try again",
                      "try-clearing-filters-text": "Try clearing or changing the filters",
                      "upload-button-text": "Upload",
                      "verified-buyer-text": "Verified Buyer",
                      "verified-reviewer-text": "Verified Reviewer",
                      "verified-user-badge-aria": "Verified user badge",
                      "video-media-type-aria": "Video:",
                      "video-of-customer": "Video of customer.",
                      "video-of-customer-with-info": "Video of review by {{description}} on {{review_date}} number {{number_element}}",
                      "view-background-color": "transparent",
                      "view-empty-button-color": "#2e4f7c",
                      "view-layout": "standardLayout",
                      "view-line-separator-style": "smooth",
                      "view-primary-color": "rgba(44,44,44,1)",
                      "view-primary-font": "Nunito Sans@400|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_400.css",
                      "view-secondary-font": "Nunito Sans@400|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_400.css",
                      "view-stars-color": "#E7721BFF",
                      "view-text-color": "#2c2c2c",
                      "view-widget-width": "100",
                      "white-label-enable": "true",
                      "widget-reviews-filter-by-country-enable": false,
                      "widget-reviews-filter-by-product-variants-enable": false,
                      "write-a-review-button-text": "Write A Review",
                      "yotpo-logo-aria": "Yotpo logo"
                    },
                    staticContent: {
                      "feature_bundle_reviews": "enabled",
                      "feature_crawlable_ai_snippet": "enabled",
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "disabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_multilingual_ai": "enabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "enabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "enabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "disabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_configuration": "",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_text": "Terms \u0026 Conditions",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_text": "I agree to the",
                      "feature_reviews_video_support_settings_ks": "djJ8MjY5ODQyMXw-LYKB_YqNBhm47QGmNSVXoPCgbOw5d9lspBlBaGov9qJlEEpEY-AZVDsoJ96uWiygZIwQG59Sx5_ln1KHvj7S",
                      "feature_reviews_video_support_settings_metadata_profile_id": "12618401",
                      "feature_reviews_video_support_settings_partner_id": "2698421",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_rich_snippet": "enabled",
                      "feature_terms_and_conditions": "disabled",
                      "feature_translation_cta": "disabled"
                    },
                    className: "ReviewsMainWidget",
                    dependencyGroupId: null
                },
            
            },
            guidStaticContent: {
                      "ugc": {
                        "feature_bundle_reviews": "enabled",
                        "feature_crawlable_ai_snippet": "enabled",
                        "feature_filter_by_country": "enabled",
                        "feature_media_gallery_add_to_cart": "disabled",
                        "feature_media_gallery_upload_photos": "enabled",
                        "feature_media_gallery_upload_videos": "enabled",
                        "feature_multilingual_ai": "enabled",
                        "feature_reviews_bottom_line_syndication": "disabled",
                        "feature_reviews_css_editor": "enabled",
                        "feature_reviews_custom_questions": "enabled",
                        "feature_reviews_disable_shopper_side_cookies": "disabled",
                        "feature_reviews_filter_by_media": "enabled",
                        "feature_reviews_filter_by_smart_topics": "enabled",
                        "feature_reviews_filter_by_star_rating": "enabled",
                        "feature_reviews_grouped_products": "enabled",
                        "feature_reviews_highly_rated_topics": "enabled",
                        "feature_reviews_incentivized_badge": "enabled",
                        "feature_reviews_media_gallery": "enabled",
                        "feature_reviews_ocean": "disabled",
                        "feature_reviews_order_metadata": "disabled",
                        "feature_reviews_photos_and_videos": "enabled",
                        "feature_reviews_product_variant": "disabled",
                        "feature_reviews_search": "enabled",
                        "feature_reviews_smart_sorting": "disabled",
                        "feature_reviews_sorting": "enabled",
                        "feature_reviews_star_distribution": "enabled",
                        "feature_reviews_summary": "enabled",
                        "feature_reviews_summary_filter": "enabled",
                        "feature_reviews_syndication": "enabled",
                        "feature_reviews_trusted_vendors": "disabled",
                        "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_configuration": "",
                        "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_text": "Terms \u0026 Conditions",
                        "feature_reviews_ugc_widgets_terms_and_conditions_settings_text": "I agree to the",
                        "feature_reviews_video_support_settings_ks": "djJ8MjY5ODQyMXxrFOMH3N2try_ImSUGOONBLKKjZqH5-kR3zoD4paKHqxGgcYo7QFgCPBr2v1B9VB4wUAkMblJdE7AObKxUGLAb",
                        "feature_reviews_video_support_settings_metadata_profile_id": "12618401",
                        "feature_reviews_video_support_settings_partner_id": "2698421",
                        "feature_reviews_white_label": "enabled",
                        "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                        "feature_rich_snippet": "enabled",
                        "feature_terms_and_conditions": "disabled",
                        "feature_translation_cta": "disabled"
                      }
                    },
            dependencyGroups: {}
        },
        initializer: "https://staticw2.yotpo.com/widget-assets/widgets-initializer/app.v0.9.8-7487.js",
        analytics: "https://staticw2.yotpo.com/widget-assets/yotpo-pixel/2026-05-19_07-47-44/bundle.js"
    }
    
    
    const initWidgets = function (config, initializeWidgets = true) {
        const widgetInitializer = yotpoWidgetsContainer['yotpo_widget_initializer'](config);
        return widgetInitializer.initWidgets(initializeWidgets);
    };
    const initWidget = function (config, instanceId, widgetPlaceHolder) {
        const widgetInitializer = yotpoWidgetsContainer['yotpo_widget_initializer'](config);
        if (widgetInitializer.initWidget) {
            return widgetInitializer.initWidget(instanceId, widgetPlaceHolder);
        }
        console.error("initWidget is not supported widgetInitializer");
    };
    const onInitializerLoad = function (config) {
        const prevInitWidgets = yotpoWidgetsContainer.initWidgets;
        yotpoWidgetsContainer.initWidgets = function (initializeWidgets = true) {
            if (prevInitWidgets) {
                if (typeof Promise !== 'undefined' && Promise.all) {
                    return Promise.all([prevInitWidgets(initializeWidgets), initWidgets(config, initializeWidgets)]);
                }
                console.warn('[deprecated] promise is not supported in initWidgets');
                prevInitWidgets(initializeWidgets);
            }
            return initWidgets(config, initializeWidgets);
        }
        const prevInitWidget = yotpoWidgetsContainer.initWidget;
        yotpoWidgetsContainer.initWidget = function (instanceId, widgetPlaceHolder) {
            if (prevInitWidget) {
              prevInitWidget(instanceId, widgetPlaceHolder)
            }
            return initWidget(config, instanceId, widgetPlaceHolder);
        }
        const guidWidgetContainer = getGuidWidgetsContainer();
        guidWidgetContainer.initWidgets = function () {
            return initWidgets(config);
        }
        guidWidgetContainer.initWidgets();
    };
    function getGuidWidgetsContainer () {
        if (!yotpoWidgetsContainer.guids) {
            yotpoWidgetsContainer.guids = {};
        }
        if (!yotpoWidgetsContainer.guids[guid]) {
            yotpoWidgetsContainer.guids[guid] = {};
        }
        return yotpoWidgetsContainer.guids[guid];
    }

    

    const guidWidgetContainer = getGuidWidgetsContainer();
    guidWidgetContainer.config = loader.config;
    if (!guidWidgetContainer.yotpo_widget_scripts_loaded) {
        guidWidgetContainer.yotpo_widget_scripts_loaded = true;
        guidWidgetContainer.onInitializerLoad = function () { onInitializerLoad(loader.config) };
        
        
        loader.loadDep(loader.analytics, function () {}, 'defer');
        
        
        
        loader.loadDep(loader.initializer, function () { guidWidgetContainer.onInitializerLoad() }, 'async');
        
    }
})()



yotpoWidgetsContainer.yotpoV3 = yotpoWidgetsContainer.yotpoV3 || {
    refreshWidgets: function () {
        if (typeof yotpoWidgetsContainer.initWidgets === 'function') {
            yotpoWidgetsContainer.initWidgets();
        }
        if (typeof yotpo !== 'undefined' && yotpo.v2YotpoLoaded) {
            yotpo.refreshWidgetsV2();
        }
    },
    initWidgets: function () {
        if (typeof yotpoWidgetsContainer.initWidgets === 'function') {
            yotpoWidgetsContainer.initWidgets(false);
        }
        if (typeof yotpo !== 'undefined' && yotpo.v2YotpoLoaded) {
            yotpo.initWidgetsV2();
        }
    },
    allowCookies: function () {
        yotpoWidgetsContainer.yotpoV3.v2Callbacks.push(() => yotpo.allowCookies());
    },
    performV3Logic: function () {
        if (!yotpoWidgetsContainer.yotpoV3.swap) {
            yotpo.refreshWidgetsV2 = yotpo.refreshWidgets;
            yotpo.refreshWidgets = yotpoWidgetsContainer.yotpoV3.refreshWidgets;
            yotpo.initWidgetsV2 = yotpo.initWidgets;
            yotpo.initWidgets = yotpoWidgetsContainer.yotpoV3.initWidgets;
            yotpoWidgetsContainer.yotpoV3.swap = true;
        }
    },
    v2Callbacks: [],
    v2YotpoLoaded: false,
    swap: false,
    analytics: true
};

var Yotpo = Yotpo || {};

Yotpo.API = Yotpo.API || (function () {
    function API(instance) {
        this.instance = instance;
    }

    API.prototype.refreshWidgets = function () {
        this.instance.refreshWidgets()
    }

    return API
})();


var yotpo = yotpo || yotpoWidgetsContainer.yotpoV3

if (yotpo.v2YotpoLoaded) {
    yotpoWidgetsContainer.yotpoV3.performV3Logic();
}


