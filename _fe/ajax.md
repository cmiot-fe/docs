---
  layout: fe
  title: 异步提交模块
---

## IOT.post

使用IOT.post静态方法发起一次异步提交。

IOT.post是公共函数，默认已经打包到公用js文件里，无需单独引入


## 与$.post的差异

IOT.post与$.post的参数一样，但是对于callback，如果提交不成功，$.post会调用fail方法的callback，而IOT.post依然会调用本身的callback，此时传递给callback的参数为false，详见下面例子

### 防止重复提交

为了防止重复提交，我们

> 使用IOT.addLoading(`按钮对应的jqueryDom`, `提交状态时按钮的文字`, `提交状态时按钮类名`)来标记正在提交的状态，

> 使用IOT.removeLoading(`按钮对应的jqueryDom`, `正常状态时按钮的文字`)来取消提交状态，

> 使用IOT.isLoading(`按钮对应的jqueryDom`)来判断提交状态


## 使用方法



    var $postForm = dialog.$root.find('form'); //需要提交的表单
    var $submitButton = $postForm.find('.j_submit'); //提交按钮
    $postForm.submit(function(e){
        e.preventDefault();
        //使用IOT.button.isLoading方法判断此按钮对应的表单是否正在提交中
        if(IOT.button.isLoading($submitButton) || !$postForm.isValid()){
            return;
        }
        //使用IOT.button.addLoading标记此按钮正在提交中
        IOT.button.addLoading($submitButton, '提交中', 'loading');
        IOT.post('/driver/create', $postForm.serialize(), function(res){
            //如果res === false 则代表网络错误或者服务器返回格式不正确
            if(res === false){
                //使用IOT.button.removeLoading标记此按钮恢复正常状态
                IOT.button.removeLoading($submitButton, '确定');
                return;
            }
            if(res.code == 0){ //添加成功
                IOT.tips('添加成功', 'success', '2000');
            }else{
                IOT.showPostError(res.msg); //显示错误信息。res.msg可能是字符串也可能是类似{password: "'密码' 不能为空"}的object。showPostError都可以处理这些错误信息并可以做到前后端统一验证
                IOT.button.removeLoading($submitButton, '确定');
            }
        }, 'json');
    });
    $.validate({
        form: $postForm
    });




运行效果如下：

<button onclick="submitDemo();" class="button j_submit">提交</button>

<script>
        function submitDemo(){
            var $button = $('.j_submit')
            IOT.button.addLoading($button, '提交中', 'loading');
            setTimeout(function(){
                IOT.tips('提交成功', 'success', '2000');
                IOT.button.removeLoading($button, '提交');
            }, 1500);
        }
</script>