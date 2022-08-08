$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this);
        $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }

    };

    var accordion = new Accordion($('#accordion'), false);
});

function create_ids() {

    $.ajax({
        type: 'GET',
        url: '/PhoneBook/Search',
        data: {
            search_field: $('#search_paramters').val(),
            csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
        },
        success: function (data) {
            $("#grid-containter").empty();
            result = '';
            for (var p in data) {
                if (data.hasOwnProperty(p)) {

                    result = data[p]["full_heb_name"] + "  " + data[p]["cell_num"] + "  " + data[p]["mail"] + "  " + data[p]["manager_name"] + "  " + data[p]["phone"] + "  " + data[p]["stage1"] + "  " + data[p]["stage2"] + "  " + data[p]["stage4"] + "  " + data[p]["position"] + "  ";
                    result = result.replace('NaN', '');
                    result = result.replace('null', '');

                    $("#grid-containter").append(" <div class=\"container2\">" +
                        "                                <div class=\"card\" onclick='flipPar1(this)' ondblclick=\"flipPar(this)\">" +
                        "                                    <div class=\"front\">" +
                        "                                       <img style=\"height:80px;width:80px;\" src=\"static/assets/images/profiles/" +
                        data[p]["worker_id"] + ".jpg\" onerror='imgError(this)'/>" +
                        "                                        <h2>" + data[p]["full_heb_name"] + "</h2></div>" +
                        "                                    <div class=\"back\">" +
                        "                                        <div class=\"content\">" +
                        "                                            <h3 class=\"cardTitle\"></h3>" +
                        "                                           <p>מייל:  <a href='mailto:" + data[p]["mail"] + "'> " + data[p]["mail"] + "</a></p>" +
                        "                                            <p>נייד:  <a href='tel:" + data[p]["cell_num"] + "'> " + data[p]["cell_num"] + "</a></p>" +
                        "                                            <p>טל':  <a href='tel:" + data[p]["phone"] + "'> " + data[p]["phone"] + "</a></p>" +
                        "                                            <p>מנהל: <a onclick='searc_par(this)'> " + data[p]["manager_name"] + "</a></p>" +
                        "                                            <p>מטה: " + data[p]["stage2"] + "</p>" +
                        "                                            <p>תפקיד: " + data[p]["position"] + "</p>" +
                        "                                        </div>" +
                        "                                    </div>" +
                        "                                </div>" +
                        "                            </div>");


                }

            }

            pag_disp();
        }

    });

}

$('#search_paramters').on("change paste keyup", function () {
    create_ids();
});

function flipPar1(obj) {
    $(obj).addClass('flipped');
}


function flipPar(obj) {
    $(obj).toggleClass('flipped');
}

function searc_par(obj) {
    $("#search_paramters").val($(obj).text());
    create_ids();
}

function pag_disp() {
    (function ($) {
        var pagify = {
            items: {},
            container: null,
            totalPages: 1,
            perPage: 3,
            currentPage: 0,
            createNavigation: function () {
                this.totalPages = Math.ceil(this.items.length / this.perPage);

                $('.pagination', this.container.parent()).remove();
                var pagination;
                if (this.currentPage < 2) {
                    pagination = $('<div class="pagination"></div>').append('<a class="nav prev disabled" data-next="false"><</a>');
                }
                else
                    pagination = $('<div class="pagination"></div>').append('<a class="nav prev" data-next="false"><</a>');
                var i = 0;
                var g = 0;
                if (this.currentPage < 2) {
                    i = 0
                }
                else
                    i = this.currentPage - 2;

                for (; i < this.totalPages; i++) {
                    var pageElClass = "page";

                    if (i === this.currentPage)
                        pageElClass = "page current";
                    var pageEl = '<a class="' + pageElClass + '" data-page="' + (
                        i + 1) + '">' + (
                        i + 1) + "</a>";

                    if (i < this.currentPage + 2 || i > this.totalPages - 4)
                        pagination.append(pageEl);
                    else {

                        if (this.totalPages > 10 && g < 3) {
                            g++;
                            pagination.append(".");
                        }

                    }
                }
                pagination.append('<a class="nav next" data-next="true">></a>');

                this.container.after(pagination);

                var that = this;
                $("body").off("click", ".nav");
                this.navigator = $("body").on("click", ".nav", function () {
                    var el = $(this);
                    that.navigate(el.data("next"));
                });

                $("body").off("click", ".page");
                this.pageNavigator = $("body").on("click", ".page", function () {
                    var el = $(this);
                    that.goToPage(el.data("page"));
                });
            },
            navigate: function (next) {
                // default perPage to 5
                if (isNaN(next) || next === undefined) {
                    next = true;
                }
                $(".pagination .nav").removeClass("disabled");
                if (next) {
                    this.currentPage++;
                    if (this.currentPage > (this.totalPages - 1))
                        this.currentPage = (this.totalPages - 1);
                    if (this.currentPage == (this.totalPages - 1))
                        $(".pagination .nav.next").addClass("disabled");
                }
                else {
                    this.currentPage--;
                    if (this.currentPage < 0)
                        this.currentPage = 0;
                    if (this.currentPage == 0)
                        $(".pagination .nav.prev").addClass("disabled");
                }

                this.showItems();
                this.createNavigation();
            },
            updateNavigation: function () {

                var pages = $(".pagination .page");
                pages.removeClass("current");
                $('.pagination .page[data-page="' + (
                    this.currentPage + 1) + '"]').addClass("current");
            },
            goToPage: function (page) {

                this.currentPage = page - 1;

                $(".pagination .nav").removeClass("disabled");
                if (this.currentPage == (this.totalPages - 1))
                    $(".pagination .nav.next").addClass("disabled");

                if (this.currentPage == 0)
                    $(".pagination .nav.prev").addClass("disabled");
                this.showItems();

                this.createNavigation();
            },
            showItems: function () {
                this.items.hide();
                var base = this.perPage * this.currentPage;
                this.items.slice(base, base + this.perPage).show();

                this.updateNavigation();
            },
            init: function (container, items, perPage) {
                this.container = container;
                this.currentPage = 0;
                this.totalPages = 1;
                this.perPage = perPage;
                this.items = items;
                this.createNavigation();
                this.showItems();
            }
        };

        // stuff it all into a jQuery method!
        $.fn.pagify = function (perPage, itemSelector) {
            var el = $(this);
            var items = $(itemSelector, el);

            // default perPage to 5
            if (isNaN(perPage) || perPage === undefined) {
                perPage = 3;
            }

            // don't fire if fewer items than perPage
            if (items.length <= perPage) {
                $(".pagination").remove();
                return true;
            }

            pagify.init(el, items, perPage);
        };
    })(jQuery);
    $(".containerMain").pagify(12, ".container2");
}

function imgError(image) {
    image.onerror = "";
    image.src = "/static/assets/images/avatar2.png";
    $(image).addClass('cardimgerror');
    return true;
}

$(document).ready(function () {
    create_ids();
});