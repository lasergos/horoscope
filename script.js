var url = 'http://testajax.zzz.com.ua/horoscope/controller/index.php',
	zodiac = '';

$.ajaxSetup({
url: url,
		error: function (jqXHR) {
		},
		dataFilter: function (data) {
			return JSON.parse(data);
		},
});

$(function () {  //Запуск Таба
	$('#tabs').tabs({
		collapsible: true,
		
		activate: function  (e, ui) {
			console.log('activate');
			console.log(arguments);
			$.ajax({
				data: {
					//параметры запроса
					context: 'json',
					zodiac: $(ui.panel).attr('data-zodiac'),
				},

				success: function (data) {
					console.log(data);
					var str = '';
					var periods = Object.keys(data);
					$(periods).each(function (i, val) {
						str +='<label for="'+val+'">'+val+'</label><input type="radio" name="zodiac" value="'+val+'" id="'+val+'">';
					});
					$(ui.panel).find('.cont').append(str);
					$( "input" ).checkboxradio();
					
					$(ui.panel).find('input').on('change', function (e) {
						console.log(this);
						$(ui.panel).find('.forecast').text(data[$(this).val()]);
					});
					$(ui.panel).find('#today').trigger('change').attr('selected', '');
					
					$('.sk-fading-circle').slideToggle({
						duration: 'slow',
						complete: function () {  // выполняется по завершению выполнения данной функции
							$(ui.panel).find('.item').show();				
						}
					});
				},
			});
		},

		beforeActivate: function  (e, ui) {
			$(ui.panel).find('.item').hide();
			$('.sk-fading-circle').slideToggle('slow');
			$(ui.oldPanel).find('.cont').empty();
			$(ui.oldPanel).find('.forecast').empty();
			$(ui.panel).find('.cont').empty();
			$(ui.panel).find('.forecast').empty();
		},

		create: function( event, ui ) { //выполняется после загрузки данных при открытии страницы
			console.log(ui);
			$.ajax({
				data: {
					//параметры запроса
					context: 'json',
					zodiac: $(ui.panel).attr('data-zodiac'),
				},

				beforeSend: function () {
					$('.sk-fading-circle').slideToggle('slow');
				},

				success: function (data) {
					console.log(data);
					var str = '';
					var periods = Object.keys(data);
					$(periods).each(function (i, val) {
						str +='<label for="'+val+'">'+val+'</label><input type="radio" name="zodiac" value="'+val+'" id="'+val+'">';
					});
					$(ui.panel).find('.cont').append(str);
					$( "input" ).checkboxradio();

					$(ui.panel).find('input').on('change', function (e) {
						console.log(this);
						$(ui.panel).find('.forecast').text(data[$(this).val()]);
					});
					$(ui.panel).find('#today').trigger('change').attr('selected', '');
					
					$('.sk-fading-circle').slideToggle({
						duration: 'slow',
						complete: function () {  // выполняется по завершению выполнения данной функции
							$(ui.panel).find('.item').show();				
						}
					});
				},
			});
		},
	});
})
