(function($) {
    $.fn.shareIt = function(options) {
        var my_domain = "apkjani.blogspot.com";
        if (location.hostname == my_domain) {
            // This is the easiest way to have default options.
            var HTMLtoHide = false;
            var rand = Math.floor((Math.random() * 1000) + 1);
            var settings = $.extend({
                // These are the defaults.
                title: "Share or Like to Download",
                id: Math.floor((Math.random() * 1000) + 1),
                text: 'Choose Any Social Social Network from below to share our content and Download it.',
                mymsg: 'Pesan apapun di bawah ini',
                buttons: ["facebook_like", "facebook_share", "twitter_follow", "twitter_tweet", "googleplus", "linkedin"],
                linkedIn: {
                    url: window.location.href
                },
                facebook: {
                    appId: 104365329655649,
                    pageId: 'https://www.facebook.com/andrjani',
                    url: window.location.href
                },
                twitter: {
                    via: 'a9wanett',
                    url: window.location.href,
                    text: document.title
                },
                googleplus: {
                    apikey: 'AIzaSyBwLTIBvcbkv0kGxtNwhKnUGCNh4tMARsk',
                    url: window.location.href
                },
                count: {
                    twitter: {
                        tweets: 0,
                        follower: rand
                    },
                    facebook: {
                        likes: 0,
                        share: 0
                    },
                    googleplus: {
                        circledByCount: 0
                    },
                    linkedIn: {
                        shares: 0
                    }
                },
                timeout: 0,
                close: false,
                cookie: true,
                cookieExpiry: 30,
            }, options);
            this.settings = settings;
            // Highlight the collection based on the settings variable.
            this.each(function() {
                if (getCookie("vlocker_shareIt_hide_" + settings.id) == "true") {
                    document.write(unescape($(this).html()));
                    return false
                };
                var elem = $(this);
                var con = "<div class='panel panel-danger' id=vlocker_shareit_container_" + settings.id + ">" +
                    "<div class='panel-heading'>" +
                    "<h3 class='panel-title'>" + settings.title + "</h3>" +
                    "</div>" +
                    "<div class='panel-body'>" +
                    "<center><p>" + settings.text + "</p></center>" +
                    "<div class='vlocker_shareit_buttons' id=vlocker_shareit_content_" + settings.id + ">" +
                    "<div class='vlocker_twitter_tweet vlocker_margin_top' id=vlocker_twitter_tweet_" + settings.id + "><a href='https://twitter.com/intent/tweet?via=" + settings.twitter.via + "&text=" + encodeURIComponent(settings.twitter.text) + "&url=" + encodeURIComponent(settings.twitter.url) + "' class='btn btn-info' data-service='twitter-tweets'><span class='vlocker_shareit_button_title'>Tweet</span><div class=vlocker_shareit_button_count><i>0</i></div></a></div>" +
                    "<div class='vlocker_twitter_follow vlocker_margin_top' id=vlocker_twitter_follow_" + settings.id + "><a href='https://twitter.com/intent/follow?screen_name=" + settings.twitter.via + "' class='btn btn-info' data-service='twitter-followers'><span class='vlocker_shareit_button_title'>Follow</span><div class=vlocker_shareit_button_count><i>" + settings.count.twitter.follower + "</i></div></a></div>" +
                    "<div class='vlocker_facebook_share vlocker_margin_top' id=vlocker_facebook_share_" + settings.id + "><a class='btn btn-primary' data-service='facebook_share'><span class='vlocker_shareit_button_title'>Share</span><div class=vlocker_shareit_button_count><i>0</i></div></a></div>" +
                    "<div class='vlocker_facebook_like vlocker_margin_top' id=vlocker_facebook_like_" + settings.id + "><a href='" + settings.facebook.pageId + "' class='btn btn-primary' data-service='facebook_like'><span class='vlocker_shareit_button_title'>Like</span><div class=vlocker_shareit_button_count><i>0</i></div></a></div>" +
                    "<div class='vlocker_googleplus vlocker_margin_top' id=vlocker_googleplus_" + settings.id + "><a href='javascript:void(0);' class='btn btn-danger' data-service='googleplus'><span class='vlocker_shareit_button_title'>Follow</span><div class=vlocker_shareit_button_count><i>0</i></div></a></div>" +
                    "<div class='vlocker_linkedin vlocker_margin_top' id=vlocker_linkedin_" + settings.id + "><a href='javascript:void(0);' class='btn btn-warning' data-service='linkedin'><span class='vlocker_shareit_button_title'>Share</span><div class=vlocker_shareit_button_count><i>0</i></div></a></div>" +
                    "</div>" +
                    "<p id=\"vlocker_shareit_msg_" + settings.id + "\" class='vlock_my_msg'></p>" +
                    "</div></div>";
                HTMLtoHide = elem.html();
                elem.html(con);
                elem.fadeIn();
                showButtons();
                getCount();
                initContainer();
                $("#vlocker_shareit_msg_" + settings.id).html(settings.mymsg);
                if (settings.timeout != 0) {
                    setTimeout(function() {
                        showContent("timeout", "Content Shown", window.location.href);
                    }, settings.timeout);
                }
            });

            this.angry = angry;
            this.getID = function() {
                return settings.id
            }
            this.showContent = function(s, v) {
                showContent(s, v)
            }
            this.trackvlockerGoogle = function(data) {
                if (data.state == "on") {
                    //User +1 your content
                    //Show your Hidden Content
                    showContent("Google", "Plusone", settings.googleplus.url);
                } else {
                    //User had -1 your content
                    //Do your Stuffs
                    angry();
                }
            }
            var $this = this;

            function convertNumber(n) {
                if (n >= 1000000000) return (n / 1000000000).toFixed(1) + 'G';
                if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
                if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
                return n;
            }

            function setCookie(name, value, expirydays) {
                var d = new Date();
                d.setTime(d.getTime() + (expirydays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = name + "=" + value + "; " + expires;
            }

            function getCookie(name) {
                name = name + "=";
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    while (cookie.charAt(0) == ' ') {
                        cookie = cookie.substring(1);
                    }
                    if (cookie.indexOf(name) == 0) {
                        return cookie.substring(name.length, cookie.length);
                    }
                }
                return "";
            }

            function initContainer() {
                var $this = this;
                $(window).resize(centerContainer);
                centerContainer();
                if ($this.timeout > 0 && typeof timeout != "undefined") {
                    setTimeout(function() {
                        $this.showContent("Timeout", "Hide", window.location.href);
                    }, $this.timeout);
                }
                if ($this.close === true && typeof $this.close != "undefined") {
                    $("#vlocker_shareit_container_" + settings.id).find(".panel-body").prepend("<a onclick='javascript: vlocker_shareit_container_" + settings.id + "();' class='vlocker_close'>&times;</a>");
                }
            }

            function centerContainer() {
                var container = $("#vlocker_shareit_container_" + settings.id),
                    self = container.find('.panel-body'),
                    width = self.innerWidth(),
                    cwidth = container.width(),
                    height = self.innerHeight(),
                    cheight = container.height();
                self.css('left', (cwidth - width) / 2).css('top', (cheight - height) / 2);
            }

            function trackShareItGooglePlus(data) {
                if (data.state == "on") {
                    $this.showContent("G+", "+1", $this.settings.googleplus.url);
                } else {
                    $this.angry();
                }
            }

            function closeShareIt() {
                $this.showContent("Close", "Hidden", window.location.href);
            }

            function trackShareItLinkedIn() {
                $this.showContent("LinkedIn", "Share", $this.settings.linkedIn.url);
            }
            eval("window.vlocker_shareit_linkedin_" + rand + "=trackShareItLinkedIn");
            eval("window.vlocker_shareit_googleplus_" + rand + "=trackShareItGooglePlus");
            eval("window.vlocker_shareit_close_" + rand + "=closeShareIt");

            function getCount() {
                $.getJSON('http://cdn.api.twitter.com/1/urls/count.json?url=' + settings.twitter.url + '&callback=?', function(d) {
                    settings.count.twitter.tweets = d.count;
                    $("#vlocker_twitter_tweet_" + settings.id).find(".vlocker_shareit_button_count i").text(convertNumber(settings.count.twitter.tweets));
                });
                $.getJSON('https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=' + settings.twitter.via + '&callback=?', function(d) {
                    settings.count.twitter.follower = d[0]['followers_count'];
                    $("#vlocker_twitter_follow_" + settings.id).find(".vlocker_shareit_button_count i").text(convertNumber(settings.count.twitter.follower));
                });
                $.getJSON('https://api.facebook.com/method/fql.query?format=json&query=SELECT+total_count+FROM+link_stat+WHERE+url+%3D+%27' + encodeURIComponent(settings.facebook.url) + '%27&callback=?', function(d) {
                    settings.count.facebook.share = d[0].total_count;
                    $("#vlocker_facebook_share_" + settings.id).find(".vlocker_shareit_button_count i").text(convertNumber(settings.count.facebook.share));
                });
                $.getJSON('https://api.facebook.com/method/fql.query?format=json&query=SELECT+like_count+FROM+link_stat+WHERE+url+%3D+%27' + encodeURIComponent(settings.facebook.pageId) + '%27&callback=?', function(d) {
                    settings.count.facebook.likes = d[0].like_count;
                    $("#vlocker_facebook_like_" + settings.id).find(".vlocker_shareit_button_count i").text(convertNumber(settings.count.facebook.likes));
                });
                $.getJSON("https://www.linkedin.com/countserv/count/share?url=" + settings.linkedIn.url + "&format=jsonp&callback=?", function(data) {
                    settings.count.linkedIn.shares = data.count;
                    $("#vlocker_linkedin_" + settings.id).find(".vlocker_shareit_button_count i").text(convertNumber(settings.count.linkedIn.shares));
                });
                var GooglePlusdata = {
                    "method": "pos.plusones.get",
                    "id": settings.googleplus.url,
                    "params": {
                        "nolog": true,
                        "id": settings.googleplus.url,
                        "source": "widget",
                        "userId": "@viewer",
                        "groupId": "@self"
                    },
                    "jsonrpc": "2.0",
                    "key": "p",
                    "apiVersion": "v1"
                };
                $.ajax({
                    type: "POST",
                    url: "https://clients6.google.com/rpc",
                    processData: true,
                    contentType: 'application/json',
                    cache: true,
                    data: JSON.stringify(GooglePlusdata),
                    success: function(r) {
                        settings.count.googleplus.circledByCount = r.result.metadata.globalCounts.count;
                        $("#vlocker_googleplus_" + settings.id).find(".vlocker_shareit_button_count i").text(convertNumber(settings.count.googleplus.circledByCount));
                    }

                });
            }

            function showButtons() {
                for (var i = 0; i < settings.buttons.length; i++) {
                    $("#vlocker_" + settings.buttons[i] + "_" + settings.id).show();
                    switch (settings.buttons[i]) {
                        case "facebook_like":
                        case "facebook_share":
                            checkFB();
                            break;
                        case "twiter_follow":
                        case "twitter_tweet":
                            checkTwitter();
                            break;
                        case "googleplus":
                            checkGP();
                            break;
                        case "linkedin":
                            loadIN();
                            break;
                    }
                }
            }

            function loadIN() {
                addIN();
                if (typeof(IN) != 'undefined') {
                    IN.parse();
                } else {
                    $.getScript("http://platform.linkedin.com/in.js");
                }
            }

            function addIN() {
                $("#vlocker_linkedin_" + settings.id).find(".vlocker_shareit_button_title").html("<script type=\"IN/Share\" data-url=\"" + settings.linkedIn.url + "\"  data-onSuccess=\"vlocker_shareit_linkedin_" + rand + "\" data-onsuccess=\"vlocker_shareit_linkedin_" + rand + "\" data-success=\"vlocker_shareit_linkedin_" + rand + "\"><\/script>");
            }
            var LinkedInShare = function() {
                showContent("LinkedIn", "Share", settings.linkedIn.url);
            }

            function checkFB() {
                $("#vlocker_facebook_like_" + settings.id).find(".vlocker_shareit_button_title").html("<div class=\"fb-like\" data-href=\"" + settings.facebook.pageId + "\" data-layout=\"button\" data-action=\"like\" data-show-faces=\"false\" data-width=\"50px\" data-share=\"false\"></div>");

                if (typeof FB == "undefined") {
                    var intw = setInterval(function() {
                        loadFB();
                        if (typeof FB != "undefined") {
                            clearInterval(intw);
                        }
                    }, 5000);
                } else {
                    trackFB();
                }
            }

            function trackFB() {
                if ($("#vlocker_facebook_share_" + settings.id).length > 0) {
                    $("#vlocker_facebook_share_" + settings.id).click(function() {
                        FB.ui({
                                method: 'share',
                                href: settings.facebook.url,
                            },
                            // callback
                            function(response) {
                                if (response && !response.error_code) {
                                    showContent("Facebook", "Share", settings.facebook.url);
                                }
                            }
                        );
                    });
                }

                FB.XFBML.parse();
                FB.Event.subscribe('edge.create',
                    function(response) {
                        showContent("Facebook", "Like", settings.facebook.pageId);
                    }
                );

                FB.Event.subscribe('edge.remove',
                    function(response) {
                        angry();
                    }
                );


            }

            function loadGP() {
                $.getScript('https://apis.google.com/js/platform.js', function() {
                    trackGP();
                });
            }

            function checkGP() {
                if (typeof gapi == "undefined") {
                    var intw = setInterval(function() {
                        loadGP();
                        if (typeof gapi != "undefined") {
                            clearInterval(intw);
                        }
                    }, 5000);
                } else {
                    trackGP();
                }
            }

            function trackGP() {
                $("#vlocker_googleplus_" + settings.id).find('.vlocker_shareit_button_title').html("<g:plusone></g:plusone>");
                gapi.plusone.render($("#vlocker_googleplus_" + settings.id).find('.vlocker_shareit_button_title').get(0), {
                    "href": settings.googleplus.url,
                    "annotation": "none",
                    "callback": "vlocker_shareit_googleplus_" + rand,
                    "width": "100"
                });
            }
            var ajaxFB = false;

            function loadFB() {
                if (!ajaxFB) {
                    $.ajaxSetup({
                        cache: true
                    });
                    $.getScript('http://connect.facebook.net/en_US/all.js', function() {
                        FB.init({
                            appId: settings.facebook.appId,
                            version: 'v2.3', // or v2.0, v2.1, v2.0
                        });
                        trackFB();

                    });

                    ajaxFB = true;
                }
            }

            function checkTwitter() {
                if (typeof window.twttr == "undefined") {
                    var inter = setInterval(function() {
                        loadTwitter();
                        if (typeof window.twttr != "undefined") {
                            twttr.ready(function(twttr) {
                                twttr.widgets.load();
                                trackTwitter();
                                clearInterval(inter);
                            });
                        }
                    }, 2000);
                }
            }

            function loadTwitter() {
                // First, load the widgets.js file asynchronously
                $.getScript('http://platform.twitter.com/widgets.js');
            }

            function trackTwitter() {
                // Wait for the asynchronous resources to load
                twttr.ready(function(twttr) {
                    // Now bind our custom intent events
                    twttr.events.bind('tweet', function() {
                        showContent("Twitter", "Tweet", settings.twitter.url)
                    });
                    twttr.events.bind('follow', function() {
                        showContent("Twitter", "Follow", settings.twitter.via)
                    });
                });
            }

            function showContent(service, action, url) {
                if (typeof(_gaq) !== "undefined") {
                    _gaq.push(['_trackSocial', service, action, url]);
                    console.log("Pushed : " + url)
                }
                var ss = $("#vlocker_shareit_container_" + settings.id);
                var pr = ss.parent();
                ss.fadeOut(1000, function() {
                    $(".lock").html(unescape(HTMLtoHide)).fadeIn();
                    if (settings.cookie == true) setCookie("vlocker_shareIt_hide_" + settings.id, "true", settings.cookieExpiry);
                });
            }

            function angry() {
                $("#vlocker_shareit_msg_" + settings.id).html("You don't like Us?").addClass('error');
            }
            return this;
        } else {
            console.log("[ERROR] vLock Blogger Plugin Invalid");
        }
    }
})(jQuery);
