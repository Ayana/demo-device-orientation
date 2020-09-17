$(function() {
	//郵便番号と携帯電話の数字の最大値を超えたらフォーカスを移動
	$('.cell_phone input, .postal_code input').on('keyup', function() {
		var max = $(this).attr('maxlength')
		var current = $(this).val().length
		if (current >= max) {
			var nextIndex = $('input, select').index(this) + 1
			$('input, select')[nextIndex].focus()
		}
	})
})

$(function() {
	// フォームのフォーカスをEnterで自動遷移
	let targetElm = 'input[type=text],input[type=tel],input[type=radio],input[type=email],select'
	const targetMax = $(targetElm).length

	$(targetElm).keypress(function(e) {
		if (e.keyCode == 13) {
			e.preventDefault()
			let index = $(targetElm).index(this)
			if (index < targetMax - 4) {
				$(targetElm)
					.eq(index + 1)
					.focus()
			}
		}
	})
})

// ToggleClass Sample
$(function() {
	const gender = $('.gender_item')
	const interest = $('.interest_item')

	// 性別をクリックしたらclassを追加削除
	$(gender).on('click', function() {
		$(this).toggleClass('active')
	})

	// 興味関心をクリックしたらclassを追加削除
	$(interest).on('click', function() {
		$(this).toggleClass('active')
	})
})
