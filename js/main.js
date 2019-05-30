$(function() {
  $("#datepicker").datepicker().datepicker("setDate", "today");
  enc_barcode();
});

var calc_checkdigit = function(data) {
  var sum = 0;
  for (i = 0; i < data.length; i++) {
    sum += data[data.length - i - 1] * Math.pow(3, (i + 1) % 2);
  }

  return (10 - sum % 10) % 10;
}

var enc_barcode = function() {
  var form = document.forms.info;
  var date = new Date(form.date.value);
  var cat  = form.cat.value;
  var bid  = form.bid.value;

  var calc_date00 = function(date) {
    var t = new Date(date);
    var n = Date.parse(t.getFullYear() + "/01/01");
    var x = (t - n) / 1000 / 60 / 60 / 24;
    x = Math.floor(x);

    return ("0" + (x % 100 + 1)).slice(-2);
  }

  var data12 = "0493" + calc_date00(date) + String(bid % 10000) + cat;
  var cd = calc_checkdigit(data12);
  var code = data12 + cd;

  var barcode = "<span class='ean13_font'>" + enc_jan(code) + "</span>";
  $("#barcode").html(barcode);
}
