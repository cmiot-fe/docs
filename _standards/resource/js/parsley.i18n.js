// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

 //Define then the messages
window.ParsleyConfig.i18n.zh_cn = jQuery.extend(window.ParsleyConfig.i18n.zh_cn || {}, {
  defaultMessage: "不正确的值",
  type: {
    email:        "请输入一个有效的电子邮箱地址",
    url:          "请输入一个有效的链接",
    number:       "请输入正确的数字",
    integer:      "请输入正确的整数",
    digits:       "请输入正确的号码",
    alphanum:     "请输入字母或数字"
  },
  notblank:       "请输入值",
  required:       "必填项",
  pattern:        "格式不正确",
  min:            "输入值请大于或等于 %s",
  max:            "输入值请小于或等于 %s",
  range:          "输入值应该在 %s 到 %s 之间",
  minlength:      "请输入至少 %s 个字符",
  maxlength:      "请输入至多 %s 个字符",
  length:         "字符长度应该在 %s 到 %s 之间",
  mincheck:       "请至少选择 %s 个选项",
  maxcheck:       "请选择不超过 %s 个选项",
  check:          "请选择 %s 到 %s 个选项",
  equalto:        "输入值不同"
});

//if ('zh_CN' === IOT.i18n || '' === IOT.i18n) {
//  Parsley.addMessages('zh-cn', {
//    defaultMessage: "不正确的值",
//    type: {
//      email:        "请输入一个有效的电子邮箱地址",
//      url:          "请输入一个有效的链接",
//      number:       "请输入正确的数字",
//      integer:      "请输入正确的整数",
//      digits:       "请输入正确的号码",
//      alphanum:     "请输入字母或数字"
//    },
//    notblank:       "请输入值",
//    required:       "必填项",
//    pattern:        "格式不正确",
//    min:            "输入值请大于或等于 %s",
//    max:            "输入值请小于或等于 %s",
//    range:          "输入值应该在 %s 到 %s 之间",
//    minlength:      "请输入至少 %s 个字符",
//    maxlength:      "请输入至多 %s 个字符",
//    length:         "字符长度应该在 %s 到 %s 之间",
//    mincheck:       "请至少选择 %s 个选项",
//    maxcheck:       "请选择不超过 %s 个选项",
//    check:          "请选择 %s 到 %s 个选项",
//    equalto:        "输入值不同"
//  });
//  Parsley.setLocale('zh-cn');
//} else if ('de_DE' === IOT.i18n) {
//  Parsley.addMessages('de', {
//    defaultMessage: "Die Eingabe scheint nicht korrekt zu sein.",
//    type: {
//      email:        "Die Eingabe muss eine gültige E-Mail-Adresse sein.",
//      url:          "Die Eingabe muss eine gültige URL sein.",
//      number:       "Die Eingabe muss eine Zahl sein.",
//      integer:      "Die Eingabe muss eine Zahl sein.",
//      digits:       "Die Eingabe darf nur Ziffern enthalten.",
//      alphanum:     "Die Eingabe muss alphanumerisch sein."
//    },
//    notblank:       "Die Eingabe darf nicht leer sein.",
//    required:       "Dies ist ein Pflichtfeld.",
//    pattern:        "Die Eingabe scheint ungültig zu sein.",
//    min:            "Die Eingabe muss größer oder gleich %s sein.",
//    max:            "Die Eingabe muss kleiner oder gleich %s sein.",
//    range:          "Die Eingabe muss zwischen %s und %s liegen.",
//    minlength:      "Die Eingabe ist zu kurz. Es müssen mindestens %s Zeichen eingegeben werden.",
//    maxlength:      "Die Eingabe ist zu lang. Es dürfen höchstens %s Zeichen eingegeben werden.",
//    length:         "Die Länge der Eingabe ist ungültig. Es müssen zwischen %s und %s Zeichen eingegeben werden.",
//    mincheck:       "Wählen Sie mindestens %s Angaben aus.",
//    maxcheck:       "Wählen Sie maximal %s Angaben aus.",
//    check:          "Wählen Sie zwischen %s und %s Angaben.",
//    equalto:        "Dieses Feld muss dem anderen entsprechen."
//  });
//  Parsley.setLocale('de');
//} else if ('ru_RU' === IOT.i18n) {
//  Parsley.addMessages('ru', {
//    defaultMessage: "Некорректное значение.",
//    type: {
//      email:        "Введите адрес электронной почты.",
//      url:          "Введите URL адрес.",
//      number:       "Введите число.",
//      integer:      "Введите целое число.",
//      digits:       "Введите только цифры.",
//      alphanum:     "Введите буквенно-цифровое значение."
//    },
//    notblank:       "Это поле должно быть заполнено.",
//    required:       "Обязательное поле.",
//    pattern:        "Это значение некорректно.",
//    min:            "Это значение должно быть не менее чем %s.",
//    max:            "Это значение должно быть не более чем %s.",
//    range:          "Это значение должно быть от %s до %s.",
//    minlength:      "Это значение должно содержать не менее %s символов.",
//    maxlength:      "Это значение должно содержать не более %s символов.",
//    length:         "Это значение должно содержать от %s до %s символов.",
//    mincheck:       "Выберите не менее %s значений.",
//    maxcheck:       "Выберите не более %s значений.",
//    check:          "Выберите от %s до %s значений.",
//    equalto:        "Это значение должно совпадать."
//  });
//  Parsley.setLocale('ru');
//} else {
//  Parsley.addMessages('en', {
//    defaultMessage: "This value seems to be invalid.",
//    type: {
//      email:        "This value should be a valid email.",
//      url:          "This value should be a valid url.",
//      number:       "This value should be a valid number.",
//      integer:      "This value should be a valid integer.",
//      digits:       "This value should be digits.",
//      alphanum:     "This value should be alphanumeric."
//    },
//    notblank:       "This value should not be blank.",
//    required:       "This value is required.",
//    pattern:        "This value seems to be invalid.",
//    min:            "This value should be greater than or equal to %s.",
//    max:            "This value should be lower than or equal to %s.",
//    range:          "This value should be between %s and %s.",
//    minlength:      "This value is too short. It should have %s characters or more.",
//    maxlength:      "This value is too long. It should have %s characters or fewer.",
//    length:         "This value length is invalid. It should be between %s and %s characters long.",
//    mincheck:       "You must select at least %s choices.",
//    maxcheck:       "You must select %s choices or fewer.",
//    check:          "You must select between %s and %s choices.",
//    equalto:        "This value should be the same."
//  });
//  Parsley.setLocale('en');
//}

// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('zh_cn', window.ParsleyConfig.i18n.zh_cn, true);

