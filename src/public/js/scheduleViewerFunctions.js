function createPopover (element) {
    element = $(element);

    let html_encode = (value) => {
        return $("<div/>").text(value).html();
    };

    let coursenum = html_encode(element.data('coursenum'));
    let fos = html_encode(element.data('fos'));
    let prof = html_encode(element.data('prof'));
    let crns = element.data('crns');
    let coursetitle = html_encode(element.data('coursetitle'));
    let html = '<p> ' + fos + ' ' + coursenum + ' with CRN: ' + crns + '</p><p>Professor: ' + prof + '</p>';
    if (element.data('prereg') == "1") {
        html = html + "<p>You have already registered for this course</p>";
    }
    let options = {placement: 'bottom', container: "body", trigger: 'manual', html: true, title: coursetitle};
    element.data('content', html).popover(options);
}

$('table')
    .on('mouseenter', 'td.has-data', (e) => {
        let td = $(e.target);
        setTimeout(() => {
            td.popover('show');
        }, 200);
    })
    .on('mouseleave', 'td.has-data', (e) => {
        let td = $(e.target);
        setTimeout(() => {
            if (!$(".popover:hover").length) {
                $(td).popover('hide');
            }
        }, 200);
    });

$('td.has-data').toArray().forEach(createPopover);

$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip();

    $(document).on('mouseleave', ".popover", (e) => {
        setTimeout(() => {
            if (!$(".popover:hover").length) {
                $(e.target).closest(".popover").remove();
            }
        }, 300);
    });
});