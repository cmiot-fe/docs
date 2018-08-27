<div class="show-pager" data_page="1" data_show_size="false" data_total="800" data_page_url="/textpage?page=#page#" data_page_size="6"></div>
<script>
    var page = new Pager('.show-pager', {
        align:'left',
        page_url: '/aaaaa?page=#page#',
        total: 200,
        page_size: 5
    }, function(page){
        console.log(page);
        this.aja
        return {total: 300};
    });
</script>