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
  var day  = date.getDate() % 10;
  var cat  = form.cat.value;
  var bid  = form.bid.value;

  var data12 = "04934" + String(day) + bid + cat;
  var cd = calc_checkdigit(data12);
  var code = data12 + cd;

  var barcode = "<span class='ean13_font'>" + enc_jan(code) + "</span>";
  $("#barcode").html(barcode);
}
