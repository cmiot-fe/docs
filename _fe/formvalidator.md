---
  layout: fe
  title: 表单验证组件
---

## 表单验证组件

我们使用formvalidator作为表单验证组件，[官方网站](http://formvalidator.net)

formvalidator已经打包到公用js文件里，无需单独引入


## 使用步骤

1.为需要验证的表单项添加data-validation，如

邮箱：&lt;input data-validation="email" type="text">

2.添加相应的js

    $.validate({
        form : $('.test-form')
    });

    $('.test-form').submit(function(e){
        e.preventDefault();
        if($('form').isValid()){
            alert('验证成功');
        }else{
            alert('验证失败');
        }
    });

    //显示密码强度,参考demo里的密码项
    $('#ps').displayPasswordStrength();


### 表单验证DEMO

<form class="form-horizontal well test-form has-validation-callback" _lpchecked="1">
    <div class="control-group">
        <label class="control-label">邮箱</label>
        <div class="controls">
            <input name="email" type="text" data-validation="email">
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">长度3-12个字符之间</label>

        <div class="controls">
            <input name="username" type="text" data-validation="length" data-validation-length="3-12" data-validation-error-msg="必须在 3-12 个字符之间">
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">至少3个字符</label>

        <div class="controls">
            <input name="username" type="text" data-validation="length" data-validation-length="min3" >
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">最多3个字符</label>

        <div class="controls">
            <input name="username" type="text" data-validation="length" data-validation-length="max3" >
        </div>
    </div>

    <div class="control-group">
        <label class="control-label">必填</label>

        <div class="controls">
            <input name="username" type="text" data-validation="required">
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">URL</label>

        <div class="controls">
            <input name="username" type="text" data-validation="url length" data-validation-length="max20">
        </div>
    </div>


    <div class="control-group">
        <label class="control-label">密码(可通过data-validation-strength设置密码强度，一般密码强度为2，强度算法请参考源代码)</label>

        <div class="controls">
            <input  id="ps" type="password" name="pass_confirmation" data-validation="strength" data-validation-strength="2" >
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">确认密码(data-validation="confirmation"会去寻找name为"本表单的name_confirmation"的表单进行比对)</label>

        <div class="controls">
            <input type="password" name="pass" data-validation="confirmation" data-validation-error-msg="两次密码不一致">
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">出生日期(格式为dddd-mm-dd)</label>

        <div class="controls">
            <input type="text" data-validation="date">
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">整数(可通过data-validation-allowing="range[1;100]"设置整数范围)</label>

        <div class="controls">
            <input type="text" data-validation="number" data-validation-allowing="range[1;100]" data-validation-error-msg="请输入1-100之间的整数" class="has-help-txt">
        </div>
    </div>
    <div class="control-group">
        <label class="control-label">
        </label>

        <div class="controls">
            <label>
            <input type="checkbox" name="check" value="1" data-validation="required" data-validation-error-msg="请勾选同意" style="vertical-align: 1px; margin-right: 3px">
            我同意 <strong>给我涨工资</strong></label>
        </div>
    </div>
    <div class="control-group">
        <div class="controls">
            <button type="submit" class="button">验证</button>
        </div>
    </div>
</form>

<script>
    window.onload = function(){
        $.validate({
                form : $('.test-form')
        });
        $('.test-form').submit(function(e){
            e.preventDefault();
            if($('form').isValid()){
                alert('验证成功');
            }else{
                alert('验证失败');
            }
        })
        $('#ps').displayPasswordStrength()
    }
</script>