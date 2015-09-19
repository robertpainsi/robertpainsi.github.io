/**
 * main.js
 */
function main() {
    $('.code').each(function() {
        var $this = $(this);
        var lineNumber = 1;

        var prettified = prettyPrintOne($this.html(), 'js', true);
        var $content = $('<div></div>');
        $(prettified).find('li').each(function() {
            var $li = $(this);
            var $line = $('<div class="line">' +
                '<div class="line-number">' + lineNumber + '</div>' +
                '<div class="line-code">' + $li.html() + '</div>' +
                '</div>');
            $content.append($line);
            lineNumber++;
        });

        $this.html($content.html());
    }).addClass('done');

    $(function() {
        var $tooltip = $('#tooltip');
        var fixed;
        $tooltip.find('.tab.diff').addClass('active');
        $('.tooltip').mouseover(function() {
            if (fixed) {
                clearTimeout(fixed);
            }
            var $this = $(this);
            console.log($this);
            var position = $this.position();
            $tooltip.css({
                left: position.left,
                top: position.top + $this.height()
            });
            var hash = $this.attr('data-hash');
            var $commitContent = $('.commit.' + hash);

            $tooltip.find('.tab.diff.content').html($commitContent.find('.d').html());
            $tooltip.find('.tab.code.content').html($commitContent.find('.c').html());
            $tooltip.show();
        }).mouseleave(function(event) {
            event.stopImmediatePropagation();
            fixed = setTimeout(function() {
                $tooltip.hide();
            }, 250);
            $tooltip.hover(
                function() {
                    clearTimeout(fixed);
                },
                function() {
                    $tooltip.hide();
                }
            );
        });

        var $tooltipTabs = $tooltip.find('a.tab');
        $tooltipTabs.click(function(event) {
            event.preventDefault();
            var $this = $(this);
            $tooltip.find('.tab').removeClass('active');
            $this.addClass('active');
            $tooltip.find($this.attr('href')).addClass('active');
        });
    })
}
